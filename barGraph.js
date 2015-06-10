function createCanvasElement(){
    var dCanvas = document.createElement("canvas");
    dCanvas.setAttribute("id", "barGraph");
    cnvs.appendChild(dCanvas);
    //createGraph();
}
/*
function createGraph() {
    var cxt = document.getElementById("barGraph").getContext("2d");
                        
    var graph = new BarGraph(cxt);
    graph.margin = 2;
    graph.width = 450;
    graph.height = 150;
    graph.xAxisLabelArr = ["Vata", "Pitta", "Kapha"];
    graph.update([3, 5, 3]);   
}

function BarGraph(ctx) {

  // Private properties and methods
	
  var that = this;
  var startArr;
  var endArr;
  var looping = false;
		
}
*/