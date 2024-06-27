import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_XaDOlWdJOSUjjdvdR99bU6UBO5wwUvUP0vR0gjPrtVs2YssEWHnbGu1nmo6OGOG0';

export async function fetchBreeds() {
  return await axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(res => res.data);
}

export async function fetchCatByBreed(breedId) {
  return await axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
}
