# Quiz-Application

This is a simple quiz application that displays a set of questions and options to the user. It was created using HTML, CSS, and JavaScript.

## Functionality

This app displays a set of 15 questions, one at a time, to the user. The questions are displayed randomly from a pool of questions defined in a **quiz.json** file. Each question has four options, and the user can select one of the options as their answer. The correct answer is checked against the user's selection, and if the user is correct, their score is incremented. Once all the questions have been answered, the user's score is displayed, and they can choose to restart the quiz.

## Usage

To use the application, simply open the **index.html** file in a web browser. The quiz questions are loaded from the **quiz.json** file using an asynchronous **fetch()** call in the **loadAllQuizzes()** function.

Users can select one of the quizzes displayed on the screen to start the quiz. Once the quiz starts, each question is displayed one at a time, along with four options. Users can select one of the options by clicking on the button. Once an option is selected, the next question is displayed automatically. Once all 15 questions are answered, the user's score is displayed, along with a button to restart the quiz.

## Classes

### - Quiz

This is the main class that manages the quiz. It has the following properties:

**questions**: An array of **Question** objects.
**currentQuestionIndex**: The index of the current question being displayed.
**score**: The user's score.

The **Quiz** class also has the following methods:

**constructor(questions)**: Initializes the Quiz object with the given array of Question objects. The array is shuffled randomly.
**displayQuestions()**: Displays the current question and its options on the screen.
**checkAnswer(event)**: Checks the user's answer against the correct answer and updates the score.
**showResult()**: Displays the user's score and a button to restart the quiz.

### - Question

This class represents a quiz question. It has the following properties:

**question**: The question text.
**options**: An array of four strings, each representing an option.
**answer**: The index of the correct answer (0-3).

## Static methods

### - shuffleArray(arr)

This is a static method of the **Quiz** class that shuffles the given array using the Fisher-Yates algorithm.

## Functions

### - loadAllQuizzes()

This function is called when the page loads and loads all the quizzes from the **quiz.json** file. It sorts the quizzes alphabetically and creates a clickable **div** for each quiz.

### - loadQuiz(questions)
This function is called when a user selects a quiz. It initializes a **Quiz** object with the given array of Question objects and displays the first question on the screen.

## Credits
This movie recommendation app was created by **MUHAMMAD MUDDUSSIR RAZA** as part of a project or assignment.

## License
This project is licensed under the MIT License.
