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
var form = d3.select("#dateform");

button.on("click", runEnter);
form.on("submit",runEnter);


// Create the function to run for both events
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // select the from-node structure
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
  
    // Print the value to the console
    console.log(inputValue);

    var filteredData = tableData2.filter(tableData => tableData.datetime === inputValue);

    console.log(filteredData);

    

    // remove any children from the list
    var list = d3.select("tbody");
    list.html("");

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



  