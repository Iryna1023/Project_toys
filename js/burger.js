// Переключаем класс для отображения меню
const menuBtn = document.getElementById('menu-btn');
const header = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
    // Переключаем класс .active для открытия и закрытия меню
    header.classList.toggle('active');
});