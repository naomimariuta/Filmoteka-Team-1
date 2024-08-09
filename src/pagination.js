document.addEventListener('DOMContentLoaded', function () {
  const contentDiv = document.getElementById('content');
  const paginationDiv = document.getElementById('pagination');

  const itemsPerPage = 1; // Number of items per page
  const totalItems = 300; // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages
  let currentPage = 1;

  function generateContent(page) {
    contentDiv.innerHTML = '';
    if (page > 1) {
      contentDiv.style.display = 'block'; // Show content if not on the first page
      // Calculate the start and end index for the current page
      const startIndex = (page - 1) * itemsPerPage + 1;
      const endIndex = Math.min(page * itemsPerPage, totalItems);

      for (let i = startIndex; i <= endIndex; i++) {
        contentDiv.innerHTML += `<p>Item ${i}: This is some content for item ${i}.</p>`;
      }
    } else {
      contentDiv.style.display = 'none'; // Hide content on the first page
    }
  }

  function generatePagination() {
    paginationDiv.innerHTML = '';

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

    // Calculate the page range to show
    const maxButtons = 4; // Number of page buttons to display initially
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust startPage if the endPage goes beyond totalPages
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
  }

  function updatePagination() {
    generateContent(currentPage);
    generatePagination();
  }

  updatePagination(); // Initial call to setup content and pagination
});
