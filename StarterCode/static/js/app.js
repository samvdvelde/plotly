
//Load samples.json file

var bellydata = d3.json("samples.json").then(function(data) {
    console.log("hello");
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
    // Populate dropdown with sample IDs
    var select = document.getElementById("selDataset"); 
    for(var i = 0; i < names.length; i++) {
        var opt = names[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }​
};





//var select = document.getElementById("selDataset");

// for (var i = 0; i < names.lenghth; i++) {
//     console.log(names[i]);
// }
//     var opt = names[i];
//     var el = document.createElement("option");
//     el.textContent = opt;
//     el.Value = opt;
//     select.appendChild(el);
// }



