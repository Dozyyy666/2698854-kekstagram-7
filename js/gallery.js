// Модуль-связка: создаёт галерею миниатюр и обрабатывает клики по ним
import { renderPictures } from './render-pictures.js';
import { openBigPicture } from './big-picture.js';

// Функция создаёт галерею и навешивает обработчики клика на миниатюры
// Принимает массив объектов фотографий
const createGallery = (photos) => {

  renderPictures(photos);

  const pictureElements = document.querySelectorAll('.picture');

  // Для каждой миниатюры добавляем обработчик клика
  pictureElements.forEach((pictureElement, index) => {
    pictureElement.addEventListener('click', (event) => {
      event.preventDefault();
      openBigPicture(photos[index]);
    });
  });
};

export { createGallery };
