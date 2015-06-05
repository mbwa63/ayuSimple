window.onload = init;

function init() {
    getDoshaData();
}

function createQuestionLayout() {
    
}

function getDoshaData() {
    var request = new XMLHttpRequest();
    request.open("GET", "doshaQuestions.json");
    
    request.onreadystatechange = function(){
        console.log("request " + request)
        if(this.readyState == this.done && this.status == 200){
            var type = request.getResponseHeader("Content-Type");
            console.log("Content-type is " + type);
            
            if(this.resoponseText != null) {
                console.log("It's not null");
            } else {
                console.log("Oops, it's null");
            }
        }
    }
}