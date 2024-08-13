
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {

  const titles = document.querySelectorAll('.card-list-title');
  titles.forEach(title => {
    title.classList.toggle('dark-mode');
  });

  const footerTheme = document.querySelector('.footer-container');
  footerTheme.classList.toggle('dark-mode');

  document.body.classList.toggle('dark-mode');
  
});