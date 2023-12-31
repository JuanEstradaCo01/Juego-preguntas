//Preguntas
const questions = readText("questions.json")
const questionsParse = JSON.parse(questions)
let question 
let responses
let score = 0
const btns = [
    document.getElementById("btn1"),
    document.getElementById("btn2"),
    document.getElementById("btn3"),
    document.getElementById("btn4"),
]

function questionActual(number){
    question = questionsParse[number]

    if(question === undefined){
        Swal.fire({
            title: "<strong>Juego terminado</strong>",
            icon: "success",
            html: `
              <p>Haz completado todas las preguntas</p>
            `,
            showConfirmButton: false,
            footer: `<a href="index.html"><button type="button" class="btn btn-warning">Ir al inicio</button></a>`
          });
    }
    //Agrego toda la informacion de la pregunta:
    document.getElementById("category").innerHTML = question.category
    document.getElementById("countQuestion").innerHTML = question.id
    document.getElementById("totalQuestions").innerHTML = questionsParse.length - 1
    document.getElementById("question").innerHTML = question.question
    document.getElementById("img").setAttribute("src", question.img)
    answers(question)
}

//Escojo pregunta:
function findQuestion(){
    if(question === undefined){
        questionActual(0)
    }

    const index = questionsParse.findIndex(item=>item.id === question.id)
    const i = index + 1
    questionActual(i)
}
findQuestion()

//Desordenar respuestas:
function answers(question){
    responses = [
        question.correctAnswer,
        question.failAnswer1,
        question.failAnswer2,
        question.failAnswer3
    ]
    //Desordeno las respuestas dentro del array:
    responses.sort(() => Math.random()-0.5)

    document.getElementById("btn1").innerHTML = responses[0]
    document.getElementById("btn2").innerHTML = responses[1]
    document.getElementById("btn3").innerHTML = responses[2]
    document.getElementById("btn4").innerHTML = responses[3]
}

//Restablecer color respuestas:
function resetBtns(){
    for( const btn of btns){
        btn.style.background = "white"
    }
    //Busco una nueva pregunta
    findQuestion()
}

//Funcion al oprimir boton:
function pressBtn(index){
    if(responses[index] === question.correctAnswer){
        Swal.fire({
            icon: "success",
            title: "¡Correcto!",
            confirmButtonText: "Siguiente"
        });

        btns[index].style.background =  "green"

        setTimeout(() => {
            resetBtns()
        }, 2500);
    }else{
        Swal.fire({
            icon: "error",
            title: "Incorrecto",
            text: `La respuesta correcta es: '${question.correctAnswer}'`,
            confirmButtonText: "Siguiente"
        });
        btns[index].style.background =  "red"

        setTimeout(() => {
            resetBtns()
        }, 2500);
    }
}

function style(id){
    return select_id(id).style
}

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