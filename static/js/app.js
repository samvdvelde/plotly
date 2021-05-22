

function init() {


    //Display hor bar chart
    d3.json("samples.json").then(function(data) {
        var otu_ids = data.samples.map(row => row.otu_ids);
        var sample_values = data.samples.map(row => row.sample_values);
        var otu_labels = data.samples.map(row => row.otu_labels);
        var otuIDText = otu_ids.map(String);
        console.log(otuIDText);
        console.log("hello");

        var bardata = [{
            x: sample_values[0].slice(0,10).reverse(),
            y: `OTU ${otu_ids[0].slice(0,10)}`,
            text: otu_labels[0].slice(0,10),
            type: "bar",
            orientation: "h"
        }]

        var barlayout = {
            height: 500,
            width: 500
        }   
        Plotly.newPlot("bar", bardata, barlayout);

    })


    //Display bubble chart
    d3.json("samples.json").then(function(data) {
        var otu_ids = data.samples.map(row => row.otu_ids);
        var sample_values = data.samples.map(row => row.sample_values);
        var otu_labels = data.samples.map(row => row.otu_labels);

        var bubbledata = [{
            x: otu_ids[0],
            y: sample_values[0],
            mode: 'markers',
            marker: {
            size: sample_values[0],
            color: otu_ids[0]
            }
        }];
      
      
        var bubblelayout = {
            showlegend: false,
            height: 600,
            width: 1200
        };
      
        Plotly.newPlot("bubble", bubbledata, bubblelayout);

    })



};


// function initBubble() {
//     //Display bubble chart
//     d3.json("samples.json").then(function(data) {
//         var otu_ids = data.samples.map(row => row.otu_ids);
//         var sample_values = data.samples.map(row => row.sample_values);
//         var otu_labels = data.samples.map(row => row.otu_labels);

//         var bubbledata = [{
//             x: otu_ids[0],
//             y: sample_values[0],
//             mode: 'markers',
//             marker: {
//             size: sample_values[0],
//             color: otu_ids[0]
//             }
//         }];
      
      
//         var bubblelayout = {
//             showlegend: false,
//             height: 600,
//             width: 1200
//         };
      
//       Plotly.newPlot("bubble", bubbledata, bubblelayout);
    
//     });
// }


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


    var selID = d3.event.target.value;
    console.log(selID);

    updatePlotly(selID);
}

function updatePlotly(selID) {
    d3.json("samples.json").then(function(data) {
        var samples = data.samples;
        var metadata = data.metadata;
        var [filteredSample] = samples.filter(sample => sample.id === selID);
        var [filteredMeta] = metadata.filter(sample => (sample.id).toString() === selID);
        var otu_ids = filteredSample.otu_ids;
        var sample_values = filteredSample.sample_values;
        var otu_labels = filteredSample.otu_labels;
        var metaid = filteredMeta.id;
        var metaeth = filteredMeta.ethnicity;
        var metagen = filteredMeta.gender;
        var metaage = filteredMeta.age;
        var metaloc = filteredMeta.location;
        var metabb = filteredMeta.bbtype;
        var metawfreq = filteredMeta.wfreq;

        // console.log(filteredSample);
        // console.log(metadata);
        // console.log(filteredMeta);

        console.log(otu_ids);
        //console.log(sample_values);
        // console.log(otu_labels);


        var list = d3.select(".panel-body");

        list.html("");

        list.append("li").text(`ID: ${metaid}`);
        list.append("li").text(`ETHNICITY: ${metaeth}`);
        list.append("li").text(`GENDER: ${metagen}`);
        list.append("li").text(`AGE: ${metaage}`);
        list.append("li").text(`LOCATION: ${metaloc}`);
        list.append("li").text(`BBTYPE: ${metabb}`);
        list.append("li").text(`WFREQ: ${metawfreq}`);


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

        console.log(bubbledata)



        var bubblelayout = {
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot("bar", bardata, barlayout);

        Plotly.newPlot("bubble", bubbledata, bubblelayout);

       


    })
        


};



init();