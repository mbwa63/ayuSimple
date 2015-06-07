

var q1 = new Question("0", "Vata", "Physical Attributes", "My physique is thin - I don't gain weight easily.", 0);
var q1Json = JSON.stringify(q1);
var q2 = new Question("1", "Vata", "Physical Attributes", "I am quick and active.", 0);
var q2Json = JSON.stringify(q2);

var qObjArray = [q1,q2];

window.onload = init;

function init() {
    //getDoshaData();
    createQuestion(q1);
     createQuestion(q2);
    document.createElement("ul", "qList");
    getDoshaData()
}

function Question(id, type, heading, qText, answer) {
    this.id = id;
    this.type = type;
    this.heading = heading;
    this.qText = qText;
    this.answer = answer;
}

//create elements that make up indivdual questions
function createQuestion(question) {
    console.log(question.qText);
    var div = document.getElementById("dq");
    var fragment = document.createDocumentFragment();
    var qList = document.createElement("ul");
    qList.setAttribute("class", "qList");
    qList.setAttribute("id", question.id);
    
    fragment.appendChild(qList);
    
    var qItem = document.createElement("li");
    qList.appendChild(qItem);
   
    var qText = document.createElement("p");
    qText.innerHTML = question.qText;
    qList.appendChild(qText);
    answers = setupInput(question)
    qList.appendChild(answers);
    //this id will be used to reference the object array
    answers.setAttribute("id", question.id);
    div.appendChild(fragment);
    
}

function setupInput(obj) {
    var tot = 6;
    var div = document.createElement("div")
    var form = document.createElement("form");
    var fragment = document.createDocumentFragment();
   
    for(var i = 0; i < tot; i++) {
        var radio = document.createElement("input");
        radio.setAttribute("type","radio");
        radio.onclick = handleDQSelect;
        radio.setAttribute("id", obj.id+"_"+i)
        radio.setAttribute("value", i)
        fragment.appendChild(radio);
    }
    form.appendChild(fragment);
    div.appendChild(form);
    obj.inputs = form;
    return div;
}

function handleDQSelect(e) {
    //reset radio elements
    for(var i = 0; i < e.target.parentElement.childNodes.length; i++) {
        e.target.parentElement.childNodes[i].checked = false   
    }
    
    e.target.checked = true;
    qObjArray[e.target.parentElement.parentElement.id].answer = e.target.value;
}

function getDoshaData() {
    console.log("trying to get data")
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    request.open("get", "doshaQuestions.json");
    
    request.onreadystatechange = function(){
        console.log("request " + request)
        if(this.readyState == this.done && this.status == 0){
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



