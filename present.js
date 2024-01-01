//Preguntas
const questions = readText("questions.json")
const questionsParse = JSON.parse(questions)

function presentation(){
    const totalQuestions = questionsParse.length - 1
    const present = `¡${totalQuestions} preguntas sobre cultura general!`

    document.getElementById("presentation").innerHTML = present
}
presentation();

//Funcion para leer el archivo .json
function readText(route_local){
    let text = null
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.open("GET", route_local, false)
    xmlhttp.send()
    if(xmlhttp.status == 200){
        text = xmlhttp.responseText
    }
    return text
}