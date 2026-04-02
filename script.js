// HTML 요소 가져오기
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');

let score = 0;
let timeLeft = 10;
let gameActive = false;
let timerId;

// 공을 랜덤 위치로 이동시키는 기능
function moveBall() {
    const maxX = gameArea.clientWidth - ball.clientWidth;
    const maxY = gameArea.clientHeight - ball.clientHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ball.style.left = randomX + 'px';
    ball.style.top = randomY + 'px';
}

// 게임 시작 기능
function startGame() {
    score = 0;
    timeLeft = 10;
    gameActive = true;
    
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startBtn.disabled = true;
    ball.style.display = 'block';
    
    moveBall();

    // 1초마다 타이머 감소
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// 게임 종료 기능
function endGame() {
    clearInterval(timerId);
    gameActive = false;
    ball.style.display = 'none';
    startBtn.disabled = false;
    alert(`게임 끝! 당신의 점수는 ${score}점입니다!`);
}

// 공을 클릭했을 때 이벤트
ball.addEventListener('click', () => {
    if (gameActive) {
        score++;
        scoreDisplay.textContent = score;
        moveBall(); // 클릭하면 다른 곳으로 이동
    }
});

// 시작 버튼 클릭 이벤트
startBtn.addEventListener('click', startGame);