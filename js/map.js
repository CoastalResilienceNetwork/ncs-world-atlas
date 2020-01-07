$(document).ready(function() {
  app.initMap = function() {
    console.log("init map");
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
    // .style("margin-left", "30px")

    // var g = worldSvg.append("g");
  };
});
