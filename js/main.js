// main.js
import { getData } from './api.js';
import { showErrorMessage } from './messages.js';
import { renderPictures } from './render-pictures.js';
import { initGallery } from './gallery.js';
import './upload-form.js';
import './image-editor.js';

// Функция загрузки и инициализации приложения
const initApp = async () => {
  try {
    // получаем данные с сервера
    const photos = await getData();

    // Отрисовываем миниатюры
    renderPictures(photos);

    //обработчики клика для открытия полноразмерного режима
    initGallery(photos);

  } catch (error) {
    showErrorMessage();
  }
};

// Запускаем приложение
initApp();
