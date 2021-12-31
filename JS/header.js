(function() {
  let burger = document.querySelector('.burger-button');
  let dropdownMenu = document.querySelector('.header__info');

  burger.addEventListener('click', function() {
      dropdownMenu.classList.toggle('header__info--opened');
      burger.classList.toggle('burger-button--opened');
  });
})();