






//Populate dropdown with sampleIDs

var bellydata = d3.json("samples.json").then(function(data) {
    console.log("hello");
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




d3.select("#selDataset").on("change", optionChanged);

function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    var selID = d3.event.target.value;
    console.log(selID)
}





//Build metadata list
d3.json("samples.json").then(function(data) {
    // var dropdownMenu = d3.select("#selDataset");
    // var selID = dropdownMenu.property("value");
    var metadata = Object.values(data.metadata);
    var selectedMeta = search(selID, metadata);
    console.log(metadata);
});


function search(selID, metadata){
    for (var i=0; i < metadata.length; i++) {
        if (metadata[i].id === selID) {
            return myArray[i];
        }
    }
}


