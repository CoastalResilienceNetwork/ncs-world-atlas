$(document).ready(function() {
  // National map setup
  // SVG width and height for national map
  var worldWidth = 717;
  var worldHeight = 435;
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
    .attr("viewBox", "0 0 717 435");
  // .style("margin-left", "30px")

  var g = worldSvg.append("g");

  // Queue up datasets using d3 Queue
  d3.queue()
    // .defer(d3.json, "data/world.geo.json") // Load world geojson
    .defer(d3.json, "data/world.topo.json") // Load world geojson
    // .defer(d3.json, "data/us.json") // Load world geojson
    .defer(d3.csv, "data/ncs-world-atlas-data.csv") // Load world csv data
    .await(ready); // Run ready function when JSONs are loaded

  // Ready Function, handle data once loaded
  function ready(error, geojson, data) {
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
      // .domain([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      .domain([
        0,
        25,
        50,
        75,
        100,
        125,
        150,
        175,
        200,
        225,
        250,
        275,
        300,
        325,
        350,
        375,
        400,
        425,
        450,
        475,
        500,
        600,
        700,
        800,
        900,
        1000,
        1500
      ])
      .range(
        // [
        //   "#dedede",
        //   "#d9f0a3",
        //   "#c0e097",
        //   "#a8d18b",
        //   "#90c27f",
        //   "#78b373",
        //   "#60a467",
        //   "#48955b",
        //   "#30864f",
        //   "#187743",
        //   "#006837"
        // ]
        [
          "#dedede",
          "#D9F0A3",
          "#CFEA9E",
          "#C6E49A",
          "#BDDF95",
          "#B4D991",
          "#ABD38C",
          "#A2CE88",
          "#99C883",
          "#90C27F",
          "#87BD7A",
          "#7EB776",
          "#75B171",
          "#6CAC6D",
          "#63A668",
          "#5AA064",
          "#519B5F",
          "#48955B",
          "#3F8F56",
          "#368A52",
          "#2D844D",
          "#247E49",
          "#1B7944",
          "#127340",
          "#096D3B",
          "#006837"
        ]
      );

    app.countryData = data;
    // Check for error
    if (error) throw error;

    // declare utility functions before creating svg
    function countryClick(evt) {
      countrySelected(evt.properties.iso_a3, "click");
    }
    // Define the div for the tooltip
    let tooltipDiv = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

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
            // " MT CO<sub>2</sub>e" +
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

    // National map - append a group to SVG and bind TopoJSON data elements (states)
    let g = worldSvg
      .append("g")
      .selectAll("path")
      // .data(topojson.feature(geojson).features)
      .data(topojson.feature(geojson, geojson.objects.world).features)
      .enter()
      .append("path")
      .attr("d", worldPath)
      .attr("class", "nwa-countries")
      // on various events, call specific functions
      .on("click", countryClick)
      .on("mouseover", countryOver)
      .on("mouseout", countryOut);

    // Define the zoom and attach it to the map ************
    function zoomed() {
      g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      g.attr("transform", d3.event.transform); // updated for d3 v4
    }
    var zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

    // call zoom on the world svg
    worldSvg.call(zoom);

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

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    function countrySelected(country, selector) {
      if (country) {
        $("#chosenSingle").val(country);
        $("#chosenSingle").trigger("chosen:updated");
        $.each(app.countryReportLinks, (i, v) => {
          if (country == v.iso_code) {
            $(".nwa-view-report-btn").attr("href", v.link);
          }
        });
      } else {
        $(".nwa-view-report-btn").attr("href", "#");
      }
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

    // click events
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

    // call this function once to build the column array and populate the chloropleth map at the load of the site
    createArrayOfFieldsFromCBs();
    // console.log(app.countryValues);
    populateDDMenu(app.countryValues);
  }
});
