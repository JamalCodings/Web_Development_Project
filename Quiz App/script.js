const questions = [
    {
        question: "whch is the largest animal in this world!",
       answers: [
            {text: "shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },

    {
        question: "whch is the largest desert in this world!",
       answers: [
            {text: "kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },

    {
        question: "whch is the smallest continent in this world!",
       answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    }
,

    {
        question: "whch is the smallest country in this world!",
       answers: [
            {text: "Nepal", correct: false},
            {text: "Bhutan", correct: true},
            {text: "Sri Lanka", correct: false},
            {text: "Vatican City", correct: true}
        ]
    }

];

const questionElement  = document.getElementById("question");
const answerButton  = document.getElementById("answer-buttons");
const nextButton  = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;XMLDocument

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    
}


function showQuestion() {
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        
    });

}


startQuiz();