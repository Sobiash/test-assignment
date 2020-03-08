var menuBtn = document.querySelector('.main-menu__btn');
var mainPage = document.querySelector('.main__page');

var showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    mainPage.classList.add("show-menu")
    showMenu = true;
  } else {
    mainPage.classList.remove("show-menu")

    showMenu = false;
  }
}