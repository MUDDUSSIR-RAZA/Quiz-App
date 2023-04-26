const quizzNameContainer = document.querySelector(".quizzNamecontainer");
const quizzQuestionsContainer = document.querySelector(".quizzQuestionsContainer");
const resultContainer = document.querySelector(".resultContainer");


class Quiz {
    constructor(questions) {
        this.questions = Quiz.shuffleArray(questions.questions);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.displayQuestions();
    }

    displayQuestions() {
        quizzQuestionsContainer.innerHTML = "";
        const currentObject = this.questions;
        const currentQuestion = currentObject[this.currentQuestionIndex];
        const ansDiv = document.createElement("div");
        ansDiv.className = ("answers");
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
        const shufelledOptions = Quiz.shuffleArray(currentQuestion.options);
        shufelledOptions.forEach((questions) => {
            const button = document.createElement("button");
            button.innerText = questions;
            button.addEventListener("click", this.checkAnswer.bind(this));
            ansDiv.appendChild(button);
            quizzQuestionsContainer.appendChild(ansDiv);
        });
    }

    checkAnswer(event) {
        const selectAnswer = event.target.textContent;
        const currentObject = this.questions;
        const currentQuestion = currentObject[this.currentQuestionIndex];
        if (selectAnswer === currentQuestion.answer) {
            this.score++;
        }

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < currentObject.length) {
            this.displayQuestions();
        } else {
            this.showResult();
        }
    }

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
        btn.addEventListener("click" , () => {
            quizzNameContainer.style.display = "flex";
            quizzQuestionsContainer.style.display = "none";
            resultContainer.style.display = "none";
        });
    }

     static shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}



const loadQuizz = (questions) => {
    const quiz = new Quiz(questions);
    quizzNameContainer.style.display = "none";
    quizzQuestionsContainer.style.display = "block";
}

const loadAllQuizzes = async () => {
    const response = await fetch("./quiz.json");
    const quizzes = await response.json();

    quizzes.sort((a, b) => {
        if (a.quizTitle < b.quizTitle) return -1;
        if (a.quizTitle > b.quizTitle) return 1;
        return 0;
    });

    quizzes.forEach((quiz) => {
        const div = document.createElement("div");
        div.className = ("quizzName");
        div.innerHTML = `<h4>${quiz.quizTitle}</h4>`;
        div.addEventListener("click", () => loadQuizz(quiz));
        quizzNameContainer.appendChild(div);
    })
};

loadAllQuizzes();