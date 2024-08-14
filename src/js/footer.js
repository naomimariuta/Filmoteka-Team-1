// footer.js

const modal = document.getElementById('myFooterModal');
const btn = document.getElementById('openFooterModal');
const closeBtn = document.querySelector('.btn-close');

function openModal() {
  modal.style.display = 'block';
  window.addEventListener('keydown', handleEscapeKeyPress);
}

function closeModal() {
  modal.style.display = 'none';
  window.removeEventListener('keydown', handleEscapeKeyPress);
}

function handleEscapeKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

btn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});