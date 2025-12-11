// Функция для получения всех пользователей
function getAllUsers() {
    const STORAGE_KEY = 'animal_master_';
    const usersJson = localStorage.getItem(STORAGE_KEY + 'users');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Функция для получения текущего пользователя
function getCurrentUsername() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('user');
    
    if (username) {
        localStorage.setItem('animal_master_current_user_name', username);
        return username;
    }
    
    return localStorage.getItem('animal_master_current_user_name') || null;
}

function loadRating() {
    const users = getAllUsers();
    const currentUsername = getCurrentUsername();
    
    // Сортируем пользователей по очкам (по убыванию)
    const sortedUsers = [...users].sort((a, b) => (b.score || 0) - (a.score || 0));
    
    const container = document.getElementById('ratingTableContainer');
    
    if (sortedUsers.length === 0) {
        container.innerHTML = '<div class="no-data">Пока нет игроков в рейтинге. Будьте первым!</div>';
    } else {
        let tableHTML = `
            <table class="rating-table">
                <thead>
                    <tr>
                        <th>Место</th>
                        <th>Имя игрока</th>
                        <th>Очки</th>
                        <th>Уровень</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let currentUserPosition = -1;
        let topScore = 0;
        let totalScore = 0;
        
        sortedUsers.forEach((user, index) => {
            const isCurrentUser = user.name === currentUsername;
            const rowClass = isCurrentUser ? 'current-user' : '';
            
            // Определяем медаль для первых трех мест
            let medalHTML = '';
            if (index === 0) {
                medalHTML = '<span class="medal medal-1">🥇</span>';
            } else if (index === 1) {
                medalHTML = '<span class="medal medal-2">🥈</span>';
            } else if (index === 2) {
                medalHTML = '<span class="medal medal-3">🥉</span>';
            }
            
            if (isCurrentUser) {
                currentUserPosition = index + 1;
            }
            
            if (index === 0) {
                topScore = user.score || 0;
            }
            
            totalScore += user.score || 0;
            
            tableHTML += `
                <tr class="${rowClass}">
                    <td>${medalHTML} ${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.score || 0}</td>
                    <td>${user.level || 1}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        container.innerHTML = tableHTML;
        
        document.getElementById('totalPlayers').textContent = users.length;
        document.getElementById('topScore').textContent = topScore;
        document.getElementById('avgScore').textContent = users.length > 0 ? Math.round(totalScore / users.length) : 0;

        const currentUser = users.find(u => u.name === currentUsername);
        document.getElementById('currentUserInfo').style.display = 'flex';
        document.getElementById('userPosition').textContent = currentUserPosition;
        document.getElementById('currentUserName').textContent = currentUsername;
        document.getElementById('currentUserScore').textContent = currentUser?.score || 0;
        
    }
}

function goToMenu() {
    const currentUsername = getCurrentUsername();
    if (currentUsername) {
        window.location.href = `index.html?user=${encodeURIComponent(currentUsername)}`;
    } else {
        window.location.href = 'index.html';
    }
}

window.onload = loadRating;