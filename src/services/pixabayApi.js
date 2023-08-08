import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36838300-77c7aeea1adf4ea7a8fafc62b';
export const ITEMS_PER_PAGE = 12;

export async function getSearchImages({ value, page = 1 }) {
  const options = {
    params: {
      key: API_KEY,
      q: value,
      page,
      per_page: ITEMS_PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  const { data, status } = await axios.get(`${BASE_URL}`, options);
  if (status === 200 && data?.hits?.length > 0) return data;
  return Promise.reject(
    new Error(
      `Sorry, there are no images matching your query "${value}". Please try again.`
    )
  );
}

const api = {
  getSearchImages,
};

export default api;
