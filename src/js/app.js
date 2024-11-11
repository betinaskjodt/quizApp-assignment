
const quizContainer = document.querySelector(".quiz__container");
const startButton = document.querySelector(".quiz__start-btn");
const questionContainer = document.querySelector(".quiz__question-container");
const quizQuestion = document.querySelector(".quiz__question-text");
const quizOptionContainer = document.querySelector(".quiz__question-options");
const nextButton = document.querySelector(".quiz__next-btn");
// const quizProgressContainer = document.querySelector(".quiz__progress-container");
const progressText = document.querySelector(".quiz__progress-text");
const restartButton = document.querySelector(".quiz__restart-btn");
const reviewButton = document.querySelector(".quiz__review-btn");
const reviewContainer =document.querySelector(".quiz__review-container");

const questions = [
    {
        question: "1. What day is halloween?",
        answers: ["31. october", "1. november", "13. october"],
        correctAnswer : "31. october",
        userAnswer: ""
    },
    {
        question: "2. Where do real vampirebats live?",
        answers: ["Both in North and South America", "South America", "North America"],
        correctAnswer: "Both in North and South America",
        userAnswer: ""
    },
    {
        question: "3 What was Dr. Frankenstein's first name?", 
        answers: ["Henrik", "Victor", "Alexander"],
        correctAnswer: "Victor",
        userAnswer: ""
    },
    {
        question: "4 Which country celebrates 'Day of the Dead' instead of Halloween?", 
        answers: ["China", "Spain", "Mexico"],
        correctAnswer: "Mexico",
        userAnswer: ""
    },
    {
        question: "5 Which orange fruit is widely used during Halloween?", 
        answers: ["Orange", "Pumpkin", "Persimmon"],
        correctAnswer: "Pumpkin",
        userAnswer: ""
    },
    {
        question: "6 Which animal is associated with Halloween?", 
        answers: ["Black snakes", "Black dogs", "Black cats"],
        correctAnswer: "Black cats",
        userAnswer: ""
    },
    {
        question: "7 When did Halloween celebrations in Norway make a breakthrough?", 
        answers: ["The end of the 19th century", "In the early 2000s", "Around the 1980s"],
        correctAnswer: "In the early 2000s",
        userAnswer: ""
    },
    {
        question: "8 What country did the real Dracula rule over?", 
        answers: ["Luxembourg", "Austria", "Romania"],
        correctAnswer: "Romania",
        userAnswer: ""
    },
];

let progressscore = 0;
let currentQuestion = 0;

const startQuiz = ()=>{
    startButton.classList.add("hide");
    progressscore = 0;
    currentQuestion = 0;
    showQuestion();
};

const showQuestion = ()=>{
    questionContainer.classList.remove("hide");
    restartButton.classList.remove("hide");

    const question = questions[currentQuestion];
    quizQuestion.textContent = question.question;

    quizOptionContainer.innerHTML = "";

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
            // questionOption.addEventListener("mouseenter", ()=> {
            //     questionOption.style.backgroundColor = "black";
            // })
            quizOptionContainer.appendChild(questionOption);
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
    questions[currentQuestion].userAnswer = selectedAnswer;

    if(selectedAnswer === questions[currentQuestion].correctAnswer){
        progressscore++
    }; 
    nextButton.disabled = false
    // currentQuestion++;
    // if(currentQuestion >= questions.length){
    //     showScore();
    //     // too soon will not show next question?
    // } else {
    //     showQuestion();
    // }
};

const nextQuestion =()=>{
    quizOptionContainer.innerHTML = "";
};

const showProgressBar = ()=>{
    progressText.textContent = `question ${currentQuestion +1} of ${questions.length}`;

};

const resetQuiz = ()=>{
    currentQuestion = 0;
    progressscore = 0;
    showQuestion()
};

const showScore = ()=>{
    questionContainer.classList.add("hide");
    restartButton.classList.remove("hide");
    reviewButton.classList.remove("hide");
};

const reviewResult = ()=>{
    const result = document.createElement("p");
    result.textContent = `Final Score: ${progressscore} out of ${questions.length} 😎`;
    // reviewContainer.append(result);
    // result.classList.add("result");
    // quizContainer.append(result);
    // const resultheader = document.createElement("h2");
    // const resultParagraph = document.createElement("p");
    // resultheader.textContent = "Your Result from Quiz 😎";
    // resultParagraph.textContent = `Final Score: ${progressscore} out of ${questions.length} 😎`;
    // result.append(resultheader, resultParagraph);
    reviewContainer.appendChild(result)
    questions.forEach(question => {
        const questionReviewContainer = document.createElement("div");
        const questionReviewText = document.createElement("p");
        const questionReviewUserAnswer = document.createElement("p");
        reviewContainer.append(questionReviewContainer);
        questionReviewContainer.append(questionReviewText, questionReviewUserAnswer);
        
        questionReviewText.textContent = question.question;
        questionReviewUserAnswer.textContent = `The correct answer is ${question.correctAnswer} you picked ${question.userAnswer}`;
    });

};

const restartQuiz = ()=>{
    startButton.classList.remove("hide");
    questionContainer.classList.add("hide");
    restartButton.classList.add("hide");
    reviewButton.classList.add("hide");

    reviewContainer.textContent = "";
    progressText.textContent = "";

    currentQuestion = 0;
    progressscore = 0;
};

document.addEventListener("DOMContentLoaded", ()=>{
    questionContainer.classList.add("hide");
    restartButton.classList.add("hide");
    reviewButton.classList.add("hide");

});

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", ()=>{
    currentQuestion++;
    nextButton.disabled = true;
    
    if(currentQuestion < questions.length){
        showQuestion()
    
        if (currentQuestion === questions.length -1 ) {
            nextButton.textContent = "Submit"
        }
    } else {
        progressText.textContent = "";
        showScore()
    };
});

restartButton.addEventListener("click", restartQuiz);

reviewButton.addEventListener("click", reviewResult);




