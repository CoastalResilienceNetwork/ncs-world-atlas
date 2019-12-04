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
    var stColor = d3
      .scaleThreshold()
      .domain([0, 20, 40, 60, 80, 100])
      .range([
        "#dedede",
        "#d9f0a3",
        "#addd8e",
        "#78c679",
        "#31a354",
        "#006837"
      ]);

    app.countryData = data;
    console.log(app.countryData);
    // Check for error
    if (error) throw error;

    // declare utility functions before creating svg
    function countryClick(evt) {
      //   console.log("click", evt);
    }

    function countryOver(evt) {
      app.hoverRGB = d3.select(this)._groups[0][0].style.fill;
      d3.select(this).style("fill", "#88b8b8");
    }
    function countryOut(evt) {
      d3.select(this).style("fill", app.hoverRGB);
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

    // click events
    $(".nwa-intervention-main-cb input").on("click", evt => {
      console.log(evt);
    });

    // on click/change of individual intervention check boxes
    $(".nwa-intervention-sub-cb input").on("click", evt => {
      createArrayOfFieldsFromCBs();
    });

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

    // check to see what check boxes are checked and make an array of the column id's
    function createArrayOfFieldsFromCBs() {
      let columnArray = [];
      $.each($(".nwa-intervention-sub-cb input"), (i, v) => {
        if (v.checked) {
          columnArray.push(parseInt(v.value));
        }
      });
      buildCountryCarbonObject(columnArray);
    }

    // take the column id arrays and add all tons of carbon based on the column checked
    // also add the country name and iso value to the object
    function buildCountryCarbonObject(columnArray) {
      app.countryValues = {};
      $.each(app.countryData, (i, v) => {
        app.countryValues[v.AlphaISO] = { value: 0, countryName: "" };
      });

      // for each item checked, loop through country data and add value to a master object
      $.each(columnArray, (i, id) => {
        if (true) {
          id = id + 1;
        }
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
      console.log(app.countryValues);
      updateChloroplethMap(app.countryValues);
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

    // call this function once to build the column array and populate the chloropleth map at the load of the site
    createArrayOfFieldsFromCBs();
  }
});
