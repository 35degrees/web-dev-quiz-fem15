const toggle = document.querySelector('.check-input')
const body = document.querySelector('body')
const htmlButton = document.querySelector('.category-1')
const cssButton = document.querySelector('.category-2')
const jsButton = document.querySelector('.category-3')
const a11yButton = document.querySelector('.category-4')
const lang = document.querySelector('.lang')

// QUIZ VARIABLES
const quizContainer = document.querySelector('.quiz-container')
const quizBox = document.querySelector('.quiz-box')
const quizTitle = document.querySelector('.quiz-title')
const quizQuestion = document.querySelector('.quiz-question-text')
const answerBox = document.querySelector('.quiz-answers')
const quizScore = document.querySelector('.quiz-score')
const answer = document.querySelectorAll('.answer')
const outputBox = document.querySelector('.output-box')
const correct = document.querySelector('.correct')
const wrong = document.querySelector('.wrong')
const again = document.querySelector('.again')

let score = 0
let currentQuestionIndex = 0

// TOGGLE DARK MODE SWITCH

toggle.addEventListener('change', () => {
	if (toggle.checked === true) {
		body.classList.add('dark-mode')
		// console.log('added dark')
	} else {
		body.classList.remove('dark-mode')
		// console.log('removed dark')
	}
})

// FETCH QUIZ DATA

function startQuiz(e) {
	let language = e.target.innerText
	language = language.trim()
	quizTitle.innerText = `Your ${language} Quiz`
	console.log(language, typeof language)
	fetch('./data.json')
		.then((res) => res.json())
		.then((data) => {
			if (language === 'HTML') {
				showQuestions(data.quizzes[0])
			} else if (language === 'CSS') {
				showQuestions(data.quizzes[1])
			} else if (language === 'Javascript') {
				showQuestions(data.quizzes[2])
			} else {
				showQuestions(data.quizzes[3])
			}
		})
	setTimeout(() => {}, 5500)
}

function showQuestions(quiz) {
	quizBox.style.display = 'grid'
	quizContainer.classList.add('hide')
	const quizObj = {
		question: quiz.questions[currentQuestionIndex].question,
		answer: quiz.questions[currentQuestionIndex].answer,
		options: [
			{ option: quiz.questions[currentQuestionIndex].options[0] },
			{ option: quiz.questions[currentQuestionIndex].options[1] },
			{ option: quiz.questions[currentQuestionIndex].options[2] },
			{ option: quiz.questions[currentQuestionIndex].options[3] },
		],
	}

	let answer = quizObj.answer
	const answerList = quizObj.options
	answerList.forEach((option) => {
		if (option.option === answer) {
			option.correct = true
		} else {
			option.correct = false
		}
	})
	quizQuestion.innerText = quizObj.question

	answerList.forEach((option) => {
		const answerBtn = document.createElement('p')
		answerBtn.innerText = option.option
		answerBtn.classList.add('answer')
		answerBox.appendChild(answerBtn)
		if (option.correct) {
			answerBtn.dataset.correct = option.correct
		}
		answerBtn.addEventListener('click', reviewAnswer)
	})
}

function reviewAnswer(e) {
	console.log('curr q index in review answer is ' + currentQuestionIndex)
	console.log(e.target.dataset)
	const selected = e.target
	const isCorrect = selected.dataset.correct === 'true'

	while (answerBox.firstChild) {
		answerBox.removeChild(answerBox.firstChild)
	}
	quizQuestion.innerText = ''

	if (isCorrect) {
		score++
		outputBox.style.display = 'flex'
		correct.style.display = 'block'
		correct.innerText = 'You are correct!'
		setTimeout(() => {
			outputBox.style.display = 'none'
			correct.style.display = 'none'
			if (currentQuestionIndex < 10) {
				nextQuestion()
			}
		}, 1650)
	} else {
		outputBox.style.display = 'flex'
		wrong.style.display = 'block'
		setTimeout(() => {
			outputBox.style.display = 'none'
			wrong.style.display = 'none'
			if (currentQuestionIndex < 10) {
				nextQuestion()
			}
		}, 1650)
	}

	if (currentQuestionIndex < 8) {
		quizScore.innerHTML = `<h3>
		You have answered ${score}/${currentQuestionIndex + 1} correctly. 
		Only ${10 - currentQuestionIndex - 1} ${
			10 - currentQuestionIndex - 1 === 1 ? 'question' : 'questions'
		} more to go.
		</h3>
		`
	} else {
		quizScore.innerHTML = `<h3>
	You have answered ${score}/${currentQuestionIndex + 1} correctly. 
	Final question.
	</h3>
	`
	}
}

function nextQuestion() {
	let lang = quizTitle.innerText.split(' ')[1]
	currentQuestionIndex++
	console.log('score in nq is ' + score)
	if (currentQuestionIndex < 10) {
		fetch('./data.json')
			.then((res) => res.json())
			.then((data) => {
				if (lang === 'HTML') {
					showQuestions(data.quizzes[0])
				} else if (lang === 'CSS') {
					showQuestions(data.quizzes[1])
				} else if (lang === 'Javascript') {
					showQuestions(data.quizzes[2])
				} else {
					showQuestions(data.quizzes[3])
				}
			})
	} else if (score > 8) {
		outputBox.style.display = 'flex'
		correct.style.display = 'block'
		again.style.display = 'flex'
		correct.innerText = `
		You passed with a score of ${score}!
		`
		quizScore.innerHTML = ''
	} else if (score <= 8) {
		outputBox.style.display = 'flex'
		correct.style.display = 'block'
		again.style.display = 'flex'
		correct.innerText = `
		You only answered ${score} correctly. Please try again.
		`
		quizScore.innerHTML = ''
	}
}

function resetQuiz() {
	currentQuestionIndex = 0
	score = 0
	outputBox.style.display = 'none'
	correct.style.display = 'none'
	again.style.display = 'none'
	quizBox.style.display = 'none'
	quizContainer.classList.remove('hide')
	correct.innerText = ''
}

again.addEventListener('click', resetQuiz)
htmlButton.addEventListener('click', startQuiz)
cssButton.addEventListener('click', startQuiz)
jsButton.addEventListener('click', startQuiz)
a11yButton.addEventListener('click', startQuiz)
