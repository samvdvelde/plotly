

// Load samples.json file

var bellydata = d3.json("samples.json").then(function(data) {
    console.log(data);
    var names = Object.values(data.names);
    console.log(names);
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


    d3.event.preventDefault();

    var dropdownMenu = d3.select("#selDataset");
    var selID = d3.event.target.value;
    console.log(selID);

    d3.json("samples.json").then(function(data) {
        var samples = data.samples;
        var metadata = data.metadata;
        var filteredSample = samples.filter(sample => sample.id === selID);
        var filteredMeta = metadata.filter(sample => (sample.id).toString() === selID);
        var otu_ids = filteredSample.map(row => row.otu_ids);
        var sample_values = filteredSample.map(row => row.sample_values);
        var otu_labels = filteredSample.map(row => row.otu_labels);

        console.log(filteredSample);
        console.log(metadata);
        console.log(filteredMeta);

        console.log(otu_ids);
        console.log(sample_values);
        console.log(otu_labels);


        var list = d3.select(".panel-body");

        list.html("");

        list.append("li").text(`id: ${id}`);
        list.append("li").text(`ethnicity: `);
        list.append("li").text(`gender: `);
        list.append("li").text(`age: `);
        list.append("li").text(`location: `);
        list.append("li").text(`bbtype: `);
        list.append("li").text(`wfreq: `);


        var bardata = [{
            x: sample_values.slice(0,10).reverse(),
            y: `OTU ${otu_ids.slice(0,10)}`,
            text: otu_labels.slice(0,10),
            type: "bar",
            orientation: "h"
        }]

        var barlayout = {
            height: 500,
            width: 500
        }

        var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
            size: sample_values,
            color: otu_ids
            }
        }];

        var bubblelayout = {
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot("bar", bardata, barlayout);
        Plotly.newPlot("bubble", bubbledata, bubblelayout);



    })
        




};








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

        

        Plotly.newPlot("bar", data, layout);

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