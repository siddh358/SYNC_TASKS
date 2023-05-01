

const quizData = [
    {
       question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    { question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
        
    },
    {
        question: "HTML element for largest heading?",
        a: "<heading>",
        b: "<h6>",
        c: "<h1>",
        d: "<head>",
        correct: "c",
    },
    {
        question: "HTML element to define important text?",
        a: "<br>",
        b: "<important>",
        c: "<strong>",
        d: "<i>",
        correct: "c",
    }
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
           
            if(score>quizData.length/2){
                quiz.innerHTML = ` <button onclick="location.reload()"><h2>You answered ${score}/${quizData.length} questions correctly</h2></button>`
                let gif= document.createElement(`img`);
                gif.src=`giphy.gif`;
                gif.setAttribute(`class`,`gif`);
                
                quiz.appendChild(gif);
                
            }
            else{

                quiz.innerHTML = ` <button onclick="location.reload()"><h2>You answered ${score}/${quizData.length} questions correctly</h2></button>`
                let gif= document.createElement(`img`);
                gif.setAttribute(`class`,`gif`);
                gif.src=`giphy (1).gif`;
                
                quiz.appendChild(gif);
            }



    
        }
    }
})