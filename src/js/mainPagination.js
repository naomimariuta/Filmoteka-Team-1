import { Pagination } from 'tui-pagination';
import sprite from '../images/sprite-icons.svg';

export function createPagination(totalItems, itemsPerPage, visiblePages, page) {
  const container = document.getElementById('tui-pagination-container');
  const options = {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: visiblePages,
    page: page,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    usageStatistics: false,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        `<svg class="tui-ico-{{type}}" width="16" height="16"><use href="${sprite}#icon-arrow-{{type}}"></use></svg>` +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        `<svg class="tui-ico-{{type}} width="16" height="16"><use href="${sprite}#icon-arrow-{{type}}"></use></svg>` +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  return new Pagination(container, options);
}
