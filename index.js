// query selectors
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
let highScoreButton = document.getElementById("high-score-button")


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
let highScore = 0 //this is the high score read from local storage
let newHighScore //this is the high score written into local storage
let scoreUser //this is the initials of the current player of the game
let highScoreUser = '' //this is the initials of the highest scoring player read from local storage
let newHighScoreUser //this is the initials of the highest scoring player written into local storage
let inputForm = document.createElement("form")
let initialsInput = document.createElement("input")
let submit = document.createElement("input")
let timeLeft

getHighScore()

//set up the form elements
inputForm.style.margin = '5%'
submit.type = "submit"
submit.value = "Submit"
submit.classList.add("submit-button")
initialsInput.type = "text"
initialsInput.placeholder = "Enter your initials here!"
initialsInput.setAttribute('id', 'initials-input')

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

//event listener for the initials submit button
submit.addEventListener("click", recordInitials)

//event listener for high score button
highScoreButton.addEventListener("click", highScoreScreen)

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
        }  
        clearInterval(timeInterval)
        return
    }
    
    if(selectedAnswer === questions[currentQuestion].answer){
        score++
        console.log(score)
        flavorText.textContent = 'You got it!'
    }else{
        timeLeft = timeLeft - 10
        flavorText.textContent = 'Wrong, sorry. 10 second penalty!'
    }
    currentQuestion++
    placeQuestion()
}

function timer() { //timer function
    timeLeft = 100
    timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft + ' seconds left.' //displays time left
        timeLeft-- //decrements timer
            if (timeLeft === 0) {
                clearInterval(timeInterval); //stops timer
                timerEl.textContent = ""
                questionBox.innerHTML = "<h1>Time's Up! You scored " + score + " point(s)!</h1>"
                for(let i = 0; i< answerBox.length; i++){
                    answerBox[i].style.display = 'none'
                    startButton.style.display = 'block'
                }
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
    
}

function setHighScore(){ //puts high score into local storage
    highScore = newHighScore
    highScoreUser = newHighScoreUser
    localStorage.setItem("highScore", JSON.stringify(newHighScore))
    localStorage.setItem("highScoreUser", JSON.stringify(newHighScoreUser))
}

function getHighScore(){ //gets high score from local storage
        highScore = JSON.parse(localStorage.getItem("highScore"))
        highScoreUser = JSON.parse(localStorage.getItem("highScoreUser"))
}

function recordInitials(event){
    event.preventDefault()
    scoreUser = document.getElementById('initials-input').value
    if(score > highScore){
        newHighScore = score //set the new high score
        newHighScoreUser = scoreUser //set the new high score user
    }
    else{
        newHighScore = highScore
        newHighScoreUser = highScoreUser
    }
    setHighScore()
    console.log('highScore = ' + highScore)
    console.log('highScoreUser = ' + highScoreUser)
    highScoreScreen()

}

function highScoreScreen(){
    if(!highScore){
        questionBox.innerHTML = "No high scores yet. Be the first!"
        clearInterval(timeInterval)
        timerEl.textContent = ""
        flavorText.textContent = ""
        for(let i = 0; i< answerBox.length; i++){
            answerBox[i].style.display = 'none'
            startButton.style.display = 'block'
        }
    }
    else{
        getHighScore()
        clearInterval(timeInterval)
        timerEl.textContent = ""
        flavorText.textContent = ""
        questionBox.innerHTML = "<h1> The all time high score is " + highScore + " by " + highScoreUser + "!"
        for(let i = 0; i< answerBox.length; i++){
            answerBox[i].style.display = 'none'
            startButton.style.display = 'block'
        }
    }
}

//current todos:
    //add more questions
    //improve styling