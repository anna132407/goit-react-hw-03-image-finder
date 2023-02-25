import axios from 'axios';

const API_KEY = '32931258-e5eb2d5c2d9c5c13ed4d71b3b';
const BASE_URL = 'https://pixabay.com/api/';
const params = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const fetchPhotosByKeyWord = async (query, pageNumber) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${query}&key=${API_KEY}&${params}&page=${pageNumber}`
  );

  return data;
};
