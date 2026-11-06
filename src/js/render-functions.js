/* Імпорт  SimpleLightbox*/
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
/* END */

/* Екземпляр SimpleLightbox */
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
/* END */

/* Функція створення галереї */
export function createGallery(images, gallery) {
  if (!gallery) {
    return;
  }
  const markup = images
    .map(
      image => `<li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <ul class="img-info">
            <li><h2>Likes</h2>
            <p>${image.likes}</p></li>
            <li><h2>Views</h2>
            <p>${image.views}</p></li>
            <li><h2>Comments</h2>
            <p>${image.comments}</p></li>
            <li><h2>Downloads</h2>
            <p>${image.downloads}</p></li>
          </ul>
        </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
/* END */

/* Функція очищення галереї */
export function clearGallery(gallery) {
  gallery.innerHTML = '';
}
/* END */

/* Функція появи loader */
export function showLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) {
    return;
  }
  loader.classList.remove('is-hidden');
}
/* END */

/* Функція зникнення loader */
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) {
    return;
  }
  loader.classList.add('is-hidden');
}
/* END */

/* Функції додавання/приховування кнопки "Load more" */
export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.btn-load-more');
  if (!loadMoreBtn) {
    return;
  }
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.btn-load-more');
  if (!loadMoreBtn) {
    return;
  }
  loadMoreBtn.classList.add('is-hidden');
}
/* END */

/* Функція скролу зображень */
export function scrollAfterClickLoadMore() {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) {
    return;
  }

  const galleryItemHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}
/* END */
