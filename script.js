
let questionNumber = 0;
let score = 0;

function startQuiz() {
    // this funciton will handle the start button being clicked.
    // console.log('quizStarted!');
    $('.js-body').on('click', '.start-button', function (event) {
        $('.quizStart').remove();
        $('.questionAnswerForm').css('display', 'block');
        createQuestion();
    });
}


function createQuestion() {
    // This function will bring in the question text and fill the page with the answers
    const currentQuestion = questionSTORE[questionNumber];
    $('#questionCell').text(currentQuestion.question);
    const firstAnswer = currentQuestion.answers[0];
    const secondAnswer = currentQuestion.answers[1];
    const thirdAnswer = currentQuestion.answers[2];
    const fourthAnswer = currentQuestion.answers[3];
    $('#ans1').val(currentQuestion.answers[0]);
    $('#ans2').val(currentQuestion.answers[1]);
    $('#ans3').val(currentQuestion.answers[2]);
    $('#ans4').val(currentQuestion.answers[3]);
    $('.answer1').text(firstAnswer);
    $('.answer2').text(secondAnswer);
    $('.answer3').text(thirdAnswer);
    $('.answer4').text(fourthAnswer);
    // console.log('Questions and answers pulled!');
}

function submitAnswer() {
    // this function will compane the user selection with the correct answer and respond with Positive or negative feedback.
    // console.log('answerSubmitted!');
    // event.preventDefault();
    const userAnswer = $('input:checked');
    const answer = userAnswer.val();
    const correctAnswer = `${questionSTORE[questionNumber].rightAnswer}`;
    if (answer === correctAnswer) {
        positiveFeedback();
        // console.log('correct Answer submitted!');
    } else {
        negativeFeedback();
        // console.log('incorrect Answer submitted!');
    }
}

function positiveFeedback() {
    // this function will add 1 to the score and populate the positive feedback page.
    score+= 10;
    $('.questionAnswerForm').hide();
    $('.positiveFeedback').show();
    // console.log('Positive feedback Provided!');
}

function negativeFeedback() {
    // this function will populate the negative feedback page and provice the correct answer.
    correctAnswer = `${questionSTORE[questionNumber].rightAnswer}`;
    $('.nFeedbackMessage').find('p').html(correctAnswer);
    $('.questionAnswerForm').hide();
    $('.negativeFeedback').show();
    $('.nFeedbackMessage').text(correctAnswer);
    // console.log('Negative feedback Provided!');
}

function nextQuestion() {
    //this function returns the main page and updates the question level
    $('input[name="answer"]').attr('checked', false);
    $('.negativeFeedback').hide();
    $('.positiveFeedback').hide();
    $('.questionAnswerForm').show();
    questionNumber++;
    updateQuestionScore();
    if (questionNumber >= 10) {
        completeQuiz()
    } createQuestion();
}

function updateQuestionScore() {
    // this function will update the score while keeping the question number above 0
    $('.score-board').text(`Question ${questionNumber + 1} - Score: ${score}`);
    // console.log('level and score updated!');
}


function completeQuiz() {
    // this function will provide final score to quiz and a pass or fail status.
    if (questionNumber === 10) {
        $('.questionAnswerForm').hide();
        $('.positiveFeedback').hide();
        $('.negativeFeedback').hide();
        $('.passingMessage').text(score);
        $('.failingMessage').text(score);
        if (score >= 60) {
            $('.passFeedback').show();
        } else {
            $('.failFeedback').show();
        };

        // console.log('quizCompleted!');
    };
}

$(startQuiz);