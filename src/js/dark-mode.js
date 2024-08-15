const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  document.querySelector('.home-btn').classList.toggle('dark-mode');
  document.querySelector('.library-btn').classList.toggle('dark-mode');
  document.querySelector('.watched-btn').classList.toggle('dark-mode');
  document.querySelector('.queue-btn').classList.toggle('dark-mode');
  const titles = document.querySelectorAll('.card-list-title');
  titles.forEach(title => {
    title.classList.toggle('dark-mode');
  });

  const footerTheme = document.querySelector('.footer-container');
  footerTheme.classList.toggle('dark-mode');

  document.body.classList.toggle('dark-mode');
});
