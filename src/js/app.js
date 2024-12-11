const questions = [
  {
    question: "What day is halloween?",
    answers: ["31.October", "1.November", "13.October"],
    correctAnswer: "31. october",
    userAnswer: "",
  },
  {
    question: "Where do real vampirebats live?",
    answers: [
      "Both in North and South America",
      "South America",
      "North America",
    ],
    correctAnswer: "Both in North and South America",
    userAnswer: "",
  },
  {
    question: "What was Dr. Frankenstein's first name?",
    answers: ["Henrik", "Victor", "Alexander"],
    correctAnswer: "Victor",
    userAnswer: "",
  },
  {
    question:
      "Which country celebrates 'Day of the Dead' instead of Halloween?",
    answers: ["China", "Spain", "Mexico"],
    correctAnswer: "Mexico",
    userAnswer: "",
  },
  {
    question: "Which orange fruit is widely used during Halloween?",
    answers: ["Orange", "Pumpkin", "Persimmon"],
    correctAnswer: "Pumpkin",
    userAnswer: "",
  },
  {
    question: "Which animal is associated with Halloween?",
    answers: ["Black snakes", "Black dogs", "Black cats"],
    correctAnswer: "Black cats",
    userAnswer: "",
  },
  {
    question: "When did Halloween celebrations in Norway make a breakthrough?",
    answers: [
      "The end of the 19th century",
      "In the early 2000s",
      "Around the 1980s",
    ],
    correctAnswer: "In the early 2000s",
    userAnswer: "",
  },
  {
    question: "What country did the real Dracula rule over?",
    answers: ["Luxembourg", "Austria", "Romania"],
    correctAnswer: "Romania",
    userAnswer: "",
  },
];

const quizContainer = document.querySelector(".quiz__container");
const startButton = document.querySelector(".quiz__start-btn");
const questionContainer = document.querySelector(".quiz__question-container");
const quizQuestion = document.querySelector(".quiz__question-text");
const quizOptionContainer = document.querySelector(".quiz__question-options");
const nextButton = document.querySelector(".quiz__next-btn");
const progressContainer = document.querySelector(".quiz__progress-container");
const progressText = document.querySelector(".quiz__progress-text");
const restartButton = document.querySelector(".quiz__restart-btn");
const reviewButton = document.querySelector(".quiz__review-btn");
const reviewContainer = document.querySelector(".quiz__review-container");

let progressscore = 0;
let currentQuestion = 0;

const startQuiz = () => {
  nextButton.textContent = "Next";
  reviewButton.classList.add("hide");
  reviewContainer.classList.add("hide");
  progressContainer.classList.add("hide");

  progressscore = 0;
  currentQuestion = 0;

  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  nextButton.classList.remove("hide");
  restartButton.classList.remove("hide");

  showQuestion();
};

const showQuestion = () => {
  progressContainer.classList.remove("hide");
  quizOptionContainer.textContent = "";
  const question = questions[currentQuestion];
  quizQuestion.textContent = question.question;

  const questionOptionButtons = [];

  question.answers.forEach((answer) => {
    const questionOption = document.createElement("button");
    questionOption.classList.add("quiz__question-options-btn");
    questionOption.textContent = answer;
    questionOptionButtons.push(questionOption);

    questionOption.addEventListener("click", (e) => {
      checkAnswer(answer, questionOptionButtons);

      e.target.classList.add("quiz__question-options-btn--active");
    });

    quizOptionContainer.appendChild(questionOption);
  });

  showProgressBar();
};

const checkAnswer = (selectedAnswer, questionOptionButtons) => {
  questions[currentQuestion].userAnswer = selectedAnswer;

  if (selectedAnswer === questions[currentQuestion].correctAnswer) {
    progressscore++;
  }
  questionOptionButtons.forEach((btn) => {
    btn.disabled = true;
  });
  nextButton.disabled = false;
};

const showProgressBar = () => {
  progressText.textContent = `Question ${currentQuestion + 1} of ${
    questions.length
  }`;
};

const showScore = () => {
  questionContainer.classList.add("hide");
  restartButton.classList.remove("hide");
  reviewButton.classList.remove("hide");
  nextButton.classList.add("hide");

  quizQuestion.textContent = "";
  quizOptionContainer.textContent = "";

  progressText.textContent = `Final score: ${progressscore} out of ${questions.length} 😎`;
};

const reviewResult = () => {
  quizContainer.classList.remove("hide");
  progressContainer.classList.add("hide");
  progressText.classList.add("hide");
  questionContainer.classList.add("hide");
  reviewButton.classList.add("hide");
  reviewContainer.classList.remove("hide");

  if (!quizQuestion.textContent.trim()) {
    quizQuestion.classList.add("hide");
  }

  if (!quizOptionContainer.textContent.trim()) {
    quizOptionContainer.classList.add("hide");
  }

  reviewContainer.textContent = "";

  const result = document.createElement("h2");
  result.classList.add("result");
  result.textContent = `Final Score: ${progressscore} out of ${questions.length} 😎`;
  reviewContainer.appendChild(result);

  questions.forEach((question) => {
    const questionReviewContainer = document.createElement("div");
    questionReviewContainer.classList.add("review-container");

    const questionReviewText = document.createElement("p");
    const questionReviewUserAnswer = document.createElement("p");
    const questionCorrectAnswer = document.createElement("p");

    reviewContainer.appendChild(questionReviewContainer);
    questionReviewContainer.append(
      questionReviewText,
      questionReviewUserAnswer,
      questionCorrectAnswer
    );

    questionReviewText.textContent = question.question;
    questionReviewUserAnswer.textContent = `- You answered ${question.userAnswer}.`;
    questionCorrectAnswer.textContent = `- The correct answer is ${question.correctAnswer}.`;
  });
};

const restartQuiz = () => {
  startButton.classList.remove("hide");
  questionContainer.classList.add("hide");
  nextButton.classList.add("hide");
  restartButton.classList.add("hide");
  reviewButton.classList.add("hide");
  reviewContainer.classList.add("hide");

  quizQuestion.textContent = "";
  quizOptionContainer.textContent = "";
  reviewContainer.textContent = "";
  progressText.textContent = "";

  currentQuestion = 0;
  progressscore = 0;
};

document.addEventListener("DOMContentLoaded", () => {
  restartButton.classList.add("hide");
  reviewButton.classList.add("hide");
  nextButton.classList.add("hide");
  reviewContainer.classList.add("hide");
});

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", () => {
  currentQuestion++;
  nextButton.disabled = true;

  if (currentQuestion < questions.length) {
    showQuestion();

    if (currentQuestion === questions.length - 1) {
      nextButton.textContent = "Submit";
    }
  } else {
    progressText.textContent = "";
    showScore();
  }
});

restartButton.addEventListener("click", restartQuiz);

reviewButton.addEventListener("click", reviewResult);
