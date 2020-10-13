// Initial Params for screening
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 30,
  right: 45,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper, append SVG group to hold chart
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "age";
var chosenYAxis = "smokes";

// Function to update x-scale var upon click on axis label
function xScale(USdata, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(USdata, d => d[chosenXAxis]) * 0.8,
      d3.max(USdata, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;
}

// Function to update y-scale var upon click on axis label
function yScale(USdata, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(USdata, d => d[chosenYAxis]) * 0.8,
      d3.max(USdata, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0]);

  return yLinearScale;
}

// Function to update xAxis var upon click on x-axis label
function renderAxesX(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// Function to update yAxis var upon click on y-axis label
function renderAxesY(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// Function to update circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

// Function to update text in circles
function renderText(circleText, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circleText.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
    .attr("y", d => newYScale(d[chosenYAxis]));

  return circleText;
}

// Function to update tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
  var labelX;
  var labelY;

  // options of x/yaxis
  if (chosenXAxis === "obesity") {
    labelX = "Obesity: "
  } else if (chosenXAxis === "age") {
    labelX = "Age: "
  } else {
    labelX = "Income: $"
  }


  if (chosenYAxis === "smokes") {
    labelY = "Smokes:";
  } else if (chosenYAxis === "healthcare") {
    labelY = "Lacks Healthcare:";
  } else {
    labelY = "Poverty:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<hr>${labelX}${d[chosenXAxis]}<br>${labelY} ${d[chosenYAxis]}%`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function (data) {
      toolTip.show(data);
    })

    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}


// Import data
d3.csv("static/data/data.csv").then(function (USdata) {

  // List of state abbreviations
  var abbr = USdata.map(data => data.abbr);
  var state = USdata.map(data => data.state);

  // Cast each numeric value in USdata as a number using the unary + operator
  USdata.forEach(function (data) {
    data.abbr = data.abbr
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });


  var xLinearScale = xScale(USdata, chosenXAxis);
  var yLinearScale = yScale(USdata, chosenYAxis);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append axes to chart
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(USdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "10")
    .attr("fill", "darkgreen")
    .attr("opacity", ".8");

  var circleText = chartGroup.selectAll(".text")
    .data(USdata)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .text(d => d.abbr)
    .attr("fill", "gold")
    .attr("font-weight", "bold")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central");

  // Create group for x-axis labels
  var labelsXGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height - margin.bottom + 150})`)

  var obesityLabel = labelsXGroup.append("text")
    .attr("x", 0)
    .attr("y", 10)
    .attr("value", "obesity")
    .classed("active", false)
    .text("Obese (%)")
    .attr("text-anchor", "middle");

  var ageLabel = labelsXGroup.append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("value", "age")
    .classed("active", true)
    .text("Age (Median)")
    .attr("text-anchor", "middle");

  var incomeLabel = labelsXGroup.append("text")
    .attr("x", 0)
    .attr("y", 50)
    .attr("value", "income")
    .classed("active", false)
    .text("Household Income (Median)")
    .attr("text-anchor", "middle");

  // Create group for y-axis labels
  var labelsYGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)")

  var healthcareLabel = labelsYGroup.append("text")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.left + 40)
    .attr("dy", "1em")
    .attr("value", "healthcare")
    .classed("active", false)
    .text("Lacks Healthcare (%)")
    .attr("text-anchor", "middle");

  var smokesLabel = labelsYGroup.append("text")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.left + 20)
    .attr("dy", "1em")
    .attr("value", "smokes")
    .classed("active", true)
    .text("Smokes (%)")
    .attr("text-anchor", "middle");

  var povertyLabel = labelsYGroup.append("text")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .attr("value", "poverty")
    .classed("active", false)
    .text("In Poverty (%)")
    .attr("text-anchor", "middle");

  // Update tool tip
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // x axis labels event listener
  labelsXGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      var valueX = d3.select(this).attr("value");
      if (valueX !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = valueX;
        // console.log(chosenXAxis)

        // updates x scale for new data
        xLinearScale = xScale(USdata, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxesX(xLinearScale, xAxis);

        // updates circles with new values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates circles with new values
        circleText = renderText(circleText, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "age") {
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
          obesityLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        } else if (chosenXAxis === "income") {
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          obesityLabel
            .classed("active", false)
            .classed("inactive", true);
          incomeLabel
            .classed("active", true)
            .classed("inactive", false)
        } else {
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
          obesityLabel
            .classed("active", true)
            .classed("inactive", false);
          incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
      }
    });

  // y axis labels event listener
  labelsYGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      var valueY = d3.select(this).attr("value");
      if (valueY !== chosenYAxis) {

        // replaces chosenYAxis with value
        chosenYAxis = valueY;
        // console.log(chosenYAxis)

        // updates y scale for new data
        yLinearScale = yScale(USdata, chosenYAxis);

        // updates y axis with transition
        yAxis = renderAxesY(yLinearScale, yAxis);

        // updates circles with new values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates circles with new x values
        circleText = renderText(circleText, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "healthcare") {
          healthcareLabel
            .classed("active", true)
            .classed("inactive", false);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
        } else if (chosenYAxis === "poverty") {
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
          povertyLabel
            .classed("active", true)
            .classed("inactive", false)
        } else {
          healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", true)
            .classed("inactive", false);
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
        }
      }
    });

}).catch(function (error) {
  console.log(error);
});