import { getPopularFilms, onError} from "./movieApi";
import { createGallery } from "./libraryManager";

document.addEventListener('DOMContentLoaded', function () {
  const contentDiv = document.getElementById('content');
  const paginationDiv = document.getElementById('pagination');

  const itemsPerPage = 20;  // Numărul de elemente per pagină
  let currentPage = 1;
  let totalPages = 1;

  async function generateContent(page) {
    try {
      const data = await getPopularFilms(page);
      totalPages = Math.ceil(data.total_results / itemsPerPage);

      console.log("Total pages:", totalPages); 

      if (data.results.length > 0) {
        createGallery(data.results);
      } else {
        contentDiv.innerHTML = '<p>No movies available.</p>';
      }
      
      generatePagination(); // Generează butoanele de paginare după actualizarea `totalPages`
    } catch (error) {
      onError(error);
    }
  }

  function generatePagination() {
    paginationDiv.innerHTML = ''; 

    // Buton pentru prima pagină
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

    // Buton pentru pagina anterioară
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

    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Generează butoanele pentru pagini
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

    // Buton pentru pagina următoare
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

    // Buton pentru ultima pagină
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
    console.log(paginationDiv.innerHTML)
  }

  function updatePagination() {
    generateContent(currentPage);
  }

  updatePagination(); 
});
