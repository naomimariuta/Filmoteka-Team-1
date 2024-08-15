const themeToggleBtn = document.getElementById('theme-toggle');
const watchedBtn = document.querySelector('.watched-btn');
const queueBtn = document.querySelector('.queue-btn');
const actionPage = document.querySelector('.active_link');

themeToggleBtn.addEventListener('click', () => {
  document.querySelector('.home-btn').classList.toggle('dark-mode');
  if (actionPage.dataset.action === 'library') {
    watchedBtn.classList.toggle('dark-mode');
    queueBtn.classList.toggle('dark-mode');
  }
  document.querySelector('.library-btn').classList.toggle('dark-mode');
  const titles = document.querySelectorAll('.card-list-title');
  titles.forEach(title => {
    title.classList.toggle('dark-mode');
  });

  const footerTheme = document.querySelector('.footer-container');
  footerTheme.classList.toggle('dark-mode');

  document.body.classList.toggle('dark-mode');
});
