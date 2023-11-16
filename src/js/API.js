import axios from 'axios';

const axiosV2 = axios.create({
  baseURL: 'https://pixabay.com',
});

export class PicApi {
  // static BASE_URL = 'https://pixabay.com';
  static API = '40670268-b3ad9432c00754cff3407f78c';
  static END_POINT = '/api/';
  static PER_PAGE = 40;
  constructor() {
    this.q = '';
    this.page = 1;
  }

  async fetchPics() {
    const PARAMS = new URLSearchParams({
      key: PicApi.API,
      q: this.q,
      page: this.page,
      per_page: PicApi.PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const url = `${PicApi.END_POINT}?${PARAMS}`;
    const res = await axiosV2.get(url);
    return res.data;
  }
}
