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

function generateEquation(equations, answers) {
    type = equations;
    ans_type = answers;
    randomIndex = Math.floor(Math.random() * equations.length);
    eqn = equations[randomIndex];
    ans = answers[randomIndex];
    $('#equation').html(eqn.replace('?', '<input type="number" id="userInput">'));
    $('#res').html(eqn.replace('?', '<span id="result"></span>'));
    $('#userInput').focus();
    $('#userInput').on('keyup', function() {
        let val = $(this).val();
        $('#result').html(val);
        $('#submit').toggleClass('hidden', val === '');
        if (!start) {
            start = true;
            startTime();
        }
    });
    renderScore();
    renderSteps();
}

function checkAns(data) {
    if (data == ans) {
        score += scoreChange;
    } else {
        score -= scoreChange;
    }
    steps++;
    removeEquation();
    if (steps < 15) {
        generateEquation(easyEquations, easyAnswers);
    } else if(steps < 25) {
        generateEquation(mediumEquations, mediumAnswers);
    }
    else if (steps < 35) {
        generateEquation(hardEquations, hardAnswers);
    }
}

function renderScore() {
    $('#score').html(score);
}

function renderSteps() {
    $('#steps').html(steps);
}

function startTime() {
    if (start) {
        setInterval(() => {
            $('#time').html(time);
            time++;
        }, 1000);
    }
}

function removeEquation() {
        type.splice(randomIndex, 1);
        ans_type.splice(randomIndex, 1);
}



$('#submit').on('click', function() {
    $('#submit').addClass('hidden');
    let data = $('#res').text();
    checkAns(data);

    console.log(type);
});

generateEquation(easyEquations, easyAnswers);
