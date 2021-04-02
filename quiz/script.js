const quizQuestions = [
    {
        text: 'What is Dave\'s favourite ice cream flavour?',
        a: 'Lemon',
        b: 'Vanilla',
        c: 'Coconut',
        d: 'Chocolate',
        correct: 'd'
    },
    {
        text: 'What car does Dave own?',
        a: 'He doesn\'t own any',
        b: 'Audi',
        c: 'Ford',
        d: 'Volvo',
        correct: 'c'
    },
    {
        text: 'What is Dave\'s brother\'s name?',
        a: 'Arnold',
        b: 'Mati',
        c: 'Aleksander',
        d: 'Franciszek',
        correct: 'b'
    },
    {
        text: 'What does Dave have on his room\'s wall?',
        a: 'Cinema posters',
        b: 'Abstract paintings',
        c: 'Cool photos',
        d: 'Dozen clocks',
        correct: 'c'
    },
    {
        text: 'What programming language does Dave not know?',
        a: 'Ruby',
        b: 'JavaScript',
        c: 'Python',
        d: 'C++',
        correct: 'a'
    }
]

const questionText = document.getElementById("question-text")
const answerAText = document.getElementById("a-label")
const answerBText = document.getElementById("b-label")
const answerCText = document.getElementById("c-label")
const answerDText = document.getElementById("d-label")
const submitButton = document.getElementById("submit")

const remainingIndexes = quizQuestions.map((element, index) => index)
let id = loadQuestion(quizQuestions, remainingIndexes)    // load the first question
let score = 0   // initiate player's score

function loadQuestion(questions, indexes) {
    let index = Math.floor(Math.random() * indexes.length)
    let newQuestion = questions[indexes[index]]
    questionText.innerHTML = newQuestion['text']
    answerAText.innerHTML = newQuestion['a']
    answerBText.innerHTML = newQuestion['b']
    answerCText.innerHTML = newQuestion['c']
    answerDText.innerHTML = newQuestion['d']

    return indexes[index]
}

submitButton.addEventListener('click', () => {
    try {
        checkAnswer()
        remainingIndexes.splice(remainingIndexes.indexOf(id), 1)
        if(remainingIndexes.length > 0) {
            id = loadQuestion(quizQuestions, remainingIndexes)
        } else {
            printResult()
        }
    } catch (error) {
        console.log(error)
    }
})

function checkAnswer() {
    const quizAnswers = document.getElementsByTagName("input")
    let answersArray = [...quizAnswers] // convert list into array

    // filter input elements to get answer radio buttons
    answersArray = answersArray.filter(element => {
        return element.name == "answer"
    })

    if(answersArray.some(element => element.checked === true)) {
        answersArray.forEach(element => {
            if (element.checked === true && element.id === quizQuestions[id].correct) {
                score++
            }
            element.checked = false
        })
    } else {
        throw new Error('No option selected!')
    }
}

function printResult() {
    const boxEl = document.getElementById("box")
    boxEl.innerHTML = `<h2>Your result:</h2>\n<p>${score}/${quizQuestions.length
    }</p>`
}