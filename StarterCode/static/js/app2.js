

// Load samples.json file

var bellydata = d3.json("samples.json").then(function(data) {
    console.log(data);
    var names = Object.values(data.names);
    console.log(names);
    //var id = Object.values(data.sample[0]);
    var id = data.samples.map(row => row.id);
    var otu_ids = data.samples.map(row => row.otu_ids);
    var sample_values = data.samples.map(row => row.sample_values);
    var otu_labels = data.samples.map(row => row.otu_labels);
    console.log(id);
    console.log(otu_ids);
    console.log(sample_values);
    console.log(otu_labels);
})


//Populate dropdown with sampleIDs

var bellydata = d3.json("samples.json").then(function(data) {
    console.log(data);
    var names = Object.values(data.names);
    var select = document.getElementById("selDataset"); 
    for(var i = 0; i < names.length; i++) {
        var opt = names[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

})

//Grab selection in dropdown

d3.select("#selDataset").on("change", optionChanged);

function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    var selID = d3.event.target.value;
    console.log(selID);
}


function initBar() {
    //Display hor bar chart
    d3.json("samples.json").then(function(data) {
        var otu_ids = data.samples.map(row => row.otu_ids);
        var sample_values = data.samples.map(row => row.sample_values);
        var otu_labels = data.samples.map(row => row.otu_labels);
        var otuIDText = otu_ids.map(String);
        console.log(otuIDText);
        console.log("hello");

        var data = [{
            x: sample_values[0].slice(0,10).reverse(),
            y: `OTU ${otu_ids[0].slice(0,10)}`,
            text: otu_labels[0].slice(0,10),
            type: "bar",
            orientation: "h"
        }]

        var layout = {
            height: 500,
            width: 500
        }

        Plotly.newPlot("bar", data, layout)

    })

}


function initBubble() {
    //Display bubble chart
    d3.json("samples.json").then(function(data) {
        var otu_ids = data.samples.map(row => row.otu_ids);
        var sample_values = data.samples.map(row => row.sample_values);
        var otu_labels = data.samples.map(row => row.otu_labels);

        var data = [{
            x: otu_ids[0],
            y: sample_values[0],
            mode: 'markers',
            marker: {
            size: sample_values[0],
            color: otu_ids[0]
            }
        }];
      
      
        var layout = {
            showlegend: false,
            height: 600,
            width: 1200
        };
      
      Plotly.newPlot("bubble", data, layout);
    
    });
}

initBar()

initBubble()