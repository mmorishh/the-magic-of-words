// Конфигурация игры для уровня 2
const gameConfig2 = {
    totalRounds: 3,
    timeLimits: {
        easy: 25,
        medium: 20,
        hard: 15
    },
    points: {
        allCorrect: 150,    // Найдены все правильные слова
        wrongWord: -10      // Перетащили неправильное слово
    },
    wordCounts: {
        easy: 6,
        medium: 9,
        hard: 9
    }
};

// База данных животных
const animals = [
    { word: "аист", firstLetter: "а", lastLetter: "т", secondLetter: "и", length: 4 },
    { word: "баран", firstLetter: "б", lastLetter: "н", secondLetter: "а", length: 5 },
    { word: "волк", firstLetter: "в", lastLetter: "к", secondLetter: "о", length: 4 },
    { word: "голубь", firstLetter: "г", lastLetter: "ь", secondLetter: "о", length: 6 },
    { word: "дельфин", firstLetter: "д", lastLetter: "н", secondLetter: "е", length: 7 },
    { word: "ёж", firstLetter: "ё", lastLetter: "ж", secondLetter: "", length: 2 },
    { word: "жираф", firstLetter: "ж", lastLetter: "ф", secondLetter: "и", length: 5 },
    { word: "зебра", firstLetter: "з", lastLetter: "а", secondLetter: "е", length: 5 },
    { word: "индюк", firstLetter: "и", lastLetter: "к", secondLetter: "н", length: 5 },
    { word: "кенгуру", firstLetter: "к", lastLetter: "у", secondLetter: "е", length: 7 },
    { word: "лев", firstLetter: "л", lastLetter: "в", secondLetter: "е", length: 3 },
    { word: "лось", firstLetter: "л", lastLetter: "ь", secondLetter: "о", length: 4 },
    { word: "медведь", firstLetter: "м", lastLetter: "ь", secondLetter: "е", length: 7 },
    { word: "носорог", firstLetter: "н", lastLetter: "г", secondLetter: "о", length: 7 },
    { word: "обезьяна", firstLetter: "о", lastLetter: "а", secondLetter: "б", length: 8 },
    { word: "панда", firstLetter: "п", lastLetter: "а", secondLetter: "а", length: 5 },
    { word: "рысь", firstLetter: "р", lastLetter: "ь", secondLetter: "ы", length: 4 },
    { word: "слон", firstLetter: "с", lastLetter: "н", secondLetter: "л", length: 4 },
    { word: "тигр", firstLetter: "т", lastLetter: "р", secondLetter: "и", length: 4 },
    { word: "утка", firstLetter: "у", lastLetter: "а", secondLetter: "т", length: 4 },
    { word: "фламинго", firstLetter: "ф", lastLetter: "о", secondLetter: "л", length: 8 },
    { word: "хомяк", firstLetter: "х", lastLetter: "к", secondLetter: "о", length: 5 },
    { word: "цапля", firstLetter: "ц", lastLetter: "я", secondLetter: "а", length: 5 },
    { word: "черепаха", firstLetter: "ч", lastLetter: "а", secondLetter: "е", length: 8 },
    { word: "шакал", firstLetter: "ш", lastLetter: "л", secondLetter: "а", length: 5 },
    { word: "щенок", firstLetter: "щ", lastLetter: "к", secondLetter: "е", length: 5 },
    { word: "эму", firstLetter: "э", lastLetter: "у", secondLetter: "м", length: 3 },
    { word: "юрок", firstLetter: "ю", lastLetter: "к", secondLetter: "р", length: 4 },
    { word: "ящерица", firstLetter: "я", lastLetter: "а", secondLetter: "щ", length: 8 },
    { word: "гусь", firstLetter: "г", lastLetter: "ь", secondLetter: "у", length: 4 },
    { word: "крот", firstLetter: "к", lastLetter: "т", secondLetter: "р", length: 4 },
    { word: "орёл", firstLetter: "о", lastLetter: "л", secondLetter: "р", length: 4 },
    { word: "петух", firstLetter: "п", lastLetter: "х", secondLetter: "е", length: 5 },
    { word: "собака", firstLetter: "с", lastLetter: "а", secondLetter: "о", length: 6 },
    { word: "корова", firstLetter: "к", lastLetter: "а", secondLetter: "о", length: 6 },
    { word: "мышь", firstLetter: "м", lastLetter: "ь", secondLetter: "ы", length: 4 },
    { word: "кот", firstLetter: "к", lastLetter: "т", secondLetter: "о", length: 3 },
    { word: "осёл", firstLetter: "о", lastLetter: "л", secondLetter: "с", length: 4 },
    { word: "козёл", firstLetter: "к", lastLetter: "л", secondLetter: "о", length: 5 },
    { word: "бык", firstLetter: "б", lastLetter: "к", secondLetter: "ы", length: 3 },
    { word: "олень", firstLetter: "о", lastLetter: "ь", secondLetter: "л", length: 5 },
    { word: "белка", firstLetter: "б", lastLetter: "а", secondLetter: "е", length: 5 },
    { word: "верблюд", firstLetter: "в", lastLetter: "д", secondLetter: "е", length: 7 },
    { word: "дикобраз", firstLetter: "д", lastLetter: "з", secondLetter: "и", length: 8 },
    { word: "енот", firstLetter: "е", lastLetter: "т", secondLetter: "н", length: 4 },
    { word: "зубр", firstLetter: "з", lastLetter: "р", secondLetter: "у", length: 4 },
    { word: "игуана", firstLetter: "и", lastLetter: "а", secondLetter: "г", length: 6 },
    { word: "кабан", firstLetter: "к", lastLetter: "н", secondLetter: "а", length: 5 },
    { word: "лама", firstLetter: "л", lastLetter: "а", secondLetter: "а", length: 4 },
    { word: "мангуст", firstLetter: "м", lastLetter: "т", secondLetter: "а", length: 7 },
    { word: "тюлень", firstLetter: "т", lastLetter: "ь", secondLetter: "ю", length: 6 },
    { word: "пеликан", firstLetter: "п", lastLetter: "н", secondLetter: "е", length: 7 },
    { word: "страус", firstLetter: "с", lastLetter: "с", secondLetter: "т", length: 6 },
    { word: "фазан", firstLetter: "ф", lastLetter: "н", secondLetter: "а", length: 5 },
    { word: "хомячок", firstLetter: "х", lastLetter: "к", secondLetter: "о", length: 7 },
    { word: "цыплёнок", firstLetter: "ц", lastLetter: "к", secondLetter: "ы", length: 8 }
];

// Функция для нормализации русских букв
function normalizeRussianLetter(letter) {
    if (!letter) return '';
    
    const replacements = {
        'ё': 'е',
        'й': 'и'
    };
    
    const lowerLetter = letter.toLowerCase();
    return replacements[lowerLetter] || lowerLetter;
}

// Типы заданий
const taskTypes = [
    { 
        type: "firstLetter", 
        name: "начинаются на букву", 
        key: "firstLetter",
        description: (letter) => `Найдите слова, которые начинаются на букву "${letter.toUpperCase()}"`,
        filterFunc: (animal, param) => {
            const normalizedFirst = normalizeRussianLetter(animal.firstLetter);
            const normalizedParam = normalizeRussianLetter(param.toLowerCase());
            return normalizedFirst === normalizedParam;
        }
    },
    { 
        type: "lastLetter", 
        name: "заканчиваются на букву", 
        key: "lastLetter",
        description: (letter) => `Найдите слова, которые заканчиваются на букву "${letter.toUpperCase()}"`,
        filterFunc: (animal, param) => {
            const normalizedLast = normalizeRussianLetter(animal.lastLetter);
            const normalizedParam = normalizeRussianLetter(param.toLowerCase());
            return normalizedLast === normalizedParam;
        }
    },
    { 
        type: "secondLetter", 
        name: "вторая буква", 
        key: "secondLetter",
        description: (letter) => `Найдите слова, у которых вторая буква "${letter.toUpperCase()}"`,
        filterFunc: (animal, param) => {
            if (!animal.secondLetter) return false;
            const normalizedSecond = normalizeRussianLetter(animal.secondLetter);
            const normalizedParam = normalizeRussianLetter(param.toLowerCase());
            return normalizedSecond === normalizedParam;
        }
    },
    { 
        type: "length", 
        name: "количество букв", 
        key: "length",
        description: (num) => `Найдите слова, в которых ${num} букв`,
        filterFunc: (animal, param) => animal.length === parseInt(param)
    }
];

// Переменные игры
let gameState = {
    currentRound: 1,
    score: 0,
    level: 2,
    difficulty: 'easy',
    timeLeft: 25,
    timer: null,
    startTime: null,
    currentTask: null,
    correctWords: [],
    allWords: [],
    foundWords: [],
    wrongWords: [],
    totalCorrect: 0,
    usedTasks: [],
    roundEnded: false,
    wordElements: {}
};

// Инициализация игры
function initGame() {
    const level = localStorage.getItem('animal_master_game_level') || '2';
    const difficulty = localStorage.getItem('animal_master_game_difficulty');
    
    gameState.level = parseInt(level);
    gameState.difficulty = difficulty;
    gameState.timeLeft = gameConfig2.timeLimits[difficulty];
    
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
    gameState.correctWords = [];
    gameState.allWords = [];
    gameState.foundWords = [];
    gameState.wrongWords = [];
    gameState.totalCorrect = 0;
    gameState.roundEnded = false;
    gameState.wordElements = {};
    
    selectRandomTask();
    generateWords();
    
    gameState.timeLeft = gameConfig2.timeLimits[gameState.difficulty];
    gameState.startTime = Date.now();
    
    updateUI();
    createWordBlocks();
    setupDropZone();
    
    startTimer();
}

function selectRandomTask() {
    const availableTasks = taskTypes.filter(task => 
        !gameState.usedTasks.includes(task.type)
    );
    
    if (availableTasks.length === 0) {
        gameState.usedTasks = [];
        availableTasks.push(...taskTypes);
    }
    
    const taskType = availableTasks[Math.floor(Math.random() * availableTasks.length)];
    gameState.usedTasks.push(taskType.type);
    
    let taskParam;
    let possibleAnimals = [];
    
    switch(taskType.type) {
        case "firstLetter":
            const firstLetters = animals.map(a => a.firstLetter);
            const uniqueFirstLetters = [...new Set(firstLetters)];
            taskParam = uniqueFirstLetters[Math.floor(Math.random() * uniqueFirstLetters.length)];
            break;
            
        case "lastLetter":
            const lastLetters = animals.map(a => a.lastLetter);
            const uniqueLastLetters = [...new Set(lastLetters)];
            taskParam = uniqueLastLetters[Math.floor(Math.random() * uniqueLastLetters.length)];
            break;
            
        case "secondLetter":
            const secondLetters = animals.map(a => a.secondLetter).filter(l => l !== "");
            const uniqueSecondLetters = [...new Set(secondLetters)];
            taskParam = uniqueSecondLetters[Math.floor(Math.random() * uniqueSecondLetters.length)];
            break;
            
        case "length":
            const lengths = animals.map(a => a.length);
            const uniqueLengths = [...new Set(lengths)];
            taskParam = uniqueLengths[Math.floor(Math.random() * uniqueLengths.length)];
            break;
    }
    
    possibleAnimals = animals.filter(animal => 
        taskType.filterFunc(animal, taskParam)
    );
    
    if (possibleAnimals.length === 0) {
        console.warn(`Нет животных для параметра: ${taskParam}, тип: ${taskType.type}`);
        gameState.usedTasks.pop();
        selectRandomTask();
        return;
    }
    
    gameState.currentTask = {
        type: taskType.type,
        param: taskParam,
        description: taskType.description(taskParam),
        possibleAnimals: possibleAnimals,
        filterFunc: taskType.filterFunc
    };
    
    console.log(`Задание: ${taskType.description(taskParam)}`);
    console.log(`Параметр: ${taskParam}`);
    console.log(`Доступных животных: ${possibleAnimals.length}`);
    
   
    document.getElementById('taskText').textContent = taskType.description(taskParam);

    document.getElementById('taskDescription').style.display = 'none';
}

/*function generateWords() {
    const wordCount = gameConfig2.wordCounts[gameState.difficulty];
    
    const allCorrectAnimals = gameState.currentTask.possibleAnimals;
    
    let selectedCorrectAnimals;
    
    if (allCorrectAnimals.length <= wordCount) {
        selectedCorrectAnimals = [...allCorrectAnimals];
    } else {
        selectedCorrectAnimals = [...allCorrectAnimals]
            .sort(() => Math.random() - 0.5)
            .slice(0, wordCount);
    }
    
    gameState.correctWords = selectedCorrectAnimals.map(a => a.word);
    gameState.totalCorrect = gameState.correctWords.length;
    
    console.log("ВСЕ ПРАВИЛЬНЫЕ СЛОВА:", gameState.correctWords);
    console.log("Количество правильных слов:", gameState.totalCorrect);
    
    const wrongAnimals = animals.filter(a => !gameState.correctWords.includes(a.word));
    const neededWrongCount = wordCount - gameState.totalCorrect;
    const selectedWrong = [];
    
    if (neededWrongCount > 0) {
        const availableWrong = [...wrongAnimals];
        
        for (let i = 0; i < neededWrongCount && availableWrong.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableWrong.length);
            selectedWrong.push(availableWrong[randomIndex].word);
            availableWrong.splice(randomIndex, 1);
        }
    }
    
    gameState.allWords = [...gameState.correctWords, ...selectedWrong];
    shuffleArray(gameState.allWords);
    
    console.log("ВСЕ СЛОВА В РАУНДЕ:", gameState.allWords);
    console.log("Правильных/Всего:", gameState.totalCorrect, "/", gameState.allWords.length);
}*/


function generateWords() {
    const wordCount = gameConfig2.wordCounts[gameState.difficulty];
    
    console.log(`Генерируем ${wordCount} слов для уровня ${gameState.difficulty}`);
    
    // 1. ДОБАВЛЯЕМ ОДНО ПРАВИЛЬНОЕ СЛОВО
    // Находим всех животных, которые подходят под задание
    const allCorrectAnimals = animals.filter(animal => 
        gameState.currentTask.filterFunc(animal, gameState.currentTask.param)
    );
    
    if (allCorrectAnimals.length === 0) {
        console.error("Нет животных для этого задания!");
        // Fallback: берем любое животное
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        gameState.correctWords = [randomAnimal.word];
    } else {
        // Берем случайное правильное животное
        const randomCorrect = allCorrectAnimals[Math.floor(Math.random() * allCorrectAnimals.length)];
        gameState.correctWords = [randomCorrect.word];
    }
    
    gameState.totalCorrect = 1;
    console.log("Правильное слово:", gameState.correctWords[0]);
    
    // 2. ДОБАВЛЯЕМ ОСТАЛЬНЫЕ СЛОВА ИЗ ВСЕГО СПИСКА
    const selectedWords = [...gameState.correctWords]; // Начинаем с правильного слова
    
    // Создаем копию всех животных и перемешиваем
    const shuffledAnimals = [...animals].sort(() => Math.random() - 0.5);
    
    // Проходим по перемешанным животным и добавляем пока не наберем нужное количество
    for (const animal of shuffledAnimals) {
        // Пропускаем если уже есть такое слово
        if (selectedWords.includes(animal.word)) continue;
        
        // Добавляем слово
        selectedWords.push(animal.word);
        
        // Проверяем, является ли это слово правильным по заданию
        const isCorrect = gameState.currentTask.filterFunc(animal, gameState.currentTask.param);
        if (isCorrect && !gameState.correctWords.includes(animal.word)) {
            gameState.correctWords.push(animal.word);
            gameState.totalCorrect++;
        }
        
        // Останавливаемся когда набрали нужное количество
        if (selectedWords.length >= wordCount) break;
    }
    
    // Если все еще не хватает слов (маловероятно), добавляем любые
    while (selectedWords.length < wordCount) {
        // Ищем любое животное которого еще нет
        for (const animal of animals) {
            if (!selectedWords.includes(animal.word)) {
                selectedWords.push(animal.word);
                
                // Проверяем правильность
                const isCorrect = gameState.currentTask.filterFunc(animal, gameState.currentTask.param);
                if (isCorrect && !gameState.correctWords.includes(animal.word)) {
                    gameState.correctWords.push(animal.word);
                    gameState.totalCorrect++;
                }
                break;
            }
        }
    }
    
    // 3. ПРОВЕРЯЕМ И ЗАПУСКАЕМ
    gameState.allWords = selectedWords;
    
    // Перемешиваем слова
    shuffleArray(gameState.allWords);
    
    console.log("Все слова в раунде:", gameState.allWords);
    console.log("Правильные слова:", gameState.correctWords);
    console.log("Всего правильных:", gameState.totalCorrect);
    console.log("Всего слов:", gameState.allWords.length, "из", wordCount);
    
    // Финальная проверка
    if (gameState.allWords.length !== wordCount) {
        console.error(`ОШИБКА: ${gameState.allWords.length} слов вместо ${wordCount}!`);
        // Простой фикс: берем первые wordCount слов
        gameState.allWords = gameState.allWords.slice(0, wordCount);
    }
}




function createWordBlocks() {
    const container = document.getElementById('wordBlocks');
    container.innerHTML = '';
    
    gameState.allWords.forEach((word, index) => {
        const block = document.createElement('div');
        block.className = 'word-block';
        block.id = `word-${index}`;
        block.textContent = word;
        block.dataset.word = word;
        
        const isCorrect = gameState.correctWords.includes(word);
        block.dataset.correct = isCorrect ? 'true' : 'false';
        
        if (isCorrect) {
            console.log(`✓ Правильный блок: "${word}"`);
        }
        
        gameState.wordElements[word] = block;
        
        if (gameState.difficulty === 'medium') {
            block.classList.add('moving');
            const speed = 3 + Math.random() * 2;
            block.style.animationDuration = `${speed}s`;
        } else if (gameState.difficulty === 'hard') {
            block.classList.add('disappearing');
            const animationSpeed = 1 + Math.random();
            block.style.animation = `disappearPulse ${animationSpeed}s infinite alternate`;
        }
        
        block.draggable = true;
        block.addEventListener('dragstart', handleDragStart);
        
        container.appendChild(block);
    });
    
    document.getElementById('foundCount').textContent = '0';
    document.getElementById('totalCorrect').textContent = gameState.totalCorrect;
}

function setupDropZone() {
    const dropZone = document.getElementById('dropZone');
    const droppedWords = document.getElementById('droppedWords');
    droppedWords.innerHTML = '';
    
    dropZone.removeEventListener('dragover', handleDragOver);
    dropZone.removeEventListener('drop', handleDrop);
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    if (gameState.roundEnded) {
        e.preventDefault();
        return;
    }
    
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.setData('word', e.target.dataset.word);
    e.dataTransfer.setData('correct', e.target.dataset.correct);
    
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    if (!gameState.roundEnded) {
        e.currentTarget.classList.add('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (gameState.roundEnded) return;
    
    const blockId = e.dataTransfer.getData('text/plain');
    const word = e.dataTransfer.getData('word');
    const isCorrect = e.dataTransfer.getData('correct') === 'true';
    const block = document.getElementById(blockId);
    
    if (!block) return;
    
    if (gameState.foundWords.includes(word) || gameState.wrongWords.includes(word)) {
        showMessage('Это слово уже добавлено!', 'warning');
        block.classList.remove('dragging');
        return;
    }
    
    block.classList.add('used');
    block.draggable = false;
    
    const droppedWords = document.getElementById('droppedWords');
    
    const wordElement = document.createElement('div');
    wordElement.className = 'dropped-word';
    wordElement.textContent = word;
    wordElement.dataset.word = word;
    wordElement.dataset.correct = isCorrect;
    
    if (isCorrect) {
        wordElement.classList.add('correct');
        gameState.foundWords.push(word);
        showMessage(`Правильно! "${word}" добавлено.`, 'success');
    } else {
        wordElement.classList.add('wrong');
        gameState.wrongWords.push(word);
        gameState.score += gameConfig2.points.wrongWord;
        showMessage(`Неправильно! "${word}" - минус 10 очков.`, 'error');
    }
    
    droppedWords.appendChild(wordElement);
    
    updateCounter();
    checkRoundCompletion();
    updateUI();
}

function updateCounter() {
    const foundCount = document.getElementById('foundCount');
    foundCount.textContent = gameState.foundWords.length;
    
    if (gameState.foundWords.length === gameState.totalCorrect) {
        foundCount.style.color = '#4CAF50';
        foundCount.style.fontWeight = 'bold';
    } else {
        foundCount.style.color = '#333';
        foundCount.style.fontWeight = 'normal';
    }
}

function checkRoundCompletion() {
    if (gameState.foundWords.length === gameState.totalCorrect) {
        endRound(true);
        return;
    }
    
    const totalDropped = gameState.foundWords.length + gameState.wrongWords.length;
    const totalWords = gameState.allWords.length;
    
    if (totalDropped === totalWords) {
        if (gameState.foundWords.length === gameState.totalCorrect) {
            endRound(true);
        } else {
        endRound(false);
        }
    }
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
    
    if (gameState.foundWords.length === gameState.totalCorrect) {
        endRound(true);
    } else {
        document.getElementById('loseMessage').textContent = 'Время вышло! Вы не нашли все правильные слова.';
        showLoseModal();
    }
}

function updateTimer() {
    const timerText = document.getElementById('timerText');
    const timerProgress = document.getElementById('timerProgress');
    const timeLimit = gameConfig2.timeLimits[gameState.difficulty];
    
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

function endRound(success) {
        if (gameState.roundEnded || gameState.roundCompleted) {
        console.log('Раунд уже завершен');
        return;
    }
    
    gameState.roundEnded = true;
    clearInterval(gameState.timer);
    
    if (success) {
        gameState.score += gameConfig2.points.allCorrect;
        showMessage(`Отлично! Все слова найдены. +${gameConfig2.points.allCorrect} очков!`, 'success');
        
        setTimeout(() => {
            if (gameState.currentRound < gameConfig2.totalRounds) {
                gameState.currentRound++;
                startRound();
            } else {
                endGameWin();
            }
        }, 2000);
    } else {
        document.getElementById('loseMessage').textContent = `Вы не нашли все правильные слова! Найдено ${gameState.foundWords.length} из ${gameState.totalCorrect}.`;
        showLoseModal();
    }
    
    updateUI();
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

function updateUI() {
    document.getElementById('round').textContent = gameState.currentRound;
    document.getElementById('score').textContent = gameState.score;
    updateTimer();
}

function retryGame() {
    document.getElementById('loseModal').style.display = 'none';
    
    gameState = {
        currentRound: 1,
        score: 0,
        level: gameState.level,
        difficulty: gameState.difficulty,
        timeLeft: gameConfig2.timeLimits[gameState.difficulty],
        timer: null,
        startTime: null,
        currentTask: null,
        correctWords: [],
        allWords: [],
        foundWords: [],
        wrongWords: [],
        totalCorrect: 0,
        usedTasks: [],
        roundEnded: false,
        wordElements: {}
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

function saveUserProgress() {
    const username = getGameUsername();
    if (!username) return;
    
    const STORAGE_KEY = 'animal_master_';
    const usersJson = localStorage.getItem(STORAGE_KEY + 'users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const userIndex = users.findIndex(u => u.name === username);
    
    if (userIndex > -1) {
        users[userIndex].score = (users[userIndex].score || 0) + gameState.score;
        
        const currentLevel = gameState.level;
        const nextLevel = currentLevel + 1;
        
        if (nextLevel <= 3 && users[userIndex].level < nextLevel) {
            users[userIndex].level = nextLevel;
        }
        
        localStorage.setItem(STORAGE_KEY + 'users', JSON.stringify(users));
    }
}

window.onload = initGame;