
//var q1 = new Question("0", "Vata", "Physical Attributes", "My physique is thin - I don't gain weight easily.", 0);
//var q1Json = JSON.stringify(q1);
//var q2 = new Question("1", "Vata", "Physical Attributes", "I am quick and active.", 0);
//var q2Json = JSON.stringify(q2);

var doshaJsonData;


window.onload = init;

function init() {
    document.createElement("ul", "qList");
    getDoshaData();
    
}

function Dosha(total, physical, psychological) {
    this.total = total,
    this.physical = physical,
    this.psychological = psychological
}

vata = new Dosha(0, "Thin build; either tall or short. Vata people walk and talk fast but tire easily. Their appetite is variable but good digestive strength is missing.Vata skin is dry and thin. Due to poor circulation they complain easily of being cold, particularly at the periphery: nose, feet, hands.", "Vata predominant person has a quick mind, they grasp things quickly but forget them quickly. Vata people do not have a lot of will power, confidence or boldness. They are creative and flexible and easily 'go with the flow.' Their creativity often makes it hard for them to remain focused, tending to go hither and thither. They can earn money quickly and spend it quickly. They are alert, restless and very active. ");

pitta = new Dosha(0, "Medium build, Pitta people have strong metabolism, good digestion and strong appetites. They can gain weight but lose it easily. They have fair skin with moles, freckles. There is low tolerance for bright sunlight and heat. Pitta people are warm to the touch and their hands and feet stay warm. Hair is soft and has a tendency for premature graying or hair loss. They perspire easily. Pitta people sleep well in moderate duration." , "Pitta types are alert and intelligent and have good powers of comprehension. They like structure and organization and are good planners. Pitta people like to be leaders and seek material prosperity. They like to exhibit their wealth and possessions. They are ambitious and athletic.");

kapha = new Dosha(0, "Kapha people have a large build. This is because their metabolism is slow. While their digestive strength is good, their constitution is not inclined to engage in physical activity. Hence when out of balance, they can gain weight and do not lose it easily. They have thick skin and their bodies tend to have a muscular build. Their skin is oily and smooth. Eyes are large, dark with thick, long lashes and brows. Kapha people have deep, prolonged sleep. Their speech is regular, sometimes slow and paced.", "Kapha people tend to be laid back and calm, tolerant and forgiving. They like to see harmony and are good consensus builders. They tend to be reserved and introspective. While they may be slow to comprehend, their long term memory is excellent.");


//create elements that make up indivdual questions
function createQuestion(question) {
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
    createCanvasElement();
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

//reset all radio items in selected input then set selected item to true
function handleDQSelect(e) {
    for(var i = 0; i < e.target.parentElement.childNodes.length; i++) {
        e.target.parentElement.childNodes[i].checked = false   
    }
    
    e.target.checked = true;
    console.log("answer num is " + e.target.value)
    //console.log("value "+document.getElementById.target.parentElement.value);
    doshaJsonData[e.target.parentElement.parentElement.id - 1].answer = e.target.parentElement.parentElement.value;
    talleySelections();
}
//open and read json file
function getDoshaData() {
    console.log("[Retrieving JSON data]")
    var request = new XMLHttpRequest();
    
    request.open("GET", "doshaQuestions.json");
    
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            var type = request.getResponseHeader("Content-Type");
            if(this.responseText != null) {
                doshaJsonData = JSON.parse(this.responseText);
                loopJSON(doshaJsonData);
            } else {
                console.log("Oops, it's null");
            }
        }
    }
    
    request.send();
}

//loop and send object to createQuestion
function loopJSON(data) { 
    for(var i = 0; i < data.length; i++) {
        createQuestion(data[i]);
    }
}

function talleySelections() {
    for(var i = 0; i < doshaJsonData.length; i++) {
        console.log(vata.total)
        switch(doshaJsonData[i].type) {
            case "vata": vata.total = vata.total + doshaJsonData[i].answer;
                        break;
            case "pitta": pitta.total = pitta.total + doshaJsonData[i].answer;
                        break;
            case "kapha": kapha.total = kapha.total + doshaJsonData[i].answer;
                        break;
            default:
                        break;
        }
    }
    console.log("vata: " + vata.total + "' pitta: " + pitta.total + "' kapha: " + kapha.total);
}