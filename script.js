const board = document.getElementById('game-board');
const koala = document.getElementById('koala');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const title = document.getElementById('title');

// 게임 변수
let charX, charY, velocityY, score, gameActive;
let platforms = [];
let keys = {};
let platformSpeed = 2; // 기본 상승 속도
const gravity = 0.4;

// 1. 게임 초기화 및 시작
function gameInit() {
    score = 0;
    charX = 185;
    charY = 50;
    velocityY = 0;
    platformSpeed = 2; // 초기 속도 (프레임당 2px 상승)
    gameActive = true;
    platforms = [];

    scoreDisplay.textContent = score;
    overlay.style.display = 'none';
    
    // 기존 부엉이 제거
    document.querySelectorAll('.owl').forEach(o => o.remove());

    // 첫 발판 생성
    createOwl(300);
    
    update();
}

// 2. 부엉이 발판 생성
function createOwl(yPos) {
    const owl = document.createElement('div');
    owl.className = 'owl';
    owl.innerHTML = '🦉🦉🦉'; // 부엉이 이모지 발판
    const xPos = Math.random() * (400 - 80);
    
    owl.style.left = xPos + 'px';
    owl.style.top = yPos + 'px';
    
    board.appendChild(owl);
    platforms.push({ el: owl, x: xPos, y: yPos });
}

// 3. 메인 루프
function update() {
    if (!gameActive) return;

    // 중력 및 이동
    velocityY += gravity;
    charY += velocityY;

    if (keys['ArrowLeft'] && charX > 0) charX -= 5;
    if (keys['ArrowRight'] && charX < 370) charX += 5;

    // 난이도 조절: 30점이 넘으면 속도 증가
    if (score >= 30) {
        platformSpeed = 3.5; // 속도가 약 0.5초 빨라지는 효과를 위해 상승폭 증가
    }

    // 발판 처리
    platforms.forEach((p, index) => {
        p.y -= platformSpeed; // 발판이 위로 올라감
        p.el.style.top = p.y + 'px';

        // 착지 판정 (코알라 발바닥이 부엉이 머리에 닿을 때)
        if (velocityY > 0 && 
            charX + 30 > p.x && 
            charX < p.x + 80 && 
            charY + 30 >= p.y && 
            charY + 30 <= p.y + 15) {
            
            charY = p.y - 30;
            velocityY = 0;
        }

        // 화면 밖으로 나간 발판 제거 및 새 발판 생성
        if (p.y < -30) {
            p.el.remove();
            platforms.splice(index, 1);
            score += 5; // 발판을 하나 보낼 때마다 점수 추가
            scoreDisplay.textContent = score;
        }
    });

    // 발판 개수 유지
    if (platforms.length < 5) {
        const lastY = platforms[platforms.length - 1].y;
        if (lastY < 450) createOwl(600);
    }

    // 화면 업데이트
    koala.style.left = charX + 'px';
    koala.style.top = charY + 'px';

    // 게임 오버 조건 (화면 아래로 추락)
    if (charY > 600) {
        gameOver();
    } else {
        requestAnimationFrame(update);
    }
}

function gameOver() {
    gameActive = false;
    title.textContent = "Game Over!";
    overlay.style.display = 'flex';
}

// 이벤트 리스너
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);
startBtn.addEventListener('click', gameInit);