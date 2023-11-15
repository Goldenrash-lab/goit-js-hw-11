import axios from 'axios';

export class PicApi {
  static BASE_URL = 'https://pixabay.com';
  static API = '40670268-b3ad9432c00754cff3407f78c';
  static END_POINT = '/api/';
  static PER_PAGE = 40;
  constructor() {
    this.q = '';
    this.page = 1;
  }

  fetchPics() {
    const PARAMS = new URLSearchParams({
      key: PicApi.API,
      q: this.q,
      page: this.page,
      per_page: PicApi.PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    const url = `${PicApi.BASE_URL}${PicApi.END_POINT}?${PARAMS}`;
    console.log(url);
    return axios.get(url).then(res => res.data);
  }
}
