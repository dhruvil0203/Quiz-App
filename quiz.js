const questions = [
    {
        question:'Which country has the most time zones in the world?',
        answers:[
            {text:"Africa",correct:false},
            {text:"United States Of America",correct:false},
            {text:"United Kingdom",correct:false},
            {text:"France",correct:true}

        ]
    },
    {
        question:'What is the smallest country in the world by land area?',
        answers:[
            {text:"bangladesh",correct:false},
            {text:"Vatican City",correct:true},
            {text:" Monaco",correct:false},
            {text:"Malta",correct:false}

        ]
    },{
        question:'Which continent is known as the "cradle of civilization"?',
        answers:[
            {text:"Africa",correct:true},
            {text:"Asia",correct:false},
            {text:"Europe",correct:false},
            {text:"Autralia",correct:false}

        ]
    },{
        question:'Which city in Gujarat is known as the "Manchester of India" due to its thriving textile industry',
        answers:[
            {text:"Mumbai",correct:false},
            {text:"Delhi",correct:false},
            {text:"Bangluru",correct:false},
            {text:"Ahemedabad",correct:true}

        ]
    },{
        question:'Which Mumbai-based tech startup developed the world’s first AI-powered chatbot for the legal industry',
        answers:[
            {text:"Lawrbit ",correct:true},
            {text:"inMobi",correct:false},
            {text:"Boat",correct:false},
            {text:"Paytm",correct:false}

        ]
    },
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-button')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questioNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questioNo + "." +currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer)
    })
}
function resetState(){
        nextButton.style.display = 'none';
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild)
        }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const iscorrct = selectbtn.dataset.correct === 'true';
    if(iscorrct){
        selectbtn.classList.add('correct')
        score++;
    }else{
        selectbtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block'
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

startQuiz()