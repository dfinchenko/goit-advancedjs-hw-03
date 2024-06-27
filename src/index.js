import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  title: document.querySelector('.animate__animated'),
};

function showElement(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
}

refs.title.classList.add('animate__animated', 'animate__zoomInDown');

refs.title.addEventListener('animationend', () => {
  searchCats();
});

showElement(refs.breedSelect, false);
showElement(refs.loader, true);

async function onSelectCats() {
  try {
    showElement(refs.loader, true);
    showElement(refs.catInfo, false);
    const catId = refs.breedSelect.value;
    const data = await fetchCatByBreed(catId);
    markupCats(data);
  } catch (error) {
    iziToast.show({
      position: 'topRight',
      message: 'Oops! Something went wrong! Try reloading the page!',
    });
  }
  showElement(refs.loader, false);
}

function markupCats(data) {
  const imgCats = data[0].url;
  const infoCats = data[0].breeds[0];
  const cat = `<div class="card">
  <img class="img" src="${imgCats}" alt="${infoCats.name}"/>
      <div class="info">
        <h2 class="name">${infoCats.name}</h2>
        <p><span class="description">Description: </span> ${infoCats.description}</p>
        <p><span class="temperament">Temperament: </span> ${infoCats.temperament}</p>   
       </div>
</div>`;

  refs.catInfo.innerHTML = cat;
  showElement(refs.catInfo, true);
}

async function searchCats() {
  try {
    const breeds = await fetchBreeds();
    const options = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    refs.breedSelect.innerHTML = options;
    showElement(refs.breedSelect, true);
    refs.breedSelect.addEventListener('change', onSelectCats);
  } catch (error) {
    iziToast.show({
      position: 'topRight',
      message: 'Oops! Something went wrong! Try reloading the page!',
    });
  }
  showElement(refs.loader, false);
}
