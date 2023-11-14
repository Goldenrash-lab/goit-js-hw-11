import { PicApi } from './API';

const refs = {
  formEl: document.querySelector('#search-form'),
};

refs.formEl.addEventListener('submit', onFormElSubmit);

const picApi = new PicApi();

function onFormElSubmit(e) {
  e.preventDefault();

  const userValue = e.target.elements.searchQuery.value;

  picApi.q = userValue;
  picApi.page = 1;

  picApi.fetchPics().then(res => {
    return console.log(res.hits);
  });
}
