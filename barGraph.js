var graph;
function createCanvas(divName) {
			
    var div = document.getElementById(divName);
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }	
    var ctx = canvas.getContext("2d");
    //return ctx;
    
    graph = new BarGraph(ctx);
    graph.maxValue = 100;
    graph.margin = 2;
    graph.colors = ["#49a0d8", "#d353a0", "#ffc527"];
    graph.xAxisLabelArr = ["Vata", "Pitta", "Kapha"];
   // setInterval(function () {
        graph.update([0, 0, 0]);
   // }, 1000); 
     
}

function updateDoshaGraph(v,p,k) {
    graph.update([v, p, k]);
}

		

            