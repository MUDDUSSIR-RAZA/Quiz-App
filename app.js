// Selecting the elements from the DOM
const quizzNameContainer = document.querySelector(".quizzNamecontainer");
const quizzQuestionsContainer = document.querySelector(".quizzQuestionsContainer");
const resultContainer = document.querySelector(".resultContainer");

// Defining the Quiz class
class Quiz {
    constructor(questions) {
        // Randomizing the order of the questions
        this.questions = Quiz.shuffleArray(questions.questions);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.displayQuestions();
    }

    // Method to display the questions
    displayQuestions() {
        // Clearing the previous question and answers
        quizzQuestionsContainer.innerHTML = "";
        // Selecting the current question
        const currentObject = this.questions;
        const currentQuestion = currentObject[this.currentQuestionIndex];
        const ansDiv = document.createElement("div");
        ansDiv.className = ("answers");

        // Creating HTML for the current question and its options
        quizzQuestionsContainer.innerHTML = `
      <div class="questionNumber">
        <h3>
          QUESTION ${this.currentQuestionIndex + 1}
        </h3>
      </div>
      <div class="question">
        <h4>
          ${currentQuestion.question}
        </h4>
      </div>
    `;

        // Shuffling the options and displaying them as buttons
        const shufelledOptions = Quiz.shuffleArray(currentQuestion.options);
        shufelledOptions.forEach((questions) => {
            const button = document.createElement("button");
            button.innerText = questions;
            button.addEventListener("click", this.checkAnswer.bind(this));
            ansDiv.appendChild(button);
            quizzQuestionsContainer.appendChild(ansDiv);
        });
    }

    // Method to check the selected answer and update score
    checkAnswer(event) {
        const selectAnswer = event.target.textContent;
        const currentObject = this.questions;
        const currentQuestion = currentObject[this.currentQuestionIndex];
        if (selectAnswer === currentQuestion.answer) {
            this.score++;
        }

        this.currentQuestionIndex++;

        // If there are more questions, display the next question
        if (this.currentQuestionIndex < currentObject.length) {
            this.displayQuestions();
        } else {
            // Otherwise, show the quiz result
            this.showResult();
        }
    }

    // Method to display the final result
    showResult() {
        quizzQuestionsContainer.style.display = "none";
        resultContainer.style.display = "block";
        resultContainer.innerHTML = `
      <div class="resultHeading">
        <h2>
          Result
        </h2>
      </div>
      <div class="result">
        <p>
          you Scored ${this.score} out of 15 Questions.
        </p>
      </div>
    `;
        const btnDiv = document.createElement("div");
        btnDiv.className = "reloadQuiz";
        const btn = document.createElement("button");
        btn.id = "reload";
        btn.innerText = "Reload Quiz";
        btnDiv.appendChild(btn);
        resultContainer.appendChild(btnDiv);

        // Reload the quiz when the button is clicked
        btn.addEventListener("click", () => {
            quizzNameContainer.style.display = "flex";
            quizzQuestionsContainer.style.display = "none";
            resultContainer.style.display = "none";
        });
    }

    // Static method to shuffle an array
    static shuffleArray(arr) {
        return [...arr].sort(() => Math.random() - 0.5);
    }
}



// Function to load a quiz
const loadQuizz = (questions) => {
    const quiz = new Quiz(questions);
    quizzNameContainer.style.display = "none"; // Hide quiz name container
    quizzQuestionsContainer.style.display = "block"; // Show quiz questions container
}

// Function to load all quizzes
const loadAllQuizzes = async () => {
    const response = await fetch("./quiz.json");
    const quizzes = await response.json();

    // Sort quizzes in alphabetical order by quiz title
    quizzes.sort((a, b) => {
        if (a.quizTitle < b.quizTitle) return -1;
        if (a.quizTitle > b.quizTitle) return 1;
        return 0;
    });

    // Loop through each quiz and create a clickable div for it
    quizzes.forEach((quiz) => {
        const div = document.createElement("div");
        div.className = ("quizzName");
        div.innerHTML = `<h4>${quiz.quizTitle}</h4>`;
        div.addEventListener("click", () => loadQuizz(quiz));
        quizzNameContainer.appendChild(div);
    })
};

// Call the function to load all quizzes when the page loads
loadAllQuizzes();