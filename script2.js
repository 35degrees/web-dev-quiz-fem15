const toggle = document.querySelector('.check-input')
const main = document.getElementById('main')
const body = document.querySelector('body')
const htmlButton = document.querySelector('.category-1')
const cssButton = document.querySelector('.category-2')
const jsButton = document.querySelector('.category-3')
const a11yButton = document.querySelector('.category-4')
const quizContainer = document.querySelector('.quiz-container')
const leftIntro = document.querySelector('.left')
const rightIntro = document.querySelector('.right')
const quizBox = document.querySelector('.quiz-box')
const tempSubmit = document.querySelector('.temp-submit')
const answer1 = document.querySelector('.answer-1')
const answer2 = document.querySelector('.answer-2')
const answer3 = document.querySelector('.answer-3')
const answer4 = document.querySelector('.answer-4')
const quizTitle = document.querySelector('.quiz-title')
const quizQuestion = document.querySelector('.quiz-question-text')

let currentQuestionIndex = 0
let answer
let score = 0

tempSubmit.addEventListener('click', fetchQuiz)

function fetchQuiz(e) {
	let language = e.target.innerText
	// console.log(language)
	currentQuestionIndex = 0
	score = 0
	fetch('./data.json')
		.then((res) => res.json())
		.then((data) => {
			if (language === 'HTML') {
				displayQuiz(data.quizzes[0])
			} else if (language === 'CSS') {
				displayQuiz(data.quizzes[1])
			} else if (language === 'Javascript') {
				displayQuiz(data.quizzes[2])
			} else {
				displayQuiz(data.quizzes[3])
			}
		})
}

function displayQuiz(quiz) {
	let currentQuestion = questions[currentQuestionIndex]
	let questionNumber = currentQuestionIndex + 1

	quizTitle.innerText = `
	Welcome to your ${quiz.title} Quiz! The answer is ${answer}
	`
	quizQuestion.textContent = `
	${quiz.questions[4].question}
	`
	answer1.textContent = `
	${quiz.questions[4].options[0]}
	`
	answer2.textContent = `
	${quiz.questions[4].options[1]}
	`
	answer3.textContent = `
	${quiz.questions[4].options[2]}
	`
	answer4.textContent = `
	${quiz.questions[4].options[3]}
	`
	checkAnswer(answer)
}

function confirmAnswer(e) {
	const userAnswer = e.target.innerText
	console.log(userAnswer)
	checkAnswer(userAnswer)
}

function checkAnswer(userAnswer, answer) {
	console.log('The user answer is ' + userAnswer)
	console.log('The true answer is ' + answer)
}
toggle.addEventListener('change', () => {
	if (toggle.checked === true) {
		body.classList.add('dark-mode')
		// console.log('added dark')
	} else {
		body.classList.remove('dark-mode')
		// console.log('removed dark')
	}
})

htmlButton.addEventListener('click', fetchQuiz)
cssButton.addEventListener('click', fetchQuiz)
jsButton.addEventListener('click', fetchQuiz)
a11yButton.addEventListener('click', fetchQuiz)
answer1.addEventListener('click', confirmAnswer)
answer2.addEventListener('click', confirmAnswer)
// answerBtn2.addEventListener('click', submitAnswer)
// answerBtn3.addEventListener('click', submitAnswer)
// answerBtn4.addEventListener('click', submitAnswer)
