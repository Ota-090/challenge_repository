// from data.js
var tableData = data;

//append table to web page and add data
var tbody = d3.select("tbody");

tableData.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

  
// // YOUR CODE HERE!

var tableData2 = data;

var button = d3.select('#filter-btn')
var dateform = d3.select("#dateform");
var cityform = d3.select("#cityform");
var stateform = d3.select("#stateform");
var countryform = d3.select("#countryform");
var shapeform = d3.select("#shapeform");

button.on("click", runEnter);
dateform.on("submit",runEnter);
cityform.on("submit",runEnter);
stateform.on("submit",runEnter);
countryform.on("submit",runEnter);
shapeform.on("submit",runEnter);



// Create the function to run for both events
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // remove any children from the list
  var list = d3.select("tbody");
  list.html("");

  // select the from-node structure
  var inputdate = d3.select("#datetime");
  var inputcity = d3.select("#cityname");
  var inputstate = d3.select("#statename");
  var inputcountry = d3.select("#countryname");
  var inputshape = d3.select("#shapename");

  var dateValue = inputdate.property("value");
  var cityValue = inputcity.property("value");
  var stateValue = inputstate.property("value");
  var countryValue = inputcountry.property("value");
  var shapeValue = inputshape.property("value");

  // Print the value to the console
  console.log("+++++++++++++++++++++++++++++=")
  console.log(dateValue);
  console.log(cityValue);
  console.log(stateValue);
  console.log(countryValue);
  console.log(shapeValue);
  console.log("+++++++++++++++++++++++++++++=")

  if (dateValue !== "") {
    var filteredData = tableData2.filter(ufotables => (ufotables.datetime === dateValue));
  }
  else {
    var filteredData = tableData2;
  }

  //filter data by second search term, if present
  if (cityValue !== "") {
    var filteredData = filteredData.filter(ufotables => (ufotables.city === cityValue));
  }

  //filter data by third search term, if present
  if (stateValue !== "") {
    var filteredData = filteredData.filter(ufotables => (ufotables.state === stateValue));
  }

  //filter data by fourth search term, if present
  if (countryValue !== "") {
    var filteredData = filteredData.filter(ufotables => (ufotables.country === countryValue));
  }

  //filter data by fifth search term, if present
  if (shapeValue !== "") {
    var filteredData = filteredData.filter(ufotables => (ufotables.shape === shapeValue));
  }

  console.log(filteredData)
  



  // Use D3 to select the table body
  var tbody = d3.select("tbody");
  // Append one table row `tr` to the table body
  var row = tbody.append("tr");
  //    ————————————————————————
   filteredData.forEach((ufotables) => {
      var row = tbody.append("tr");
      Object.entries(ufotables).forEach(([key,value]) =>{
          var cell = row.append("td");
          cell.text(value)
      })
      
  });


}

