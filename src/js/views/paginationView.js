import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    // using event deligation
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      // if we are at first page, and there are other pages also
      return `${this._forwardButton(currPage)}`;
    }

    // Last Page
    if (currPage === numPages && numPages > 1) {
      // if current page is equal to no. of pages
      return `${this._backwardButton(currPage)}`;
    }

    // Other Page
    if (currPage < numPages) {
      return `${this._backwardButton(currPage)}
        ${this._forwardButton(currPage)}`;
    }

    // page 1, and there are NO other pages
    return '';
  }

  _forwardButton(currPage) {
    return `
    <button data-goto="${
      currPage + 1
    } " class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _backwardButton(currPage) {
    return `
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page  ${currPage - 1}</span>
        </button>
    `;
  }
}

export default new PaginationView();
