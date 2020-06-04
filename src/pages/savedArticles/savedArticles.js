import './savedArticles.css';

// функция для открытия подменю в мобильной версии
(function () {
  const headerMenu = document.querySelector('.header__menu');
  const headerMenuClose = document.querySelector('.header__menu_close');
  const header = document.querySelector('.header');
  const headerBackground = document.querySelector('.background__mobile');
  headerMenu.addEventListener('click', (() => {
    header.classList.add('header_active');
    headerBackground.classList.add('background__mobile_active');
  }));
  headerMenuClose.addEventListener('click', (() => {
    header.classList.remove('header_active');
    headerBackground.classList.remove('background__mobile_active');
  }));
}());
