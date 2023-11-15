import { PicApi } from './API';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  btnEl: document.querySelector('.load-more'),
};

let lightbox = null;
const picApi = new PicApi();
refs.formEl.addEventListener('submit', onFormElSubmit);
refs.btnEl.addEventListener('click', onBtnElClick);
refs.btnEl.classList.add('visually-hidden');

function onBtnElClick() {
  picApi.page++;

  picApi
    .fetchPics()
    .then(res => {
      if (res.hits.length === 0) {
        refs.btnEl.classList.add('visually-hidden');
        throw "We're sorry, but you've reached the end of search results.";
      }
      const markup = createTemplates(res.hits).join('');

      refs.galleryEl.insertAdjacentHTML('beforeend', markup);

      lightbox.refresh();

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(err => {
      Notiflix.Notify.warning(err);
    });
}

function onFormElSubmit(e) {
  e.preventDefault();
  refs.btnEl.classList.add('visually-hidden');

  const userValue = e.target.elements.searchQuery.value;

  picApi.q = userValue;
  picApi.page = 1;

  picApi
    .fetchPics()
    .then(res => {
      if (res.hits.length === 0) {
        throw 'Sorry, there are no images matching your search query. Please try again.';
      }
      Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
      renderPics(res.hits);
      lightbox = new SimpleLightbox('.gallery a');
      refs.btnEl.classList.remove('visually-hidden');
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
    });
}

function createTemplates(pics) {
  return pics.map(el => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = el;
    return `<a href="${largeImageURL}"><div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${downloads}</span>
              </p>
            </div>
          </div></a>`;
  });
}

function renderPics(pics) {
  const markup = createTemplates(pics).join('');
  refs.galleryEl.innerHTML = markup;
}
