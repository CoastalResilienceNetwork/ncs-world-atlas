$(document).ready(function () {
  // world map setup
  // SVG width and height for world map
  var worldWidth = 717;
  var worldHeight = 375;
  // world map project, scale, and centering
  var worldProjection = d3
    .geoMercator()
    .scale(125)
    .translate([worldWidth / 2, worldHeight / 1.7]);
  // Set up natinonal map path
  var worldPath = d3.geoPath().projection(worldProjection);

  // Create world map SVG
  var worldSvg = d3
    .select("#nwa-world-map")
    .append("svg")
    .attr("id", "nwa-world-svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 717 375");

  // Queue up datasets using d3 Queue
  d3.queue()
    .defer(d3.json, "data/world.topo.min.json") // Load world topo
    // .defer(d3.csv, "data/ncs-world-atlas-data.csv") // Load world csv data
    .defer(d3.csv, "data/ncs-world-atlas-data_2.csv") // Load world csv data
    .await(ready); // Run ready function when JSONs are loaded

  // Ready Function, handle data once loaded
  function ready(error, geojson, data) {
    console.log(data);
    // set country data globally
    app.countryData = data;
    // on zoom
    var zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);
    // create the svg and append classes, data and functions to it
    var stG = worldSvg.append("g");

    stG
      .append("g")
      .selectAll("path")
      .data(topojson.feature(geojson, geojson.objects.world).features)
      .enter()
      .append("path")
      .attr("d", worldPath)
      .attr("class", "nwa-countries")

      // on various events, call specific functions
      .on("click", countryClick)
      .on("mouseover", countryOver)
      .on("mouseout", countryOut);

    // label the countries
    stG
      .selectAll(".nwa-country-labels")
      .data(topojson.feature(geojson, geojson.objects.world).features)
      .enter()
      .append("text")
      .attr("class", function (d) {
        // remove label from taiwan
        if (d.properties.iso_a3 !== "TWN") {
          return "nwa-country-labels " + d.properties.name;
        }
      })
      .attr("transform", function (d) {
        return "translate(" + worldPath.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .attr("display", "none")
      .text(function (d) {
        return d.properties.name;
      });

    // Define the div for the tooltip
    let tooltipDiv = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Define the zoom and attach it to the map ************
    function zoomed() {
      // label the countries once we get to a vertain zoom level
      if (d3.event.transform.k > 4.5) {
        // label the countries based on zoom level
        stG.selectAll(".nwa-country-labels").attr("display", "block");
      } else {
        // empty labels
        stG.selectAll(".nwa-country-labels").attr("display", "none");
      }
      // update styling based on zoom level
      stG.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      stG.attr("transform", d3.event.transform); // updated for d3 v4
    }

    // call zoom on the world svg
    worldSvg.call(zoom);

    // create a d3 color scheme
    var stColor = d3.scaleThreshold().domain(app.domain).range(app.range);

    // Check for error
    if (error) throw error;

    // // declare utility functions before creating svg
    function countryClick(evt) {
      countrySelected(evt.properties.iso_a3);
    }
    // on country mouse over
    function countryOver(evt) {
      let countryValue, countryName;
      // handle if user hovers over taiwan, show values for china.
      if (evt.properties.iso_a3 === "TWN") {
        if ($("#area-option")[0].checked) {
          countryValue = app.countryValues["CHN"].actualAreaValue;
        } else {
          countryValue = app.countryValues["CHN"].value;
        }
        countryName = app.countryValues["CHN"].countryName;
      } else {
        if ($("#area-option")[0].checked) {
          countryValue =
            app.countryValues[evt.properties.iso_a3].actualAreaValue;
        } else {
          countryValue = app.countryValues[evt.properties.iso_a3].value;
        }

        countryName = app.countryValues[evt.properties.iso_a3].countryName;
      }

      if ($("#area-option")[0].checked) {
        countryValue = numberWithCommas(((countryValue * 10) / 10).toFixed(3));
      } else {
        countryValue = numberWithCommas(((countryValue * 10) / 10).toFixed(2));
      }

      app.hoverRGB = d3.select(this)._groups[0][0].style.fill;
      d3.select(this).style("fill", "#8C959A");
      // work with the tooltip on hover
      tooltipDiv.transition().duration(200).style("opacity", 0.9);
      // handle a hover over australia
      if (evt.properties.iso_a3 !== "AUS") {
        let html = ``;
        if ($("#area-option")[0].checked) {
          html = `<div>${countryName} <br> ${countryValue} - t C0<sub>2</sub>e/ha per year</div>`;
        } else {
          html = `<div>${countryName}<br> ${countryValue}  - Mt CO<sub>2</sub>e/yr</div>`;
        }
        tooltipDiv
          .html(html)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      } else {
        tooltipDiv
          .html("<div>" + countryName)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      }
    }
    // on country mouse out
    function countryOut(evt) {
      d3.select(this).style("fill", app.hoverRGB);
      // close the tooltip when hover off
      tooltipDiv.transition().duration(500).style("opacity", 0);
    }
    // update the main metric of the site
    function updateMetric(countryValues) {
      let metricValue = 0;
      $.each(countryValues, (i, v) => {
        if (v.value) {
          metricValue += parseInt(v.value);
        }
      });
      metricValue = numberWithCommas(metricValue);
      $(".nwa-large-metric").html(metricValue);
    }

    // take the column id arrays and add all tons of carbon based on the column checked
    // also add the country name and iso value to the object
    function buildCountryCarbonObject(columnArray) {
      app.countryValues = {};
      $.each(app.countryData, (i, v) => {
        app.countryValues[v.AlphaISO] = {
          value: 0,
          scaledAreaValue: 0,
          countryName: "",
          AlphaISO: v.AlphaISO,
          actualAreaValue: 0,
        };
      });

      // for each item checked, loop through country data and add value to a master object
      $.each(columnArray, (i, id) => {
        id = app.countryData.columns[id];
        $.each(app.countryData, (i, v) => {
          let val = parseFloat(v[id]);
          if (Number.isNaN(val)) {
            val = 0;
          }
          app.countryValues[v.AlphaISO]["value"] += val;
          app.countryValues[v.AlphaISO]["countryName"] = v.Country;

          let landArea = parseInt(v["Land area"]);
          app.countryValues[v.AlphaISO]["scaledAreaValue"] =
            (app.countryValues[v.AlphaISO]["value"] / (landArea * 100)) *
            1000000;
          app.countryValues[v.AlphaISO]["actualAreaValue"] =
            (app.countryValues[v.AlphaISO]["value"] / (landArea * 100)) *
            1000000;
        });
      });

      let areaDivValues = [];
      $.each(app.countryValues, (i, v) => {
        if (!isNaN(v.scaledAreaValue) && v.scaledAreaValue !== Infinity) {
          areaDivValues.push(v.scaledAreaValue);
        }
      });
      let max = Math.max(...areaDivValues);
      let valToDivide = max / 2000;

      $.each(app.countryValues, (i, v) => {
        v.scaledAreaValue = v.scaledAreaValue / valToDivide;
      });
      filterCountryValuesFromGlobalIndicator();
    }
    // this function filters the data based on a global indicator selection
    function filterCountryValuesFromGlobalIndicator() {
      function filterCountries(col, array) {
        if (col !== "ndc" && col !== "carbon") {
          col = app.countryData.columns[col];
          if (array.length > 1) {
            $.each(app.countryData, (i, dataValue) => {
              let query = "";
              if (array.length === 5) {
                query =
                  dataValue[col] === array[0] ||
                  dataValue[col] === array[1] ||
                  dataValue[col] === array[2] ||
                  dataValue[col] === array[3] ||
                  dataValue[col] === array[4];
              } else if (array.length === 4) {
                query =
                  dataValue[col] === array[0] ||
                  dataValue[col] === array[1] ||
                  dataValue[col] === array[2] ||
                  dataValue[col] === array[3];
              } else if (array.length === 3) {
                query =
                  dataValue[col] === array[0] ||
                  dataValue[col] === array[1] ||
                  dataValue[col] === array[2];
              } else if (array.length === 2) {
                query =
                  dataValue[col] === array[0] || dataValue[col] === array[1];
              }
              if (!query) {
                app.countryValues[dataValue["AlphaISO"]].value = 0;
              }
            });
          } else {
            $.each(app.countryData, (i, v) => {
              if (v[col] !== array[0]) {
                app.countryValues[v["AlphaISO"]].value = 0;
              }
            });
          }
        } else {
          // if ndc global indicator was selected
          if (col === "ndc") {
            col = [];
            $.each($(".nwa-ndc-wrapper input"), (i, v) => {
              if (v.checked) {
                if (v.value === "enhance") {
                  col.push(app.globalIndicatorFields.ndc_sub.ndc_2020);
                } else if (v.value === "update") {
                  col.push(app.globalIndicatorFields.ndc_sub.ndc_update);
                } else if (v.value === "nature-solutions") {
                  $.each($(".nwa-include-nbs-sub-options input"), (i, c) => {
                    if (c.checked) {
                      if (c.value === "Mitigation") {
                        col.push(
                          app.globalIndicatorFields.ndc_sub.ndc_mitigation
                        );
                      } else if (c.value === "Adaptation") {
                        col.push(
                          app.globalIndicatorFields.ndc_sub.ndc_adaptation
                        );
                      } else if (c.value === "Mitigation and Adaptation") {
                        col.push(app.globalIndicatorFields.ndc_sub.ndc_both);
                      }
                    }
                  });
                }
              }
            });
          } else if (col === "carbon") {
            col = [];
            $.each($(".nwa-carbon-sub-options input"), (i, v) => {
              if (v.checked) {
                if (v.value === "national") {
                  col.push(app.globalIndicatorFields.carbon.national);
                } else if (v.value === "sub-national") {
                  col.push(app.globalIndicatorFields.carbon.subNational);
                } else if (v.value === "regional") {
                  col.push(app.globalIndicatorFields.carbon.regional);
                }
              }
            });
          }
          $.each(app.countryData, (i, dataValue) => {
            let query = "";
            if (col.length === 1) {
              query = dataValue[app.countryData.columns[col[0]]] === array[0];
            } else if (col.length === 2) {
              query =
                dataValue[app.countryData.columns[col[0]]] === array[0] ||
                dataValue[app.countryData.columns[col[1]]] === array[1];
            } else if (col.length === 3) {
              query =
                dataValue[app.countryData.columns[col[0]]] === array[0] ||
                dataValue[app.countryData.columns[col[1]]] === array[1] ||
                dataValue[app.countryData.columns[col[2]]] === array[2];
            } else if (col.length === 4) {
              query =
                dataValue[app.countryData.columns[col[0]]] === array[0] ||
                dataValue[app.countryData.columns[col[1]]] === array[1] ||
                dataValue[app.countryData.columns[col[2]]] === array[2] ||
                dataValue[app.countryData.columns[col[3]]] === array[3];
            } else if (col.length === 5) {
              query =
                dataValue[app.countryData.columns[col[0]]] === array[0] ||
                dataValue[app.countryData.columns[col[1]]] === array[1] ||
                dataValue[app.countryData.columns[col[2]]] === array[2] ||
                dataValue[app.countryData.columns[col[3]]] === array[3] ||
                dataValue[app.countryData.columns[col[4]]] === array[4];
            }
            if (!query) {
              app.countryValues[dataValue["AlphaISO"]].value = 0;
            }
          });
        }
      }
      // loop through global indicator checkboxes and filter col and val array
      $.each($(".nwa-global-indicators-cb input"), (i, v) => {
        if (v.checked) {
          let col;
          if (v.value === "ndc_sub") {
            col = "ndc";
            val = app.globalIndicatorValues.ndc_sub;
            // find out which sub checkboxes are checked under NBS sub options
            let valArray = [];
            $.each($(".nwa-include-nbs-sub-options input"), (i, v) => {
              if (v.checked) {
                valArray.unshift(v.value);
              }
            });
            $.each(valArray, (i, v) => {
              val.unshift(v);
            });
          }
          if (v.value === "socioeconomic") {
            $.each($(".nwa-socio-main-options input"), (i, v) => {
              if (v.checked) {
                if (v.value === "income_group") {
                  col = app.globalIndicatorFields.socioeconomic.income_group;
                  val = app.globalIndicatorValues.socioeconomic.income_group;
                } else if (v.value === "sdgi") {
                  col = app.globalIndicatorFields.socioeconomic.sdg_index;
                  val = app.globalIndicatorValues.socioeconomic.sdg_index;
                } else if (v.value === "population") {
                  col = app.globalIndicatorFields.socioeconomic.majority_pop;
                  val = app.globalIndicatorValues.socioeconomic.majority_pop;
                } else if (v.value === "governance_group") {
                  col = app.globalIndicatorFields.socioeconomic.governance;
                  val = app.globalIndicatorValues.socioeconomic.governance;
                }
              }
            });
          }
          if (v.value === "ecological") {
            $.each($(".nwa-eco-main-options input"), (i, v) => {
              if (v.checked) {
                if (v.value === "bio_index") {
                  col = app.globalIndicatorFields.ecological.bio_index;
                  val = app.globalIndicatorValues.ecological.bio_index;
                } else if (v.value === "protected_area") {
                  col = app.globalIndicatorFields.ecological.protected_area;
                  val = app.globalIndicatorValues.ecological.protected_area;
                }
              }
            });
          }
          if (v.value === "carbon") {
            val = [];
            col = "carbon";
            $.each($(".nwa-carbon-sub-options input"), (i, v) => {
              if (v.checked) {
                if (v.value === "national") {
                  val.push("yes");
                } else if (v.value === "sub-national") {
                  val.push("yes");
                } else if (v.value === "regional") {
                  val.push("yes");
                }
              }
            });
          }
          filterCountries(col, val);
        }
      });
      // when finishing filtering country values update map and
      updateChloroplethMap(app.countryValues);
      updateMetric(app.countryValues);
      // update the country selected metric
      updateCountrySelectedMetric();
    }

    // chnage the color of each country based on total carbon value
    function updateChloroplethMap(countryValues) {
      d3.selectAll(".nwa-countries")
        .transition()
        .style("fill", function (d) {
          if (app.countryValues[d.properties.iso_a3] == undefined) {
            app.countryValues[d.properties.iso_a3] = 0;
          }
          if (app.countryValues[d.properties.iso_a3].value != 0) {
            if ($("#area-option")[0].checked) {
              return stColor(
                app.countryValues[d.properties.iso_a3].scaledAreaValue
              );
            } else {
              return stColor(app.countryValues[d.properties.iso_a3].value);
            }
          }
        });
    }
    // populate the dropdown menu once at load of site
    function populateDDMenu(countryValues) {
      let selectMenu = $("#chosenSingle");
      selectMenu.append(
        `<option disabled selected hidden value='Global'>Global (all countries)</option>`
      );
      $.each(countryValues, (i, v) => {
        // remove taiwan from the dropdown menu
        if (v.AlphaISO !== "TWN") {
          selectMenu
            .append(`<option value='${v.AlphaISO}'>${v.countryName}</option>`)
            .trigger("chosen:updated");
        }
      });
      $("#chosenSingle").val("Global");
      $("#chosenSingle").trigger("chosen:updated");
    }
    // this updates the metric above the map for a single country click
    function updateCountrySelectedMetric() {
      if (app.countrySelected) {
        let countryName, value;
        // handle taiwan click
        if (app.countrySelected === "TWN") {
          // update country selected metric
          countryName = `${app.countryValues["CHN"].countryName}:`;
          if ($("#area-option")[0].checked) {
            value = ` ${numberWithCommas(
              app.countryValues["CHN"].actualAreaValue.toFixed(3)
            )} `;
          } else {
            value = ` ${numberWithCommas(
              app.countryValues["CHN"].value.toFixed(2)
            )} `;
          }
        } else {
          // update country selected metric
          countryName = `${
            app.countryValues[app.countrySelected].countryName
          }:`;
          if ($("#area-option")[0].checked) {
            value = ` ${numberWithCommas(
              app.countryValues[app.countrySelected].actualAreaValue.toFixed(3)
            )} `;
          } else {
            value = ` ${numberWithCommas(
              app.countryValues[app.countrySelected].value.toFixed(2)
            )} `;
          }
        }

        $(".nwa-country-name").text(countryName);
        let html = ``;
        if ($("#area-option")[0].checked) {
          html = `${value} - t C0<sub>2</sub>e/ha per year`;
        } else {
          html = `${value} - Mt C0<sub>2</sub>e per year`;
        }

        $(".nwa-country-value-wrapper").html(html);

        // // handle showing the number metric for Australia
        if (
          app.countryValues[app.countrySelected].value > 0 &&
          app.countrySelected != "AUS"
        ) {
          $(".nwa-country-value").show();
        } else {
          $(".nwa-country-value").hide();
        }
      } else {
        $(".nwa-country-value").hide();
      }
    }
    // when a country is selecetd
    function countrySelected(country) {
      // handle if click on australia
      if (country === "AUS") {
        $(".nwa-australia-text-wrapper").show();
      } else if (country === "") {
        $(".nwa-australia-text-wrapper").hide();
      } else {
        $(".nwa-australia-text-wrapper").hide();
      }
      app.countrySelected = country;
      // update the country selected metric
      updateCountrySelectedMetric();

      // update link and chosen menu
      if (country) {
        // handle taiwan click
        if (country === "TWN") {
          country = "CHN";
        }
        // update the chosen menu
        $("#chosenSingle").val(country);
        $("#chosenSingle").trigger("chosen:updated");
        // update the link URL
        $.each(app.countryReportLinks, (i, v) => {
          if (country == v.iso_code) {
            $(".nwa-view-report-btn").attr("href", v.link);
          }
        });
      } else {
        $(".nwa-view-report-btn").attr("href", "#");
        // deslect country from choosen menu, trigger click on full extent button
        $(".nwa-fullExtent").trigger("click");
      }

      // zoom to the country
      zoomCountry(country);
      // highlight the country
      highlightCountry(country);
    }
    // change styling once a country is seleectd
    function highlightCountry(country) {
      if (country) {
        d3.selectAll(".nwa-countries").select(function (d) {
          if (d.properties.iso_a3 === country) {
            d3.selectAll(".nwa-countries").classed("country-on", false);
            d3.select(this).classed("country-on", true);
          }
        });
      } else {
        d3.selectAll(".nwa-countries").classed("country-on", false);
      }
    }
    // zoom to a country once it has been selected
    function zoomCountry(country) {
      d3.selectAll(".nwa-countries").select(function (d) {
        if (d.properties.iso_a3 === country) {
          var bounds = worldPath.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(
              1,
              Math.min(8, 0.9 / Math.max(dx / worldWidth, dy / worldHeight))
            ),
            translate = [
              worldWidth / 2 - scale * x,
              worldHeight / 2 - scale * y,
            ];

          // handle if a user clicks on Fiji, the zoom was malfunctioning because
          // of the island crossing the international date line.
          // set properties manually
          if (d.properties.iso_a3 === "FJI") {
            translate = [-5428.361933816162, -1853.1730368988067];
            scale = 8;
          }

          worldSvg
            .transition()
            .duration(800)
            .call(
              zoom.transform,
              d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
            );
        }
      });
    }
    // check to see what check boxes are checked and make an array of the column id's
    function createArrayOfFieldsFromCBs() {
      let columnArray = [];
      $.each($(".nwa-intervention-sub-cb input"), (i, v) => {
        let value;
        if (v.checked) {
          if ($("#cost-option")[0].checked) {
            value = parseInt(v.value) + 1;
          } else if ($("#area-option")[0].checked) {
            value = parseInt(v.value);
          } else {
            value = parseInt(v.value);
          }
          columnArray.push(value);
        }
      });
      buildCountryCarbonObject(columnArray);
    }
    // find out which pathways have been selecetd
    function checkCorrectPathways(fieldsToCheck) {
      // loop through all cb's and check the ones where the value matches the array value
      $.each($(".nwa-intervention-sub-cb input"), (i, v) => {
        let pos = fieldsToCheck.indexOf(parseInt(v.value));
        if (pos > -1) {
          $(v).prop("checked", true);
        } else {
          $(v).prop("checked", false);
        }
      });
      // update datauser_seed_data.json
      createArrayOfFieldsFromCBs();
    }
    // handle click event on pathways
    function handlePathwaysCbClick() {
      let fieldsToCheck = [];
      $.each($(".nwa-individual-pathways input"), (i, v) => {
        if (v.checked) {
          fieldsToCheck.push.apply(
            fieldsToCheck,
            app.worldCheckboxFields[v.value]
          );
        }
      });
      checkCorrectPathways(fieldsToCheck);
    }
    // when you select all pathways
    function handleAllPathwaysClick(evt) {
      $.each($(".nwa-intervention-sub-cb input"), (i, v) => {
        if (evt.currentTarget.checked) {
          $(v).prop("checked", true);
        } else {
          $(v).prop("checked", false);
        }
      });
      $.each($(".nwa-individual-pathways input"), (i, v) => {
        if (!evt.currentTarget.checked) {
          $(v).prop("checked", false);
        } else {
          $(v).prop("checked", true);
        }
      });
      createArrayOfFieldsFromCBs();
    }

    // global indicator functions ***************************************
    function handleMainGlobalIndicatorsClick(evt) {
      $.each($(".nwa-global-indicators-cb input"), (i, v) => {
        if (v != evt.currentTarget) {
          $(v).prop("checked", false);
        }
      });
      $.each($(".nwa-indicator-wrapper"), (i, v) => {
        $(v).hide();
      });

      let val;
      if (evt.currentTarget.checked) {
        val = evt.currentTarget.value;
      } else {
        val = "";
      }
      slideDownGlobalIndicators(val);
    }
    // slide down global indicator section
    function slideDownGlobalIndicators(val) {
      if (val) {
        // call function here, pass val
        switch (val) {
          case "ndc_sub":
            $(".nwa-ndc-content").slideDown();
            buildNdcOptionsArray();
            // rebuild the map when these cb's are checked
            // createArrayOfFieldsFromCBs();
            break;

          case "socioeconomic":
            $(".nwa-socioeconomic-content").slideDown();
            $.each($(".nwa-socio-main-options input"), (i, v) => {
              if (v.checked) {
                if (v.value === "income_group") {
                  //append checked value to the master value array
                  buildIncomeOptionsArray();
                } else if (v.value === "sdgi") {
                  buildSdgiOptionsArray();
                } else if (v.value === "population") {
                  buildPopulationOptionsArray();
                } else if (v.value === "governance_group") {
                  buildGovernanceOptionsArray();
                }
              }
            });
            break;
          case "ecological":
            $(".nwa-ecological-content").slideDown();
            $.each($(".nwa-eco-main-options input"), (i, v) => {
              if (v.checked) {
                if (v.value === "bio_index") {
                  buildBioOptionsArray();
                } else if (v.value === "protected_area") {
                  buildProtectedAreaOptionsArray();
                }
              }
            });
            break;
          case "carbon":
            buildCarbonOptionsArray();
            $(".nwa-carbon-content").slideDown();
        }
      } else {
        // rebuild the map when these cb's are checked
        createArrayOfFieldsFromCBs();
      }
    }
    // eco options click
    function ecologicalOptionsClick(evt) {
      let opts = $(".nwa-ecological-wrapper").find(
        ".nwa-ecological-sub-options"
      );
      $.each(opts, (i, v) => {
        $(v).hide();
      });
      $(evt.currentTarget).parent().next().show();

      if (evt.currentTarget.value === "bio_index") {
        buildBioOptionsArray();
      } else if (evt.currentTarget.value === "protected_area") {
        buildProtectedAreaOptionsArray();
      }
    }
    // socio options click
    function socioOptionsClick(evt) {
      let opts = $(".nwa-socioeconomic-wrapper").find(".nwa-socio-sub-options");
      $.each(opts, (i, v) => {
        $(v).hide();
      });
      $(evt.currentTarget).parent().next().show();

      if (evt.currentTarget.value === "income_group") {
        //append checked value to the master value array
        buildIncomeOptionsArray();
      } else if (evt.currentTarget.value === "sdgi") {
        buildSdgiOptionsArray();
      } else if (evt.currentTarget.value === "population") {
        buildPopulationOptionsArray();
      } else if (evt.currentTarget.value === "governance_group") {
        buildGovernanceOptionsArray();
      }
    }
    // build array of options
    function buildNdcOptionsArray() {
      app.globalIndicatorValues.ndc_sub = [];
      $.each($(".nwa-ndc-wrapper-input"), (i, v) => {
        if (v.checked) {
          if (v.value !== "nature-solutions") {
            app.globalIndicatorValues.ndc_sub.push(v.value);
          }
        }
      });

      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }
    // build array of options
    function buildIncomeOptionsArray() {
      app.globalIndicatorValues.socioeconomic.income_group = [];
      // loop through the cbs
      $.each($(".nwa-income-sub-options input"), (i, v) => {
        if (v.checked) {
          app.globalIndicatorValues.socioeconomic.income_group.push(v.value);
        }
      });
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }
    // build array of options
    function buildSdgiOptionsArray() {
      app.globalIndicatorValues.socioeconomic.sdg_index = [];
      // loop through the cbs
      $.each($(".nwa-sdgi-sub-options input"), (i, v) => {
        if (v.checked) {
          app.globalIndicatorValues.socioeconomic.sdg_index.push(v.value);
        }
      });
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }
    // build array of options
    function buildPopulationOptionsArray() {
      app.globalIndicatorValues.socioeconomic.majority_pop = [];
      // loop through the cbs
      $.each($(".nwa-population-sub-options input"), (i, v) => {
        if (v.checked) {
          app.globalIndicatorValues.socioeconomic.majority_pop.push(v.value);
        }
      });
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }
    function buildGovernanceOptionsArray() {
      app.globalIndicatorValues.socioeconomic.governance = [];
      // loop through the cbs
      $.each($(".nwa-governance-sub-options input"), (i, v) => {
        if (v.checked) {
          app.globalIndicatorValues.socioeconomic.governance.push(v.value);
        }
      });
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }
    // build array of options
    function buildBioOptionsArray() {
      app.globalIndicatorValues.ecological.bio_index = [];
      // loop through the cbs
      $.each($(".nwa-bio-sub-options input"), (i, v) => {
        if (v.checked) {
          app.globalIndicatorValues.ecological.bio_index.push(v.value);
        }
      });
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }
    // build carbon options array
    function buildCarbonOptionsArray() {
      app.globalIndicatorValues.carbon = [];
      // loop through the cbs
      $.each($(".nwa-carbon-sub-options input"), (i, v) => {
        if (v.checked) {
          app.globalIndicatorValues.carbon.push(v.value);
        }
      });
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }
    // build array of options
    function buildProtectedAreaOptionsArray() {
      app.globalIndicatorValues.ecological.protected_area = [];
      // loop through the cbs
      $.each($(".nwa-protected-sub-options input"), (i, v) => {
        if (v.checked) {
          app.globalIndicatorValues.ecological.protected_area.push(v.value);
        }
      });
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }

    // ****************************************************************************************************************************************
    // click events ***************************************************************************************************************************
    $(".nwa-prot-man-rest-wrapper input").on("click", (evt) => {
      handlePathwaysCbClick();
    });

    // on click/change of individual intervention check boxes
    $(".nwa-intervention-sub-cb input").on("click", (evt) => {
      createArrayOfFieldsFromCBs();
    });
    // on click of all pathways
    $("#all-option").on("click", (evt) => {
      handleAllPathwaysClick(evt);
    });
    // on click of all pathways
    $("#area-option").on("click", (evt) => {
      createArrayOfFieldsFromCBs();
    });
    // on click of cost option
    $("#cost-option").on("click", (evt) => {
      if (evt.currentTarget.checked) {
        $("#improved-fire-management-wrapper").addClass("nwa-disabled");
        $($("#improved-fire-management-wrapper input")).prop("disabled", true);
      } else {
        $("#improved-fire-management-wrapper").removeClass("nwa-disabled");
        $($("#improved-fire-management-wrapper input")).prop("disabled", false);
      }
      createArrayOfFieldsFromCBs();
    });

    // on info icon click
    $(".nwa-info-icon").on("click", (evt) => {
      if (evt.currentTarget.id === "intervention-icon") {
        window.open(
          "http://nature4climate.s3.amazonaws.com/FAQ/FAQ_NCS%20Interventions.pdf",
          "_blank"
        );
      } else if (evt.currentTarget.id === "global-icon") {
        window.open(
          "http://nature4climate.s3.amazonaws.com/FAQ/FAQ%20Global%20Indicators.pdf",
          "_blank"
        );
      }
    });

    // on info icon hover
    // $(".nwa-info-icon").on("mouseenter", evt => {
    //   $(".nwa-popup-wrapper .nwa-popup-text").html(
    //     app.helpText[
    //       $(evt.currentTarget)
    //         .parent()
    //         .find(".nwa-info-icon")[0].id
    //     ]
    //   );
    //   $(".nwa-popup-wrapper").show();
    //   let offset = $(evt.currentTarget).offset();
    //   $(".nwa-popup-wrapper").css(
    //     "top",
    //     offset.top - $(".nwa-popup-wrapper").height() / 2 + 2
    //   );
    //   $(".nwa-popup-wrapper").css("left", offset.left + 30);
    // });
    // $(".nwa-info-icon").on("mouseleave", evt => {
    //   $(".nwa-popup-wrapper").hide();
    // });

    // on full extent button click
    $("#nwa-fullExtent").on("click", (evt) => {
      worldSvg
        .transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity.translate(0, 0));
    });

    // global indicators clicks ********************************************
    // on global indicator cb click
    $(".nwa-global-indicators-cb input").on("click", (evt) => {
      handleMainGlobalIndicatorsClick(evt);
    });

    // socio econmoic options click
    $(".nwa-socio-main-options input").on("click", (evt) => {
      socioOptionsClick(evt);
    });

    // ecological options click
    $(".nwa-eco-main-options input").on("click", (evt) => {
      ecologicalOptionsClick(evt);
    });

    // sub options clicks
    $(".nwa-income-sub-options input").on("click", (evt) => {
      buildIncomeOptionsArray();
    });
    $(".nwa-sdgi-sub-options input").on("click", (evt) => {
      buildSdgiOptionsArray();
    });
    $(".nwa-population-sub-options input").on("click", (evt) => {
      buildPopulationOptionsArray();
    });
    $(".nwa-governance-sub-options input").on("click", (evt) => {
      buildGovernanceOptionsArray();
    });
    $(".nwa-bio-sub-options input").on("click", (evt) => {
      buildBioOptionsArray();
    });
    $(".nwa-carbon-sub-options input").on("click", (evt) => {
      buildCarbonOptionsArray();
    });
    $(".nwa-protected-sub-options input").on("click", (evt) => {
      buildProtectedAreaOptionsArray();
    });
    $(".nwa-ndc-wrapper input").on("click", (evt) => {
      buildNdcOptionsArray();
    });
    $(".nwa-bio-sub-options input").on("click", (evt) => {
      buildCarbonOptionsArray();
    });

    // *****************************************************************
    // ndc yes/no click
    $(".nwa-ndc-submission input").on("click", (evt) => {
      app.globalIndicatorValues.ndc_sub = evt.currentTarget.value;
      createArrayOfFieldsFromCBs();
    });
    // info icon click
    $(".nwa-intervention-info-icon").on("click", (evt) => {
      // toggle info icon based on element visibility
      if ($($(".nwa-intervention-info-icon img")[0]).is(":hidden")) {
        $($(".nwa-intervention-info-icon img")[0]).show();
        $($(".nwa-intervention-info-icon img")[1]).hide();
      } else {
        $($(".nwa-intervention-info-icon img")[0]).hide();
        $($(".nwa-intervention-info-icon img")[1]).show();
      }
    });
    //For Chosen options visit https://harvesthq.github.io/chosen/
    //Single deselect only works if the first option in the select tag is blank

    $("#chosenSingle")
      .chosen({
        allow_single_deselect: true,
        width: "209px",
      })
      .change(function (c) {
        countrySelected(c.target.value, "select");
      });

    // call these functions once to build the column array and populate the chloropleth map at the load of the site
    createArrayOfFieldsFromCBs();
    populateDDMenu(app.countryValues);
  }
});
