document.addEventListener('DOMContentLoaded', () => {
    const logo1 = document.getElementById('logo');
    const logo2 = document.getElementById('logo2');
  
    setInterval(() => {
      if (logo1.classList.contains('second-logo')) {
        logo1.classList.remove('second-logo');
        logo2.classList.add('second-logo');
      } else {
        logo1.classList.add('second-logo');
        logo2.classList.remove('second-logo');
      }
    }, 5000); 
  });