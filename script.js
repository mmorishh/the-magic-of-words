// Конфигурация
const STORAGE_KEY = 'animal_master_';

// Инициализация
function init() {
    // Очистка старых данных при первом запуске
    if (!localStorage.getItem(STORAGE_KEY + 'init')) {
        clearOldData();
        localStorage.setItem(STORAGE_KEY + 'init', 'true');
    }
    
    checkUser();
}

// Очистка старых данных
function clearOldData() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_KEY)) {
            keys.push(key);
        }
    }
    keys.forEach(key => localStorage.removeItem(key));
}


function checkUser() {
    showAuth();
}


function showAuth() {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('username').focus();
}

// Вход
function login() {
    const username = document.getElementById('username').value.trim();
    
    if (username.length < 2 || username.length > 20) {
        alert('Имя должно быть от 2 до 20 символов');
        return;
    }
    

    let user = getUserByName(username);
    
    if (!user) {
        // Создаем нового пользователя
        user = {
            name: username,
            level: 1,
            score: 0,
            created: new Date().toISOString(),
        };
    }
    
    saveUser(user);
    showMainPage(user);
}

// Выход
function logout() {
    showAuth();
}


function showMainPage(user) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    
    document.getElementById('currentUser').textContent = user.name;
    document.getElementById('currentScore').textContent = user.score;
    
    updateLevels(user.level);
}

// Сохранение пользователя в список пользователей
function saveUser(user) {
    const users = getAllUsers();
    const existingIndex = users.findIndex(u => u.name === user.name);
    
    if (existingIndex >= 0) {
        users[existingIndex] = user;
    } else {
        users.push(user);
    }
    
    localStorage.setItem(STORAGE_KEY + 'users', JSON.stringify(users));
}


function getUserByName(username) {
    const users = getAllUsers();
    return users.find(u => u.name === username);
}


function getAllUsers() {
    const usersJson = localStorage.getItem(STORAGE_KEY + 'users');
    return usersJson ? JSON.parse(usersJson) : [];
}


function updateLevels(userLevel) {
    for (let i = 1; i <= 3; i++) {
        const levelDiv = document.querySelectorAll('.level')[i-1];
        const playBtn = levelDiv.querySelector('button:first-of-type');
        const difficultyDiv = document.getElementById('difficulty' + i);
        
        if (i <= userLevel) {
            playBtn.disabled = false;
            playBtn.textContent = 'Играть';
        } else {
            playBtn.disabled = true;
            playBtn.textContent = 'Заблокирован';
            difficultyDiv.style.display = 'none';
        }
    }
}


function goToRating() {
    const currentUsername = document.getElementById('currentUser').textContent;
    window.location.href = `rating.html?user=${encodeURIComponent(currentUsername)}`;
}


// Показать/скрыть выбор сложности
function toggleDifficulty(level) {
    const difficultyDiv = document.getElementById('difficulty' + level);
    const user = getUserByName(document.getElementById('currentUser').textContent);
    
    
    if (difficultyDiv.style.display === 'none') {
        // Скрыть другие выпадающие списки
        for (let i = 1; i <= 3; i++) {
            if (i !== level) {
                document.getElementById('difficulty' + i).style.display = 'none';
            }
        }
        difficultyDiv.style.display = 'flex';
    } else {
        difficultyDiv.style.display = 'none';
    }
}

// Разблокировать все уровни для пользователя
function unlockAll() {
    const currentUsername = document.getElementById('currentUser').textContent;
    const user = getUserByName(currentUsername);
    
    user.level = 3;
    saveUser(user);  // Сохраняем изменения
    updateLevels(3);
}

// Начать игру
function startGame(level) {
    const currentUsername = document.getElementById('currentUser').textContent;
    const user = getUserByName(currentUsername);
    
    const difficulty = document.querySelector(`#difficulty${level} select`).value;
    
    // Сохраняем настройки
    localStorage.setItem('animal_master_game_level', level);
    localStorage.setItem('animal_master_game_difficulty', difficulty);
    localStorage.setItem('animal_master_current_user_name', currentUsername);
    
  
    let gamePage;
    switch(level) {
        case 1:
            gamePage = 'levels/level1/game.html';    
            break;
        case 2:
            gamePage = 'levels/level2/game2.html';   
            break;
        case 3:
            gamePage = 'levels/level3/game3.html';  
            break;
        default:
            gamePage = 'game.html';
    }
    
    // Переход с параметром имени
    window.location.href = `${gamePage}?user=${encodeURIComponent(currentUsername)}`;
}

// Запуск при загрузке страницы
window.onload = init;