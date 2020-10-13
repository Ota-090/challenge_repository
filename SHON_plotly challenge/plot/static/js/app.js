// our plotly 3 applications

// PLOTLY  - build top 10 barchart

function buildbar(wechoose) {
    d3.json("/data/samples.json").then(function(data) {
        var samples = data.samples;
        console.log("we choose " + wechoose)
        // fliter by the option, got an array(size 1)
        function filterByID(aim, ID) {
            return aim.filter(item => item.id == Number(ID))
        }

        filteredData = filterByID(samples,wechoose)

        // merge the data for sort
        var mergeddata= filteredData[0].sample_values.map( (v, i) => ({
            sampleValue: filteredData[0].sample_values[i],
            otuId: filteredData[0].otu_ids[i],
            otuLabel: filteredData[0].otu_labels[i]
        })) 
        console.log("the mergeddata is ")
        console.log(mergeddata)

        //sort the data
        function compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            }
        }
        console.log("data is sorted")
        sorteddata = mergeddata.sort(compare('sampleValue'))
        console.log(sorteddata)

        
        // slice the data
        sliceddata = sorteddata.slice(0,10);
        console.log("data is sliced")
        console.log(sliceddata)

        //reverse the data
        sliceddata.reverse()

        // plotly part
        var trace1 = {
            x: sliceddata.map(row => row.sampleValue),
            y: sliceddata.map(row => "otuId "+String(row.otuId)),
            text:sliceddata.map(row => row.otuLabel),
            type: "bar",
            orientation: 'h'
        };
        
        var plotbar = [trace1]
        var layout = {
  
            title: {
                text: "Top 10 otuId, by sampleValue",
                font: {size: 15}
            },

            
        };
        
        Plotly.newPlot("bar", plotbar, layout);

    })



}

// PLOTLY  - build top 10 bubblechart
function buildbubble(wechoose) {
    d3.json("/data/samples.json").then(function(data) {
        var samples = data.samples;
        console.log("we choose " + wechoose)
        // fliter by the option, got an array(size 1)
        function filterByID(aim, ID) {
            return aim.filter(item => item.id == Number(ID))
        }

        filteredData = filterByID(samples,wechoose)[0]
        console.log("bubble!")
        console.log(filteredData)
        var trace1 = {
            x: filteredData.otu_ids,
            y: filteredData.sample_values,
            text:filteredData.otu_labels,
            // text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
            mode: 'markers',
          
            marker: {
              color: filteredData.otu_ids,
            size: filteredData.sample_values}
            
            }
            var data = [trace1];
          
            var layout = {
                xaxis: {
                    title:"Use otu_ids for the x values."
                },
                yaxis: {
                    title:"Use sample_values for the y values."
                },
                title: 'Bubble Chart Hover Text',
                showlegend: false,
                height: 600,
                width: 1200
            };
            
            Plotly.newPlot('bubble', data, layout);    




    }) }


// PLOTLY  - build gauge chart
function buildguage(wechoose) {
    
    d3.json("/data/samples.json").then(function(data) {
        var metadata = data.metadata;
        console.log("gauge chart for "+ wechoose)
        // fliter by the option, got an array(size 1)
        function filterByID(aim, ID) {
            return aim.filter(item => item.id == Number(ID))
        };

        filteredData = filterByID(metadata,wechoose)[0]
        console.log("filtered data is " + filteredData )

        // 11
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: filteredData.wfreq,
                title: { text: "Belly Button Washing Frequence :Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number+delta",
                delta: { reference: 8 },
                gauge: {
                axis: { range: [null, 10] },
                steps: [
                    { range: [0, 2], color: "lightgray" },
                    { range: [2, 3], color: "gray" },
                    { range: [3, 4], color: "lightgray" },
                    { range: [4, 5], color: "gray" },
                    { range: [5, 6], color: "lightgray" },
                    { range: [6, 7], color: "gray" },
                    { range: [7, 8], color: "lightgray" },
                    { range: [8, 9], color: "gray" },
                    { range: [9, 10], color: "lightgray" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 9.8
                }
                }
            }
            ];
            
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

        


        
        // 22
    
    
    
    
    }   )


}



// build demo info
function buildDemo(wechoose){
    var option = wechoose
    d3.json("/data/samples.json").then(function(data) {
        var metadata = data.metadata;
        console.log("we choose " + option)
        // fliter by the option, got an array(size 1)
        function filterByID(aim, ID) {
            return aim.filter(item => item.id == Number(ID))
        }
        filteredData = filterByID(metadata,option)
        demoDict = filteredData[0]

        // get the list blank
        var demoMenu = d3.selectAll("#sample-metadata");
        demoMenu.html("")

        //select the node  and append

        for (var prop in demoDict){
            var demoMenu = d3.selectAll("#sample-metadata");
        
            console.log("demoDict[" + prop + "]=" + demoDict[prop]);
            var info = demoMenu.append("p");
            info.text(prop + " : " + demoDict[prop])       
        }
        


    }


    )
}




// for dropdown values
function builddropdown(name) {
    var dropdownMenu = d3.selectAll("#selDataset");

    
    console.log(dropdownMenu)
    dropdownMenu.html("")

    name.forEach((names) => { 
        console.log(names)
        var row = dropdownMenu.append("option");
        row.text(names)
        row.attr("value", names);

    } )   

}

// to get the option we choose
function getValue(option) {
    console.log(option.value)
    var wechoose = option.value
    d3.json("/data/samples.json").then(function(data) {
        var metadata = data.metadata;
        var filteredData = metadata.filter(item => item.id === Number(wechoose));
        console.log(filteredData)
    })

    buildbar(wechoose)
    buildDemo(wechoose)
    buildbubble(wechoose)
    buildguage(wechoose)

}

function builddata() {
    d3.json("/data/samples.json").then(function(data) {
  
      // Grab values from the data json object to build the plots
      var name = data.names;
      var metadata = data.metadata;
      var samples = data.samples;

      builddropdown(name)
      

    })

    

}

builddata()



