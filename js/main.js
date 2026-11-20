// Точка входа в приложение
import { generatePhotos } from './util.js';
import { createGallery } from './gallery.js';
import './upload-form.js';
import './image-editor.js';

// Генерируем массив фотографий
const photos = generatePhotos();

// Создаём галерею с обработчиками клика
createGallery(photos);
