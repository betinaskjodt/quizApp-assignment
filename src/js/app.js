
const quizContainer = document.querySelector(".quiz-container");
const startButton = document.querySelector(".quiz__start-btn");
const quizQuestionContainer = document.querySelector(".quiz__question-container");
const quizQuestion = document.querySelector(".quiz__question-text");
const quizQuestionOptions = document.querySelector(".quiz__question-options");
const nextButton = document.querySelector(".quiz__next-btn");
const quizProgressContainer = document.querySelector(".quiz__progress-container");
const quizProgressbar = document.querySelector(".quiz__progressbar");
const restartButton = document.querySelector(".quiz__restart-btn");
const reviewButton = document.querySelector(".quiz__review-btn");

const questions = [
    {
        question: "1 What day is halloween?",
        answers: ["31. october", "1. november", "13. october"] ,
        correctAnswer : "31. october",
    },
    {
        question: "2 Where do real vampirebats live?",
        answers: ["Both in North and South America", "South America", "North America"],
        correctAnswer: "Both in North and South America",
    },
    {
        question: " 3 What was Dr. Frankenstein's first name?", 
        answers: ["Henrik", "Victor", "Alexander"],
        correctAnswer: "Victor",
    },
    {
        question: " 4 Which country celebrates 'Day of the Dead' instead of Halloween?", 
        answers: ["China", "Spain", "Mexico"],
        correctAnswer: "Mexico",
    },
    {
        question: "5 Which orange fruit is widely used during Halloween?", 
        answers: ["Orange", "Pumpkin", "Persimmon"],
        correctAnswer: "Pumpkin",
    },
    {
        question: "6 Which animal is associated with Halloween?", 
        answers: ["Snakes", "Golden retriever", "Black cats"],
        correctAnswer: "Black cats",
    },
    {
        question: "7 When did Halloween celebrations in Norway make a breakthrough?", 
        answers: ["The end of the 19th century", "In the early 2000s", "Around the 1980s"],
        correctAnswer: "In the early 2000s",
    },
    {
        question: "8 What country did the real Dracula rule over?", 
        answers: ["Luxembourg", "Austria", "Romania"],
        correctAnswer: "Romania",
    },
];

let finalscore = 0;
let progressscore = 0;
let currentQuestion = 0;

const startQuiz = ()=>{
    startButton.classList.add("hide");
    progressscore = 0;
    finalscore = 0; 
    currentQuestion = 0;
    showQuestion();
};

const showQuestion = ()=>{
    quizQuestionContainer.classList.remove("hide");
    restartButton.classList.remove("hide");

    const question = questions[currentQuestion];
    quizQuestion.textContent = question.question;

    quizQuestionOptions.innerHTML = "";

    // quizQuestionContainer.innerHTML = "";

    // quizQuestion.textContent = questions[currentQuestion].question;

    // if(currentQuestion < questions.length){
        
    //     currentQuestion++;
    // } else {
    //     quizQuestionContainer.classList.add("hide");
    //     reviewButton.classList.remove("hide");
    // }

        question.answers.forEach(answer =>{
            const questionOption = document.createElement("button");
            questionOption.classList.add("quiz__question-options-btn");
            questionOption.textContent = answer;
            questionOption.addEventListener("click",  ()=>{
                checkAnswer(answer);
            });
            quizQuestionOptions.appendChild(questionOption);
        });
    // questions.forEach(question =>{

    //     question.answers.forEach( (answer)=>{
    //         const questionOption = document.createElement("button");
    //         questionOption.classList.add("quiz__question-options-btn");
    //         quizQuestionOptions.append(questionOption);
    //         // console.log(`answer ${index +1}: ${answer}`);
    //         questionOption.textContent = answer;
    //         questionOption.addEventListener("click", ()=>{

    //         })
    //         // for(let answer in element){

    //         // }
    //     });
    // });
    showProgressBar();
};

const checkAnswer = (selectedAnswer)=>{
    questions[currentQuestion].userSelectAnswer = selectedAnswer;

    if(selectedAnswer === questions[currentQuestion].correctAnswer){
        progressscore++
    } 
    currentQuestion++;
    if(currentQuestion >= questions.length){
        showScore();
        // too soon will not show next question?
    } else {
        showQuestion();
    }
};

const nextQuestion =()=>{
    quizQuestionOptions.innerHTML = "";
};

const showProgressBar = ()=>{
    const progress = (progressscore/questions.length) * 100;
    quizProgressbar.style.width = `${progressscore}`;
    quizProgressbar.style.textContent = `question 1 ${currentQuestion +1} of ${questions.length}`;
};

const resetQuiz = ()=>{
    currentQuestion = 0;
    progressscore = 0;
    finalscore = 0;
    showQuestion()
};

const showScore = ()=>{
    quizQuestionContainer.classList.add("hide");
    restartButton.classList.remove("hide");
    reviewButton.classList.remove("hide");
};

const reviewResult = ()=>{
    const result = document.createElement("div");
    result.classList.add("result");
    quizContainer.append(result);
    const resultheader = document.createElement("h2");
    const resultParagraph = document.createElement("p");
    resultheader.textContent = "Your Result from Quiz 😎";
    resultParagraph.textContent = `Final Score: ${progressscore} out of ${questions.length} 😎`;
    result.append(resultheader, resultParagraph);
};

const restartQuiz = ()=>{
    startButton.classList.remove("hide");
    quizQuestionContainer.classList.add("hide");
    restartButton.classList.add("hide");
    currentQuestion = 0;
    progressscore = 0;
    finalscore = 0;
    quizProgressbar.style.width = "0%"
};

document.addEventListener("DOMContentLoaded", ()=>{
    quizQuestionContainer.classList.add("hide");
    restartButton.classList.add("hide");
    reviewButton.classList.add("hide");
});

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", ()=>{
    currentQuestion++;
    if(currentQuestion < questions.length){
        showQuestion()
    } else {
        showScore()
    };
});

restartButton.addEventListener("click", restartQuiz);

reviewButton.addEventListener("click", reviewResult);




