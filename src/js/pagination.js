document.addEventListener('DOMContentLoaded', function () {
  const contentDiv = document.getElementById('content');
  const paginationDiv = document.getElementById('pagination');

  const itemsPerPage = 1; 
  const totalItems = 300; 
  const totalPages = Math.ceil(totalItems / itemsPerPage); 
  let currentPage = 1;

  function generateContent(page) {
    contentDiv.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = Math.min(page * itemsPerPage, totalItems);

    for (let i = startIndex; i <= endIndex; i++) {
      contentDiv.innerHTML += `<p>Item ${i}: This is some content for item ${i}.</p>`;
    }
  }

  function generatePagination() {
    paginationDiv.innerHTML = '';

    const firstArrow = document.createElement('span');
    firstArrow.className = 'arrow';
    firstArrow.textContent = '«';
    firstArrow.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage = 1;
        updatePagination();
      }
    });
    if (currentPage === 1) {
      firstArrow.classList.add('disabled');
    }
    paginationDiv.appendChild(firstArrow);

    const prevArrow = document.createElement('span');
    prevArrow.className = 'arrow';
    prevArrow.textContent = '←';
    prevArrow.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });
    if (currentPage === 1) {
      prevArrow.classList.add('disabled');
    }
    paginationDiv.appendChild(prevArrow);

    const maxButtons = 4; // Number of page buttons to display initially
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement('span');
      button.className = 'page-button';
      button.textContent = i;
      if (i === currentPage) {
        button.classList.add('active');
      }
      button.addEventListener('click', function () {
        currentPage = i;
        updatePagination();
      });
      paginationDiv.appendChild(button);
    }

    const nextArrow = document.createElement('span');
    nextArrow.className = 'arrow';
    nextArrow.textContent = '→';
    nextArrow.addEventListener('click', function () {
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
      }
    });
    if (currentPage === totalPages) {
      nextArrow.classList.add('disabled');
    }
    paginationDiv.appendChild(nextArrow);

    // Add "last page" double arrow
    const lastArrow = document.createElement('span');
    lastArrow.className = 'arrow';
    lastArrow.textContent = '»';
    lastArrow.addEventListener('click', function () {
      if (currentPage < totalPages) {
        currentPage = totalPages;
        updatePagination();
      }
    });
    if (currentPage === totalPages) {
      lastArrow.classList.add('disabled');
    }
    paginationDiv.appendChild(lastArrow);
  }

  function updatePagination() {
    generateContent(currentPage);
    generatePagination();
  }

  updatePagination(); 
});
