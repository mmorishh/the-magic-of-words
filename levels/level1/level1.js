function getGameUsername() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('user');
    
    if (username) {
        localStorage.setItem('animal_master_current_user_name', username);
        return username;
    }
    
    return localStorage.getItem('animal_master_current_user_name') || 'Игрок';
}
// Конфигурация игры
const gameConfig = {
    totalRounds: 3,
    timeLimits: {
        easy: 15,
        medium: 13,
        hard: 11
    },
    points: {
        fast: 150,    // до 6 секунд
        normal: 100   // после 6 секунд
    }
};

// База данных загадок
const riddles = [
    { text: "Шубка серая для лета, для зимы — другого цвета.", answer: "зайчик", image: "hare.webp" },
    { text: "На колесах едет ловко, если тянешь за веревку.", answer: "машинка", image: "car.webp" },
    { text: "Я готов к учебным стартам, скоро сяду я за…", answer: "парта", image: "desk.webp" },
    { text: "Что выше леса поднимается да без огня горит?", answer: "солнце", image: "sun.webp" },
    { text: "Без рук, без ног, а ворота открывает.", answer: "ветер", image: "wind.webp" },
    { text: "На дворе горой а в избе водой.", answer: "снег", image: "snow.webp" },
    { text: "Раскаленная стрела дуб свалила у села.", answer: "молния", image: "lightning.webp" },
    { text: "Белый камешек растаял, На доске следы оставил.", answer: "мел", image: "chalk.webp" },
    { text: "Рано встаю, громко пою, Деткам спать не даю.", answer: "петух", image: "rooster.webp" },
    { text: "После ванны обнимает, Всех сухими оставляет.", answer: "полотенце", image: "towel.webp" },
    { text: "Кто на себе свой дом таскает?", answer: "улитка", image: "snail.webp" },
    { text: "Сама в лесу живет, а в деревне кур крадет.", answer: "лиса", image: "fox.webp" },
    { text: "Через море-океан плывет чудо-великан.", answer: "кит", image: "whale.webp" },
    { text: "Не прядет, не ткет, а людей одевает.", answer: "овца", image: "sheep.webp" },
    { text: "Летом по лесу гуляет, зимой в берлоге отдыхает.", answer: "медведь", image: "bear.webp" },
    { text: "Над землей — ботва, а под землей — бордовая борода.", answer: "свекла", image: "beet.webp" },
    { text: "Этот фрукт на вкус хорош и на лампочку похож.", answer: "груша", image: "pear.webp" },
    { text: "Стоял на крепкой ножке, теперь лежит в лукошке.", answer: "гриб", image: "mushroom.webp" },
    { text: "Зимой во всю сияет, а весной слезы роняет.", answer: "сосулька", image: "icicle.webp" }
];

// Переменные игры
let gameState = {
    currentRound: 1,
    score: 0,
    level: 1,
    difficulty: 'easy',
    timeLeft: 15,
    timer: null,
    startTime: null,
    currentRiddle: null,
    usedRiddles: [],
    correctAnswer: ''
};

// Инициализация игры
function initGame() {
    // Получаем настройки из localStorage
    const level = localStorage.getItem('animal_master_game_level') || '1';
    const difficulty = localStorage.getItem('animal_master_game_difficulty');
    
    gameState.level = parseInt(level);
    gameState.difficulty = difficulty;
    gameState.timeLeft = gameConfig.timeLimits[difficulty];
    
    showRules();
    
   // updateUI();
}

function showRules() {
    document.getElementById('rulesModal').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}

function startGame() {
    document.getElementById('rulesModal').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    
    startRound();
}

function startRound() {
    selectRandomRiddle();
    
    // Сбрасываем таймер
    gameState.timeLeft = gameConfig.timeLimits[gameState.difficulty];
    gameState.startTime = Date.now();
    
    updateUI();
    
    createAnswerImages();
    
    startTimer();
}


function selectRandomRiddle() {
    // Фильтруем неиспользованные загадки
    const availableRiddles = riddles.filter(riddle => 
        !gameState.usedRiddles.includes(riddle.answer)
    );
    

    const randomIndex = Math.floor(Math.random() * availableRiddles.length);
    gameState.currentRiddle = availableRiddles[randomIndex];
    gameState.usedRiddles.push(gameState.currentRiddle.answer);
    gameState.correctAnswer = gameState.currentRiddle.answer;
    
    // Обновляем текст загадки
    document.getElementById('riddleText').textContent = gameState.currentRiddle.text;
}

function createAnswerImages() {
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    
    // Количество картинок в зависимости от сложности
    let imageCount;
    switch(gameState.difficulty) {
        case 'easy': imageCount = 4; break; // Легкий уровень - 4 картинки
        case 'medium': imageCount = 6; break; // Средний - 6 картинок
        case 'hard': imageCount = 6; break; // Сложный - 6 картинок
        default: imageCount = 4;
    }
    
    // Собираем все возможные ответы
    const allAnswers = [...riddles.map(r => r.answer)];
    
    // Убираем правильный ответ из списка
    const wrongAnswers = allAnswers.filter(answer => answer !== gameState.correctAnswer);
    
    // Выбираем случайные неправильные ответы
    const selectedWrongAnswers = [];
    while (selectedWrongAnswers.length < imageCount - 1 && wrongAnswers.length > 0) {
        const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
        selectedWrongAnswers.push(wrongAnswers[randomIndex]);
        wrongAnswers.splice(randomIndex, 1);
    }
    
    // Добавляем правильный ответ
    const allAnswersForRound = [...selectedWrongAnswers, gameState.correctAnswer];
    
    // Перемешиваем ответы
    shuffleArray(allAnswersForRound);
    
    // Создаем картинки
    allAnswersForRound.forEach(answer => {
        const isCorrect = answer === gameState.correctAnswer;
        const riddle = riddles.find(r => r.answer === answer);
        const imageUrl = `answers/${riddle ? riddle.image : 'default.jpg'}`;
        
        const img = document.createElement('img');
        img.className = 'answer-image';
        img.src = imageUrl;
        img.alt = answer;
        img.dataset.answer = answer;
        img.dataset.correct = isCorrect;
        
        // Добавляем эффекты 
        if (gameState.difficulty === 'medium' || gameState.difficulty === 'hard') {
            img.classList.add('tilted');
            const tiltAngle = (Math.random() * 20 - 10);
            img.style.setProperty('--tilt-angle', `${tiltAngle}deg`);
        }
        
        if (gameState.difficulty === 'hard') {
            img.classList.add('moving');
            const moveX = (Math.random() * 20 - 10); // -10px до +10px
            const moveY = (Math.random() * 20 - 10);
            const speed = 1 + Math.random(); // 1-2 секунды
            img.style.setProperty('--move-x', `${moveX}px`);
            img.style.setProperty('--move-y', `${moveY}px`);
            img.style.setProperty('--move-speed', `${speed}s`);
        }
        
        img.addEventListener('click', () => checkAnswer(img));
        
        container.appendChild(img);
    });
    
    if (gameState.difficulty === 'easy') {
        // Легкий уровень - 2 колонки
        container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
        // Средний и сложный уровень - 3 колонки
        container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
}

// Перемешать массив
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer() {
    clearInterval(gameState.timer);
    
    // Обновляем таймер каждую секунду
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        updateTimer();
        
        if (gameState.timeLeft <= 0) {
            endRound(false);
        }
    }, 1000);
}

// Обновить таймер
function updateTimer() {
    const timerText = document.getElementById('timerText');
    const timerProgress = document.getElementById('timerProgress');
    const timeLimit = gameConfig.timeLimits[gameState.difficulty];
    
    timerText.textContent = gameState.timeLeft;
    
    const progressPercent = (gameState.timeLeft / timeLimit) * 100;
    timerProgress.style.width = `${progressPercent}%`;
    

    if (gameState.timeLeft <= 5) {
        timerProgress.style.background = '#f44336';
    } else if (gameState.timeLeft <= 10) {
        timerProgress.style.background = '#f1de2aff';
    } else {
        timerProgress.style.background = '#4CAF50';
    }
}

function checkAnswer(imageElement) {
    const isCorrect = imageElement.dataset.correct === 'true';
    const allImages = document.querySelectorAll('.answer-image');
    
    // Блокируем все картинки
    allImages.forEach(img => {
        img.style.pointerEvents = 'none';
        if (img.dataset.correct === 'true') {
            img.classList.add('correct');
            img.classList.add('correct-answer');
        } else if (img === imageElement && !isCorrect) {
            img.classList.add('wrong');
        }
    });
    
    // Останавливаем таймер
    clearInterval(gameState.timer);
    
    // Вычисляем время ответа
    const answerTime = (Date.now() - gameState.startTime) / 1000;
    
    // Начисляем очки
    if (isCorrect) {
        let points = 0;
        if (answerTime <= 6) {
            points = gameConfig.points.fast;
            document.getElementById('gameStatus').textContent = `Быстрый ответ! +${points} очков`;
            document.getElementById('gameStatus').style.color = '#4CAF50';
        } else {
            points = gameConfig.points.normal;
            document.getElementById('gameStatus').textContent = `Правильно! +${points} очков`;
            document.getElementById('gameStatus').style.color = '#4CAF50';
        }
        
        gameState.score += points;
        
        // Переходим к следующему раунду через 1.5 секунды
        setTimeout(() => {
            if (gameState.currentRound < gameConfig.totalRounds) {
                gameState.currentRound++;
                startRound();
            } else {
                endGameWin();
            }
        }, 1500);
    } else {
        document.getElementById('gameStatus').textContent = 'Неправильно!';
        document.getElementById('gameStatus').style.color = '#f44336';
        
        // Задержка перед поражением
        setTimeout(() => {
            showLoseModal();
        }, 1500);
    }
    
    updateUI();
}

// Завершить раунд
function endRound(success) {
    clearInterval(gameState.timer);
    
    if (success) {
        // Уже обработано в checkAnswer
    } else {
        // Поражение - время вышло
        showLoseModal();
    }
}


function endGameWin() {
   // saveUserProgress();
    
    document.getElementById('winScoreText').textContent = `Ваши очки: ${gameState.score}`;
    document.getElementById('winModal').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}


function showLoseModal() {
    document.getElementById('loseModal').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}


function updateUI() {
    document.getElementById('round').textContent = gameState.currentRound;
    document.getElementById('score').textContent = gameState.score;
    updateTimer();
}

function retryGame() {
    document.getElementById('loseModal').style.display = 'none';
    
    // Сброс игры
    gameState = {
        currentRound: 1,
        score: 0,
        level: gameState.level,
        difficulty: gameState.difficulty,
        timeLeft: gameConfig.timeLimits[gameState.difficulty],
        timer: null,
        startTime: null,
        currentRiddle: null,
        usedRiddles: [],
        correctAnswer: ''
    };
    
    document.getElementById('gameContainer').style.display = 'block';

    startRound();
}

function goToMenu() {
    saveUserProgress();
    window.location.href = '../../index.html';
}

function endGame() {
    if (confirm('Вы уверены, что хотите выйти? Прогресс не сохранится.')) {
        window.location.href = '../../index.html';
    }
}

// Сохранить прогресс пользователя (разблокировать следующий уровень)
function saveUserProgress() {
    const username = getGameUsername();
    if (!username) return;
    
    // Используем тот же ключ, что и в script.js
    const STORAGE_KEY = 'animal_master_';
    const usersJson = localStorage.getItem(STORAGE_KEY + 'users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const userIndex = users.findIndex(u => u.name === username);
    
    if (userIndex > -1) {
        // Добавляем очки
        users[userIndex].score = (users[userIndex].score || 0) + gameState.score;
        
        // Разблокируем следующий уровень, если текущий пройден успешно
        const currentLevel = gameState.level;
        const nextLevel = currentLevel + 1;
        
        // Если пользователь еще не разблокировал следующий уровень
        if (nextLevel <= 3 && users[userIndex].level < nextLevel) {
            users[userIndex].level = nextLevel;
        }
        
        localStorage.setItem(STORAGE_KEY + 'users', JSON.stringify(users));
    }
}

function getAllUsers() {
    const STORAGE_KEY = 'animal_master_';
    const usersJson = localStorage.getItem(STORAGE_KEY + 'users');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Вспомогательные функции
function getCurrentUsername() {
    // Имя текущего пользователя передается через URL или localStorage
    const params = new URLSearchParams(window.location.search);
    return params.get('user') || localStorage.getItem('animal_master_current_user_name');
}


// Запуск игры при загрузке страницы
window.onload = initGame;