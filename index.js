//query selectors
let questionBox = document.querySelector(".question-box")
let startButton = document.querySelector("#start-button")
let timerEl = document.querySelector(".timer")
let flavorText = document.querySelector(".flavortext")
let answerSection = document.querySelector(".answer-section")
let answerBox = document.querySelectorAll(".answer-box")
let answerA = document.getElementById("a")
let answerB = document.getElementById("b")
let answerC = document.getElementById("c")
let answerD = document.getElementById("d")


//question/answer pairs put into an array of objects
let questions = [{
    question: 'What is the name of the Javascript object that represents a sequence of characters?',
    a: 'string',
    b: 'The DOM',
    c: 'Chrome Developer Tools',
    d: 'curly brackets',
    answer: 'a'
},
{
    question: 'What do we use in Javascript to target and manipulate HTML elements?',
    a: 'string',
    b: 'The DOM',
    c: 'Chrome Developer Tools',
    d: 'curly brackets',
    answer: 'b'
},
{
    question: 'What browser tool is commonly used to inspect document elements?',
    a: 'string',
    b: 'The DOM',
    c: 'Chrome Developer Tools',
    d: 'curly brackets',
    answer: 'c'
},
{
    question: 'What characters are used to enclose a code block?',
    a: 'string',
    b: 'The DOM',
    c: 'Chrome Developer Tools',
    d: 'curly brackets',
    answer: 'd'
}]

//initializing a bunch of variables
let selectedAnswer = ''
let lastQuestion = (questions.length - 1)
let currentQuestion = 0
let timeInterval
let score = 0
let highScore //this is the high score read from local storage
let newHighScore //this is the high score written into local storage
let scoreUser //this is the initials of the current player of the game
let highScoreUser //this is the initials of the highest scoring player read from local storage
let newHighScoreUser //this is the initials of the highest scoring player written into local storage
let inputForm = document.createElement("form")
let initialsInput = document.createElement("input")
let submit = document.createElement("input")
submit.type = "submit"
submit.value = "Submit"
initialsInput.type = "text"
initialsInput.placeholder = "Enter your initials here!"

//initial display state
questionBox.innerHTML = "<h1>CODING QUIZ CHALLENGE</h1><p>Try to answer the following Javascript coding questions. At the end, you'll be able to enter your initials and see the high score!</p>"
for(let i = 0; i< answerBox.length; i++){
    answerBox[i].style.display = 'none'
}
answerSection.style.height = '0px'


//event listener for the start button
startButton.addEventListener("click", playGame)

//event listeners for the answer buttons
answerA.addEventListener("click", function(){
    selectedAnswer = 'a'
    checkAnswer()
})
answerB.addEventListener("click", function(){
    selectedAnswer = 'b'
    checkAnswer()
})
answerC.addEventListener("click", function(){
    selectedAnswer = 'c'
    checkAnswer()
})
answerD.addEventListener("click", function(){
    selectedAnswer = 'd'
    checkAnswer()
})

//places questions on the page
function placeQuestion() {
    let q = questions[currentQuestion]
    for(let i = 0; i < questions.length; i++){
        answerBox[i].style.display = 'block'
        answerSection.style.height = '250px'
        questionBox.innerHTML = '<h1>' + q.question + '</h1>'
        answerA.textContent = q.a
        answerB.textContent = q.b
        answerC.textContent = q.c
        answerD.textContent = q.d


    }
}
//compares your answer to correct answer, iterates score if correct, places flavor text message
//also checks to see if the most recent question was the last one, and if so, ends the game
function checkAnswer(){
    if(currentQuestion === lastQuestion){
        startButton.style.display = 'inline-block'
        timerEl.textContent = "Game Over!"
        if(selectedAnswer === questions[currentQuestion].answer){
            score++
            console.log(score)
            flavorText.textContent = 'You got it!'    
        }
        else{
            flavorText.textContent = 'Wrong, sorry.'
        }
        questionBox.innerHTML = "<h1>Well done! You scored " + score + " point(s)!</h1>"
        questionBox.appendChild(inputForm)
        inputForm.appendChild(initialsInput)
        inputForm.appendChild(submit)
        for(let i = 0; i< answerBox.length; i++){
            answerBox[i].style.display = 'none'
            flavorText.textContent = ''
            answerSection.style.height = '0px'
            // answerSection.innerHTML = "<input type='text' name='user-initials' id='user-initials'"
        }  
        clearInterval(timeInterval)
        return
    }
    
    if(selectedAnswer === questions[currentQuestion].answer){
        score++
        console.log(score)
        flavorText.textContent = 'You got it!'
    }else{
        flavorText.textContent = 'Wrong, sorry.'
    }
    currentQuestion++
    placeQuestion()
}

function timer() { //timer function
    let timeLeft = 15
    timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft + ' seconds left.' //displays time left
        timeLeft-- //decrements timer
            if (timeLeft === 0) {
                clearInterval(timeInterval); //stops timer
                timerEl.textContent = ""
                questionBox.innerHTML = "<h1>Time's Up! You scored " + score + " point(s)!</h1>"
                for(let i = 0; i< answerBox.length; i++)
                    answerBox[i].style.display = 'none'
        }
        }
    , 1000);
}

function playGame(){ //starts game
    score = 0
    currentQuestion = 0
    startButton.style.display = 'none'
    getHighScore()
    timer()
    placeQuestion()
    setHighScore()
}

function setHighScore(){ //puts high score into local storage
    localStorage.setItem('highScore', 'newHighScore')
    localStorage.setItem('highScoreUser', 'newHighScoreUser')
}

function getHighScore(){ //gets high score from local storage
  highScore = localStorage.getItem('highScore')
  highScoreUser = localStorage.getItem('highScoreUser')
}



function highScoreScreen(){
    questionBox.innerHTML = "<h1> The all time high score is " + highScore + " by " + highUser + "!"
}

//current todos:
    //high score
        //have the user input their initials at the game over/score show screen
        //if there is a high score in local storage, compare the score to the high score.
        //if the score is higher than the high score, then replace the high score with the current score
        //if no high score, the current score becomes the high score
        //put the new high score into local storage
        //display the high score when the high score button is pressed
