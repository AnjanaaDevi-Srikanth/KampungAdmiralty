// set the dimensions and margins of the graph
  const margin = { top: 0, right: 30, bottom: 0, left: 50 }
  width = 1400 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Read data
  d3.csv("https://raw.githubusercontent.com/AnjanaaDevi-Srikanth/KampungAdmiralty/main/Circular_packing/data_space_time.csv").then(function (data) {

    // Color palette for levels
    const color = d3.scaleOrdinal()
      .domain(["L1", "L2", "L6", "L4", "B1", "L7", "L8", "L9", "B2"]) //ordered this way to have visual harmony with idiom 1, same colour palette
      .range(d3.schemePaired);

    // Size scale for levels
    const size = d3.scaleLinear()
      .domain([0, 2500])
      .range([0, 50])  // circle will be between 5 and 55 px wide

    // create a tooltip
    const Tooltip = d3.select("#my_dataviz1")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (event, d) {
      Tooltip
        .style("opacity", 1)
    }
    const mousemove = function (event, d) {
      Tooltip
        .html('<u>' + "Level " + d.level + " " + d.name + '</u>' + "<br>Time spent during the experiment: " + d.hours + " hours " + d.min + " minutes")
        .style("left", (event.x / 2 + 20) + "px")
        .style("top", (event.y / 2 - 30) + "px")
        .style("font-size", "20px")
        .style("font-family", "Open Sans")
    }
    var mouseleave = function (event, d) {
      Tooltip
        .style("opacity", 0)
    }

    // Initialize the circle: all located at the center of the svg area
    var node = svg.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.total))
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", d => color(d.level))
      .style("fill-opacity", 0.8)
      .style("stroke-width", 0)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Features of the forces applied to the nodes:
    const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function (d) { return (size(d.total) + 3) }).iterations(1)) // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
      .nodes(data)
      .on("tick", function (d) {
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
      });

    // What happens when a circle is dragged?
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }

  })

  // Legend: select the svg area
  var Svg = d3.select("#my_dataviz2")

  // create a list of keys
  var keys = ["L1", "L2", "L6", "L4", "B1", "L7", "L8", "L9", "B2"]

  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemePaired);

  // Add one dot in the legend for each name.
  Svg.selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("cy", 30)
    .attr("cx", function (d, i) { return 10 + i * 45 }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function (d) { return color(d) })
  

  // Add one dot in the legend for each name.
  Svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("y", 35)
    .attr("x", function (d, i) { return 20 + i * 45 }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) { return color(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("font-family", "Open Sans");
