let score = 0;
let steps = 0;
let time = 0;
let scoreChange = 1;
let eqn = "";
let ans = "";
let randomIndex = 0;
let type = "";
let ans_type;
let start = false;
let data = "";

function generateEquation(equations, answers) {

    type = equations;
    ans_type = answers;
    randomIndex = Math.floor(Math.random() * equations.length);
    eqn = equations[randomIndex];
    ans = answers[randomIndex];
    $('#equation').html(eqn.replace('?', '<input type="number" id="userInput">'));
    $('#res').html(eqn.replace('?', '<span id="result"></span>'));
    $('#userInput').focus();
    $('#userInput').on('keyup', function () {
        let val = $(this).val();
        $('#result').html(val);
        $('#submit').toggleClass('hidden', val === '');
        if (!start) {
            start = true;
            updateTime();
        }
    });
   
}

function checkAns(data) {
    if (data == ans) {
        score += scoreChange;
    } else {
        score -= scoreChange;
    }
    steps++;
    removeEquation();
    renderScore();
    renderSteps();
    if (steps < 15) {
        generateEquation(easyEquations, easyAnswers);
    } else if (steps < 25) {
        generateEquation(mediumEquations, mediumAnswers);
    }
    else if (steps < 40) {
        generateEquation(hardEquations, hardAnswers);
    }
    else if (steps < 50) {
        generateEquation(moreHardEquations, moreHardAnswers);
    }
    else if (steps < 60) {
        generateEquation(extremeEquations, extremeAnswers);
    }
    else if (steps < 70) {
        generateEquation(moreExtremeEquations, moreExtremeAnswers);
    }
    else {
        showResults();
    }
}

function renderScore() {
    $('#score').html(score);
}

function showResults() {
    $('#equation').remove()
    $('#res').remove()
    $('.results').addClass('show');
    $('#score_result').html(score)
    $('#steps_result').html(steps)
    $('#time_result').html(time)
    start = false;
    updateTime();
}

function renderSteps() {
    $('#steps').html(steps);
}

function updateTime() {
    let timeInterval = setInterval(() => {
        if (start) {
            $('#time').html(time);
            time++;
        }
        else {
            clearInterval(timeInterval);
        }
    }, 1000);
}

function removeEquation() {
    type.splice(randomIndex, 1);
    ans_type.splice(randomIndex, 1);
}



$('#submit').on('click', function () {
    $('#submit').addClass('hidden');
    data = $('#res').text();
    checkAns(data);
});

generateEquation(easyEquations, easyAnswers);
