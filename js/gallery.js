import { openBigPicture } from './big-picture.js';

// Функция инициализирует галерею и настраивает делегирование событий
const initGallery = (photos) => {
  const picturesContainer = document.querySelector('.pictures');

  //один обработчик на весь контейнер с миниатюрами
  picturesContainer.addEventListener('click', (event) => {
    const pictureElement = event.target.closest('.picture');

    if (!pictureElement) {
      return;
    }

    event.preventDefault();

    const allPictures = Array.from(picturesContainer.querySelectorAll('.picture'));
    const index = allPictures.indexOf(pictureElement);
    if (photos[index]) {
      openBigPicture(photos[index]);
    }
  });
};

export { initGallery };
