/*Імпорт iziToast*/
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
/* END*/

/* Імпорт функцій */
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollAfterClickLoadMore,
} from './js/render-functions.js';
/* END */

/* Змінні */
const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');
let currentSearchQuery = '';
let page = 1;
/* END */

/* Функція завантаження зображень */
async function loadImages(searchQuery, page) {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return false;
    }
    createGallery(data.hits, gallery);
    const totalPages = page * 15;
    if (totalPages < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    return true;
  } catch (error) {
    console.error(error);

    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return false;
  } finally {
    hideLoader();
  }
}
/* END */

/* Подія Submit на форму*/
form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const searchText = formData.get('search-text').trim();
  if (!searchText) {
    return;
  }
  currentSearchQuery = searchText;
  page = 1;
  clearGallery(gallery);
  loadImages(currentSearchQuery, page);
});
/* END */

/* Подія Click на кнопку */
loadMoreBtn.addEventListener('click', async () => {
  const previousPage = page;
  page += 1;

  const isSuccess = await loadImages(currentSearchQuery, page);

  if (!isSuccess) {
    page = previousPage;
    showLoadMoreButton();
    return;
  }
  scrollAfterClickLoadMore();
});
/* END */
