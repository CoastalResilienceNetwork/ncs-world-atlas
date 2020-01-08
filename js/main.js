$(document).ready(function() {
  // National map setup
  // SVG width and height for national map
  var worldWidth = 717;
  var worldHeight = 375;
  // National map project, scale, and centering
  var worldProjection = d3
    .geoMercator()
    .scale(125)
    .translate([worldWidth / 2, worldHeight / 1.7]);
  // Set up natinonal map path
  var worldPath = d3.geoPath().projection(worldProjection);

  // Create national map SVG
  var worldSvg = d3
    .select("#nwa-world-map")
    .append("svg")
    .attr("id", "nwa-world-svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 717 375");

  // Queue up datasets using d3 Queue
  d3.queue()
    .defer(d3.json, "data/world.topo.json") // Load world geojson
    .defer(d3.csv, "data/ncs-world-atlas-data.csv") // Load world csv data
    .await(ready); // Run ready function when JSONs are loaded

  // Ready Function, handle data once loaded
  function ready(error, geojson, data) {
    console.log(data);
    // new code here ****************************
    var zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    var stG = worldSvg.append("g");

    // stG
    //   .append("path")
    //   .datum(topojson.merge(geojson, data))
    //   .attr("class", "nwa-countries")
    //   .attr("d", worldPath);
    stG
      // .append("g")
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

    // Define the div for the tooltip
    let tooltipDiv = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Define the zoom and attach it to the map ************
    function zoomed() {
      stG.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      stG.attr("transform", d3.event.transform); // updated for d3 v4
    }

    // call zoom on the world svg
    stG.call(zoom).on("mousedown.zoom", null); // disbale pan
    // worldSvg.call(zoom);
    // stG.call(zoom); // disbale pan

    console.log(data);
    //For Chosen options visit https://harvesthq.github.io/chosen/
    //Single deselect only works if the first option in the select tag is blank

    $("#chosenSingle")
      .chosen({
        allow_single_deselect: true,
        width: "190px"
      })
      .change(function(c) {
        countrySelected(c.target.value, "select");
      });

    var stColor = d3
      .scaleThreshold()
      .domain(app.domain)
      .range(app.range);

    app.countryData = data;
    // Check for error
    if (error) throw error;

    // // declare utility functions before creating svg
    function countryClick(evt) {
      countrySelected(evt.properties.iso_a3);
    }

    function countryOver(evt) {
      let countryValue = app.countryValues[evt.properties.iso_a3].value;
      let countryName = app.countryValues[evt.properties.iso_a3].countryName;
      countryValue = Math.round(countryValue * 10) / 10;
      app.hoverRGB = d3.select(this)._groups[0][0].style.fill;
      d3.select(this).style("fill", "#88b8b8");
      // work with the tooltip on hover
      tooltipDiv
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltipDiv
        .html(
          "<div>" +
            countryName +
            "<br>" +
            countryValue +
            " - MT CO<sub>2</sub>e/yr" +
            "</div>"
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    }
    function countryOut(evt) {
      d3.select(this).style("fill", app.hoverRGB);
      // close the tooltip when hover off
      tooltipDiv
        .transition()
        .duration(500)
        .style("opacity", 0);
    }
    // info icon click
    $(".nwa-intervention-info-icon").on("click", evt => {
      // toggle info icon based on element visibility
      if ($($(".nwa-intervention-info-icon img")[0]).is(":hidden")) {
        $($(".nwa-intervention-info-icon img")[0]).show();
        $($(".nwa-intervention-info-icon img")[1]).hide();
      } else {
        $($(".nwa-intervention-info-icon img")[0]).hide();
        $($(".nwa-intervention-info-icon img")[1]).show();
      }
    });

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
          countryName: "",
          AlphaISO: v.AlphaISO
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
        });
      });
      filterCountryValuesFromGlobalIndicator();
    }

    function filterCountryValuesFromGlobalIndicator() {
      function filterCountries(col) {
        console.log("in filter");
        col = app.countryData.columns[col];
        $.each(app.countryData, (i, v) => {
          if (v[col] !== "NCS-yes") {
            // do nothing
            app.countryValues[v["AlphaISO"]] = 0;
          }
        });
      }

      $.each($(".nwa-global-indicators-cb input"), (i, v) => {
        if (v.checked) {
          let col;
          if (v.value === "ndc_sub") {
            col = 34;
          }
          console.log(app.globalIndicatorValues.ndc_sub);
          // if (app.globalIndicatorValues.ndc_sub === "yes") {
          filterCountries(col);
          // }
        }
      });

      updateChloroplethMap(app.countryValues);
      updateMetric(app.countryValues);
    }

    // chnage the color of each country based on total carbon value
    function updateChloroplethMap(countryValues) {
      d3.selectAll(".nwa-countries")
        .transition()
        .style("fill", function(d) {
          if (app.countryValues[d.properties.iso_a3] == undefined) {
            app.countryValues[d.properties.iso_a3] = 0;
          }
          if (app.countryValues[d.properties.iso_a3].value != 0) {
            return stColor(app.countryValues[d.properties.iso_a3].value);
          }
        });
    }
    function populateDDMenu(countryValues) {
      let selectMenu = $("#chosenSingle");
      $.each(countryValues, (i, v) => {
        selectMenu
          .append(`<option value='${v.AlphaISO}'>${v.countryName}</option>`)
          .trigger("chosen:updated");
      });
    }

    function countrySelected(country) {
      if (country) {
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
      }

      // zoom to the country
      zoomCountry(country);
      // highlight the country
      highlightCountry(country);
    }

    function highlightCountry(country) {
      if (country) {
        d3.selectAll(".nwa-countries").select(function(d) {
          if (d.properties.iso_a3 === country) {
            d3.selectAll(".nwa-countries").classed("country-on", false);
            d3.select(this).classed("country-on", true);
          }
        });
      } else {
        d3.selectAll(".nwa-countries").classed("country-on", false);
      }
    }

    function zoomCountry(country) {
      d3.selectAll(".nwa-countries").select(function(d) {
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
              worldHeight / 2 - scale * y
            ];

          stG
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
          } else {
            value = parseInt(v.value);
          }
          columnArray.push(value);
        }
      });
      buildCountryCarbonObject(columnArray);
    }

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
      // update data
      createArrayOfFieldsFromCBs();
    }

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
            break;
          case "emissions":
            $(".nwa-emssions-content").slideDown();
            break;
          case "socioeconomic":
            $(".nwa-socioeconomic-content").slideDown();
            break;
          case "ecological":
            $(".nwa-ecological-content").slideDown();
            break;
        }
      }
      // rebuild the map when these cb's are checked
      createArrayOfFieldsFromCBs();
    }

    //

    // click events *********************************************************
    $(".nwa-pathways-controllers input").on("click", evt => {
      handlePathwaysCbClick();
    });

    // on click/change of individual intervention check boxes
    $(".nwa-intervention-sub-cb input").on("click", evt => {
      createArrayOfFieldsFromCBs();
    });
    // on click of all pathways
    $("#all-option").on("click", evt => {
      handleAllPathwaysClick(evt);
    });
    // on click of cost option
    $("#cost-option").on("click", evt => {
      createArrayOfFieldsFromCBs();
    });

    // on info icon hover
    $(".nwa-info-icon").on("mouseenter", evt => {
      $(".nwa-popup-wrapper").show();
      $(".nwa-popup-wrapper").css("top", evt.originalEvent.clientY - 10);
      $(".nwa-popup-wrapper").css("left", evt.originalEvent.clientX + 10);
      $(".nwa-popup-wrapper").html(
        app.helpText[$(evt.currentTarget).find("img")[0].id]
      );
    });
    $(".nwa-info-icon").on("mouseleave", evt => {
      $(".nwa-popup-wrapper").hide();
    });

    // on full extent button click
    $("#nwa-fullExtent").on("click", evt => {
      stG
        .transition()
        .duration(800)
        .call(zoom.transform, d3.zoomIdentity.translate(0, 0));
    });

    // global indicators clicks ********************************************
    // on global indicator cb click
    $(".nwa-global-indicators-cb input").on("click", evt => {
      handleMainGlobalIndicatorsClick(evt);
    });

    // socio econmoic options click
    $(".nwa-socio-main-options input").on("click", evt => {
      let opts = $(".nwa-socioeconomic-wrapper").find(".nwa-socio-sub-options");
      $.each(opts, (i, v) => {
        $(v).hide();
      });
      $(evt.currentTarget)
        .parent()
        .next()
        .show();
    });

    // ecological options click
    $(".nwa-eco-main-options input").on("click", evt => {
      let opts = $(".nwa-ecological-wrapper").find(
        ".nwa-ecological-sub-options"
      );
      $.each(opts, (i, v) => {
        $(v).hide();
      });
      $(evt.currentTarget)
        .parent()
        .next()
        .show();
    });

    // ndc yes/no click
    $(".nwa-ndc-submission input").on("click", evt => {
      // console.log(evt.currentTarget.value);
      app.globalIndicatorValues.ndc_sub = evt.currentTarget.value;
      // console.log(app.globalIndicatorValues);
      filterCountryValuesFromGlobalIndicator();
    });

    // call this function once to build the column array and populate the chloropleth map at the load of the site
    createArrayOfFieldsFromCBs();
    populateDDMenu(app.countryValues);
  }
});
