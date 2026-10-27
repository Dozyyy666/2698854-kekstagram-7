import { generatePhotos } from './util.js';
import { renderPictures } from './render-pictures.js';

const photos = generatePhotos();

renderPictures(photos);
