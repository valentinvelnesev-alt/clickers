// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Сообщаем телеграму, что приложение готово
tg.expand(); // Раскрыть на весь экран

// Основные переменные
let score = 0;
const scoreElement = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const usernameElement = document.getElementById('username');
const profileNameElement = document.getElementById('profile-name');

// Получаем данные пользователя, если приложение запущено в Telegram
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    const name = user.first_name + (user.last_name ? ' ' + user.last_name : '');
    usernameElement.innerText = name;
    profileNameElement.innerText = name;
} else {
    // Для тестирования в браузере
    usernameElement.innerText = "Test User";
    profileNameElement.innerText = "Test User";
}

// Логика кликера
clickBtn.addEventListener('click', (e) => {
    // Увеличиваем счет
    score++;
    scoreElement.innerText = score;

    // Вибрация (Haptic Feedback) - работает только в телефоне
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }

    // Анимация всплывающей цифры (опционально)
    showFloatingText(e);
});

// Эффект всплывающей цифры "+1"
function showFloatingText(e) {
    const floatText = document.createElement('div');
    floatText.innerText = '+1';
    floatText.style.position = 'absolute';
    floatText.style.color = '#fff';
    floatText.style.fontWeight = 'bold';
    floatText.style.pointerEvents = 'none';
    
    // Получаем координаты клика или центра, если клик программный
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    
    floatText.style.left = `${x}px`;
    floatText.style.top = `${y}px`;
    floatText.style.animation = 'floatUp 1s ease-out forwards';
    
    document.body.appendChild(floatText);
    
    setTimeout(() => {
        floatText.remove();
    }, 1000);
}

// Добавим анимацию для цифр в CSS (вставь это в style.css или <style>)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatUp {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-50px); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);


// Логика переключения вкладок
function switchTab(tabName) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Убираем активность у всех кнопок
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Показываем нужный экран
    document.getElementById(`screen-${tabName}`).classList.add('active');
    
    // Подсвечиваем кнопку (логика простая: ищем кнопку по индексу или onclick атрибуту)
    // В данном примере проще найти кнопку по тому, какую функцию она вызывает, 
    // но для простоты мы просто переберем кнопки:
    const buttons = document.querySelectorAll('.nav-btn');
    if (tabName === 'home') buttons[0].classList.add('active');
    if (tabName === 'tasks') buttons[1].classList.add('active');
    if (tabName === 'profile') buttons[2].classList.add('active');
}