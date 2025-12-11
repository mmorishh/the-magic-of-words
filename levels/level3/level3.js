// Конфигурация игры для уровня 3
const gameConfig3 = {
    totalRounds: 3,
    timeLimits: {
        easy: 30,
        medium: 25,
        hard: 20
    },
    points: {
        perfect: 30,       // Идеальное попадание (до линии)
        good: 20,          // Хорошее попадание (на линии)
        wrongKey: -10,      // Неправильная клавиша
        miss: -20           // Пропуск слова
    },
    requiredHits: {
        easy: 3,   
        medium: 4, 
        hard: 6    
    },
    speeds: {
        easy: 2.5,  
        medium: 2.0,   
        hard: 1.5     
    },
    laneCounts: {
        easy: 2,  
        medium: 4,  
        hard: 6  
    }
};

// Правильные слова (животные)
const animalWords = [
    "лев", "тигр", "слон", "волк", "медведь", "жираф", "зебра", "носорог",
    "пантера", "ягуар", "рысь", "пума", "гепард", "антилопа", "буйвол",
    "верблюд", "кенгуру", "коала", "енот", "панда", "лемур", "горилла",
    "дельфин", "кит", "акула", "орёл", "сова", "попугай", "пингвин", "фламинго",
    "змея", "ящерица", "черепаха", "лягушка", "бабочка", "пчела", "паук"
];

// Неправильные слова (не животные)
const wrongWords = [
    "стол", "стул", "книга", "ручка", "чашка", "ложка", "дом", "окно",
    "машина", "автобус", "цветок", "дерево", "город", "улица", "парк",
    "школа", "учитель", "компьютер", "телефон", "солнце", "луна", "дождь"
];

// Соответствие клавиш дорожкам для разных уровней сложности
const keyMappings = {
    easy: ['A', 'S'],        
    medium: ['A', 'S', 'D', 'F'],
    hard: ['A', 'S', 'D', 'F', 'J', 'K']
};

// Клавиши для отображения
const keyDisplay = {
    0: 'A', 1: 'S', 2: 'D', 3: 'F', 4: 'J', 5: 'K'
};

// Переменные игры
let gameState = {
    currentRound: 1,
    score: 0,
    level: 3,
    difficulty: 'easy',
    timeLeft: 30,
    timer: null,
    startTime: null,
    activeWords: [],
    hits: 0,
    requiredHits: 5,
    totalWords: 0,
    correctWords: 0,
    wrongWords: 0,
    roundEnded: false,
    lanes: [],
    wordInterval: null,
    isGameRunning: false,
    animationFrames: {} // Для хранения requestAnimationFrame
};

// Инициализация игры
function initGame() {
    const level = localStorage.getItem('animal_master_game_level') || '3';
    const difficulty = localStorage.getItem('animal_master_game_difficulty');
    
    gameState.level = parseInt(level);
    gameState.difficulty = difficulty;
    gameState.timeLeft = gameConfig3.timeLimits[difficulty];
    gameState.requiredHits = gameConfig3.requiredHits[difficulty];
    
    showRules();
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
    // Сброс состояния раунда
    gameState.activeWords = [];
    gameState.hits = 0;
    gameState.totalWords = 0;
    gameState.correctWords = 0;
    gameState.wrongWords = 0;
    gameState.roundEnded = false;
    gameState.isGameRunning = true;
    gameState.animationFrames = {};
    
    // Останавливаем все анимации
    Object.values(gameState.animationFrames).forEach(frameId => {
        cancelAnimationFrame(frameId);
    });
    
    // Создаем дорожки
    createLanes();
    
    // Сбрасываем таймер
    gameState.timeLeft = gameConfig3.timeLimits[gameState.difficulty];
    gameState.startTime = Date.now();
    
    updateUI();
    
    // Начинаем выпускать слова
    startWordGenerator();
    
    // Запускаем таймер
    startTimer();
    
    // Добавляем обработчики клавиш
    setupKeyboardControls();
}

function createLanes() {
    const container = document.getElementById('wordTracks');
    container.innerHTML = '';
    gameState.lanes = [];
    
    const laneCount = gameConfig3.laneCounts[gameState.difficulty];
    const currentKeys = keyMappings[gameState.difficulty];
    
    for (let i = 0; i < laneCount; i++) {
        const lane = document.createElement('div');
        lane.className = 'word-track';
        lane.dataset.lane = i;
        lane.dataset.key = currentKeys[i];
        
        // Добавляем индикатор клавиши
        const keyIndicator = document.createElement('div');
        keyIndicator.className = 'key-indicator';
        keyIndicator.textContent = currentKeys[i];
        lane.appendChild(keyIndicator);
        
        container.appendChild(lane);
        gameState.lanes.push({
            element: lane,
            activeWord: null,
            key: currentKeys[i],
            animationId: null
        });
    }
    
    // Обновляем виртуальную клавиатуру
    updateVirtualKeyboard();
}

function updateVirtualKeyboard() {
    const currentKeys = keyMappings[gameState.difficulty];
    const keys = document.querySelectorAll('.key');
    
    // Сначала скрываем все клавиши
    keys.forEach(key => {
        key.style.display = 'none';
    });
    
    // Показываем только нужные клавиши
    currentKeys.forEach((keyValue, index) => {
        const keyElement = document.querySelector(`.key[data-key="${keyValue}"]`);
        if (keyElement) {
            keyElement.style.display = 'flex';
            keyElement.dataset.key = keyValue;
            keyElement.textContent = keyValue;
        }
    });
}

function startWordGenerator() {
    clearInterval(gameState.wordInterval);
    
    const speed = gameConfig3.speeds[gameState.difficulty] * 1000;
    
    gameState.wordInterval = setInterval(() => {
        if (!gameState.isGameRunning || gameState.roundEnded) return;
        
        generateNewWord();
    }, speed);
}

function generateNewWord() {
    const laneCount = gameConfig3.laneCounts[gameState.difficulty];
    
    // Находим свободную дорожку
    const freeLanes = gameState.lanes.filter(lane => !lane.activeWord);
    if (freeLanes.length === 0) return;
    
    // Выбираем случайную свободную дорожку
    const randomLaneIndex = Math.floor(Math.random() * freeLanes.length);
    const lane = freeLanes[randomLaneIndex];
    const laneIndex = gameState.lanes.indexOf(lane);
    
    // Решаем, будет ли это правильное или неправильное слово
    const isAnimal = Math.random() > 0.3; // 70% животных, 30% неправильных
    
    let word;
    let isCorrect;
    
    if (isAnimal) {
        const randomIndex = Math.floor(Math.random() * animalWords.length);
        word = animalWords[randomIndex];
        isCorrect = true;
    } else {
        const randomIndex = Math.floor(Math.random() * wrongWords.length);
        word = wrongWords[randomIndex];
        isCorrect = false;
    }
    
    // Создаем элемент слова
    const wordElement = document.createElement('div');
    wordElement.className = 'falling-word';
    wordElement.textContent = word;
    wordElement.dataset.word = word;
    wordElement.dataset.correct = isCorrect;
    wordElement.dataset.lane = laneIndex;
    
    // Устанавливаем начальную позицию
    wordElement.style.left = '50%';
    wordElement.style.transform = 'translateX(-50%)';
    wordElement.style.top = '0px';
    
    lane.element.appendChild(wordElement);
    
    // Сохраняем активное слово
    lane.activeWord = {
        element: wordElement,
        word: word,
        isCorrect: isCorrect,
        position: 0,
        speed: gameConfig3.speeds[gameState.difficulty] * 50, // пикселей в секунду
        startTime: Date.now(),
        animationId: null
    };
    
    gameState.totalWords++;
    
    // Запускаем анимацию падения
    startWordAnimation(lane);
}

function startWordAnimation(lane) {
    if (!lane.activeWord) return;
    
    const word = lane.activeWord;
    const element = word.element;
    const laneHeight = lane.element.clientHeight;
    const hitLine = document.getElementById('hitLine');
    const hitLinePosition = hitLine.offsetTop - lane.element.offsetTop;
    
    let lastTime = Date.now();
    
    function animate() {
        if (!word || !element || gameState.roundEnded) {
            if (lane.animationId) {
                cancelAnimationFrame(lane.animationId);
                lane.animationId = null;
            }
            return;
        }
        
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000; // в секундах
        lastTime = currentTime;
        
        // Обновляем позицию
        word.position += word.speed * deltaTime;
        element.style.top = `${word.position}px`;
        
        // Проверяем, достигло ли слово линии
        if (word.position >= hitLinePosition - 30 && word.position <= hitLinePosition + 30) {
            element.classList.add('at-hit-line');
        } else {
            element.classList.remove('at-hit-line');
        }
        
        // Проверяем, ушло ли слово за экран
        if (word.position > laneHeight + 100) {
            // Слово пропущено
            if (word.isCorrect && !gameState.roundEnded) {
                gameState.score += gameConfig3.points.miss;
                showMessage(`Пропущено: "${word.word}" -20 очков`, 'error');
            }
            removeWordFromLane(lane);
            return;
        }
        
        // Продолжаем анимацию
        if (gameState.isGameRunning && !gameState.roundEnded) {
            lane.animationId = requestAnimationFrame(animate);
        } else {
            if (lane.animationId) {
                cancelAnimationFrame(lane.animationId);
                lane.animationId = null;
            }
        }
    }
    
    lane.animationId = requestAnimationFrame(animate);
}

function removeWordFromLane(lane, hit = false) {
    if (!lane.activeWord) return;
    
    if (lane.animationId) {
        cancelAnimationFrame(lane.animationId);
        lane.animationId = null;
    }
    
    if (lane.activeWord.element) {
        lane.activeWord.element.remove();
    }
    
    lane.activeWord = null;
}

function setupKeyboardControls() {
    // Удаляем старые обработчики
    document.removeEventListener('keydown', handleKeyDown);
    
    // Добавляем новые обработчики
    document.addEventListener('keydown', handleKeyDown);
    
    // Обработчики для виртуальной клавиатуры
    document.querySelectorAll('.key').forEach(key => {
        key.removeEventListener('click', handleVirtualKeyClick);
        key.addEventListener('click', handleVirtualKeyClick);
    });
}

function handleKeyDown(event) {
    if (gameState.roundEnded || !gameState.isGameRunning) return;
    
    const key = event.key.toUpperCase();
    const currentKeys = keyMappings[gameState.difficulty];
    
    // Проверяем, что нажатая клавиша есть в текущем наборе
    const laneIndex = currentKeys.indexOf(key);
    
    if (laneIndex !== -1) {
        processKeyPress(laneIndex, key);
        
        // Подсветка клавиши
        const virtualKey = document.querySelector(`.key[data-key="${key}"]`);
        if (virtualKey) {
            virtualKey.classList.add('key-pressed');
            setTimeout(() => {
                virtualKey.classList.remove('key-pressed');
            }, 200);
        }
        
        event.preventDefault(); // Предотвращаем стандартное поведение
    }
}

function handleVirtualKeyClick(event) {
    if (gameState.roundEnded || !gameState.isGameRunning) return;
    
    const key = event.currentTarget.dataset.key;
    const currentKeys = keyMappings[gameState.difficulty];
    const laneIndex = currentKeys.indexOf(key);
    
    if (laneIndex !== -1) {
        processKeyPress(laneIndex, key);
        
        // Подсветка клавиши
        event.currentTarget.classList.add('key-pressed');
        setTimeout(() => {
            event.currentTarget.classList.remove('key-pressed');
        }, 200);
    }
}

function processKeyPress(laneIndex, key) {
    const lane = gameState.lanes[laneIndex];
    
    if (!lane || !lane.activeWord) {
        // Нажатие на пустую дорожку
        gameState.score += gameConfig3.points.wrongKey;
        showMessage(`Пустая дорожка ${key}: -10 очков`, 'error');
        return;
    }
    
    const word = lane.activeWord;
    const hitLine = document.getElementById('hitLine');
    const hitLinePosition = hitLine.offsetTop - lane.element.offsetTop;
    
    // Проверяем позицию слова
    const distanceToLine = Math.abs(word.position - hitLinePosition);
    
    if (distanceToLine <= 25) {
        // Идеальное попадание!
        if (word.isCorrect) {
            gameState.score += gameConfig3.points.perfect;
            gameState.hits++;
            gameState.correctWords++;
            showMessage(`Идеально! "${word.word}" +30 очков`, 'success');
            
            // Эффект правильного попадания
            word.element.classList.add('hit-perfect');
        } else {
            // Неправильное слово на линии
            gameState.score += gameConfig3.points.wrongKey;
            gameState.wrongWords++;
            showMessage(`Неправильное слово! -10 очков`, 'error');
            word.element.classList.add('hit-wrong');
        }
    } else if (distanceToLine <= 60) {
        // Хорошее попадание
        if (word.isCorrect) {
            gameState.score += gameConfig3.points.good;
            gameState.hits++;
            gameState.correctWords++;
            showMessage(`Хорошо! "${word.word}" +20 очков`, 'success');
            word.element.classList.add('hit-good');
        } else {
            gameState.score += gameConfig3.points.wrongKey;
            gameState.wrongWords++;
            showMessage(`Неправильное слово! -10 очков`, 'error');
            word.element.classList.add('hit-wrong');
        }
    } else {
        // Промах
        gameState.score += gameConfig3.points.wrongKey;
        showMessage(`Промах! -10 очков`, 'error');
    }
    
    // Удаляем слово
    removeWordFromLane(lane, true);
    
    // Проверяем завершение раунда
    checkRoundCompletion();
    
    updateUI();
}

function startTimer() {
    clearInterval(gameState.timer);
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        updateTimer();
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            setTimeout(() => {
                checkTimeEnd();
            }, 500);
        }
    }, 1000);
}

function checkTimeEnd() {
    if (gameState.roundEnded) return;
    
    gameState.roundEnded = true;
    gameState.isGameRunning = false;
    
    // Останавливаем генерацию слов
    clearInterval(gameState.wordInterval);
    
    // Останавливаем все анимации
    gameState.lanes.forEach(lane => {
        if (lane.animationId) {
            cancelAnimationFrame(lane.animationId);
            lane.animationId = null;
        }
    });
    
    // Проверяем, набрали ли нужное количество попаданий
    if (gameState.hits >= gameState.requiredHits) {
        endRound(true);
    } else {
        document.getElementById('loseMessage').textContent = 
            `Время вышло! Нужно ${gameState.requiredHits} попаданий, а у вас ${gameState.hits}.`;
        showLoseModal();
    }
}

function checkRoundCompletion() {
    if (gameState.hits >= gameState.requiredHits) {
        endRound(true);
    }
}

function endRound(success) {
    if (gameState.roundEnded) return;
    
    gameState.roundEnded = true;
    gameState.isGameRunning = false;
    clearInterval(gameState.timer);
    clearInterval(gameState.wordInterval);
    
    // Останавливаем все анимации
    gameState.lanes.forEach(lane => {
        if (lane.animationId) {
            cancelAnimationFrame(lane.animationId);
            lane.animationId = null;
        }
        if (lane.activeWord) {
            removeWordFromLane(lane);
        }
    });
    
    // Удаляем обработчики клавиш
    document.removeEventListener('keydown', handleKeyDown);
    
    if (success) {
        showMessage(`Раунд пройден! Попаданий: ${gameState.hits}/${gameState.requiredHits}`, 'success');
        
        // Переходим к следующему раунду через 2 секунды
        setTimeout(() => {
            if (gameState.currentRound < gameConfig3.totalRounds) {
                gameState.currentRound++;
                startRound();
            } else {
                endGameWin();
            }
        }, 2000);
    } else {
        showLoseModal();
    }
    
    updateUI();
}

function updateTimer() {
    const timerText = document.getElementById('timerText');
    const timerProgress = document.getElementById('timerProgress');
    const timeLimit = gameConfig3.timeLimits[gameState.difficulty];
    
    timerText.textContent = gameState.timeLeft;
    
    const progressPercent = (gameState.timeLeft / timeLimit) * 100;
    timerProgress.style.width = `${progressPercent}%`;
    
    if (gameState.timeLeft <= 5) {
        timerProgress.style.background = '#f44336';
        timerText.style.color = '#f44336';
    } else if (gameState.timeLeft <= 10) {
        timerProgress.style.background = '#ff9800';
        timerText.style.color = '#ff9800';
    } else {
        timerProgress.style.background = '#4CAF50';
        timerText.style.color = '#4CAF50';
    }
}

function updateUI() {
    document.getElementById('round').textContent = gameState.currentRound;
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('hits').textContent = gameState.hits;
    document.getElementById('requiredHits').textContent = gameState.requiredHits;
    updateTimer();
}

function showMessage(text, type) {
    const statusElement = document.getElementById('gameStatus');
    statusElement.textContent = text;
    
    switch(type) {
        case 'success':
            statusElement.style.color = '#4CAF50';
            break;
        case 'error':
            statusElement.style.color = '#f44336';
            break;
        case 'warning':
            statusElement.style.color = '#ff9800';
            break;
        case 'info':
            statusElement.style.color = '#2196F3';
            break;
    }
    
    setTimeout(() => {
        if (statusElement.textContent === text) {
            statusElement.textContent = '';
        }
    }, 3000);
}

function endGameWin() {
    saveUserProgress();
    
    document.getElementById('winScoreText').textContent = `Ваши очки: ${gameState.score}`;
    document.getElementById('winModal').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}

function showLoseModal() {
    document.getElementById('loseModal').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}

function retryGame() {
    document.getElementById('loseModal').style.display = 'none';
    
    // Сброс игры
    gameState = {
        currentRound: 1,
        score: 0,
        level: gameState.level,
        difficulty: gameState.difficulty,
        timeLeft: gameConfig3.timeLimits[gameState.difficulty],
        timer: null,
        startTime: null,
        activeWords: [],
        hits: 0,
        requiredHits: gameConfig3.requiredHits[gameState.difficulty],
        totalWords: 0,
        correctWords: 0,
        wrongWords: 0,
        roundEnded: false,
        lanes: [],
        wordInterval: null,
        isGameRunning: false,
        animationFrames: {}
    };
    
    document.getElementById('gameContainer').style.display = 'block';
    startRound();
}

function goToMenu() {
    window.location.href = '../../index.html';
}

function endGame() {
    if (confirm('Вы уверены, что хотите выйти? Прогресс не сохранится.')) {
        window.location.href = '../../index.html';
    }
}

function saveUserProgress() {
    const username = getGameUsername();
    if (!username) return;
    
    const STORAGE_KEY = 'animal_master_';
    const usersJson = localStorage.getItem(STORAGE_KEY + 'users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const userIndex = users.findIndex(u => u.name === username);
    
    if (userIndex > -1) {
        users[userIndex].score = (users[userIndex].score || 0) + gameState.score;
        localStorage.setItem(STORAGE_KEY + 'users', JSON.stringify(users));
    }
}

function getGameUsername() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('user');
    
    if (username) {
        localStorage.setItem('animal_master_current_user_name', username);
        return username;
    }
    
    return localStorage.getItem('animal_master_current_user_name') || 'Игрок';
}

window.onload = initGame;