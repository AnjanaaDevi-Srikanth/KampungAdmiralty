// set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 50, left: 50 },
    width = 1560 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/AnjanaaDevi-Srikanth/KampungAdmiralty/main/Stacked_bar_chart/data_date.csv").then(function (data) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called date -> I show them on the X axis
    const groups = data.map(d => d.date)

    // Add X axis
    const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.5])
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .style("font-size", "9px")
      .style("font-family", "Open Sans");
    // text label for the x axis
    svg.append("text")             
       .attr("x", 700 )
       .attr("y", 450 )
       .style("text-anchor", "middle")
       .text("Days of the experiment (February 2021)")
       .style("font-size", "13px")
       .style("font-family", "Open Sans");    

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 30])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y))
      .style("font-size", "9px")
      .style("font-family", "Open Sans");
      // text label for the x axis
    svg.append("text")             
       .attr("x", 5 )
       .attr("y", 0 )
       .style("text-anchor", "left")
       .text("Hours")
       .style("font-size", "13px")
       .style("font-family", "Open Sans");   

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(d3.schemePaired);

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subgroups)
      (data)

    // Highlight a specific subgroup when hovered

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", d => color(d.key))
      .attr("class", d => "myRect " + d.key) // Add a class to each subgroup: their name
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(d => d)
      .join("rect")
      .attr("x", d => x(d.data.date))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("stroke-width", "0")
      .on("mouseover", function (event, d) { // What happens when user hover a bar

        // what subgroup are we hovering?
        const subGroupName = d3.select(this.parentNode).datum().key

        // Reduce opacity of all rect to 0.2
        d3.selectAll(".myRect").style("opacity", 0.2)

        // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
        d3.selectAll("." + subGroupName).style("opacity", 1)
      })
      .on("mouseleave", function (event, d) { // When user do not hover anymore

        // Back to normal opacity: 1
        d3.selectAll(".myRect")
          .style("opacity", 1)
      })
  })

  // legend: select the svg area
  var SVG = d3.select("#my_dataviz3")

  // create a list of keys
  var keys = ["Employee", "Resident", "Visitor"]

  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemePaired);

  // Add one dot in the legend for each name.
  var size = 20
  SVG.selectAll("mydots")
    .data(keys)
    .enter()
    .append("rect")
    .attr("y", 100)
    .attr("x", function (d, i) { return 60 + i * (size + 80) }) //50 is where the first dot appears.100 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function (d) { return color(d) })

  // Add one dot in the legend for each name.
  SVG.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("y", 110)
    .attr("x", function (d, i) { return 73 + i * (size + 80) + (size / 2) }) // 65 is where the first dot appears. 80 is the distance between dots
    .style("fill", function (d) { return color(d) })
    .text(function (d) { return d })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style("font-family", "Open Sans");
