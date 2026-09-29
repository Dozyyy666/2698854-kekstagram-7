import { DESCRIPTIONS, MESSAGES, NAMES } from './data.js';

function getRandomInteger(min, max) {
  /* Целое число из диапазона [min, max] включительно */
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  /* Случайный элемент массива */
  return array[getRandomInteger(0, array.length - 1)];
}

function createIdGenerator(min = 1, max = 1000000) {
  /* Замыкание: возвращает функцию, выдающую уникальные id */
  const used = new Set();

  return function () {
    let id;
    do {
      id = getRandomInteger(min, max);
    } while (used.has(id));

    used.add(id);
    return id;
  };
}

function getRandomMessage(messages) {
  /*генерация сообщения и комментария*/
  const count = getRandomInteger(1, 2); // 1 или 2 предложения
  let message = '';

  for (let i = 0; i < count; i++) {
    message += (i > 0 ? ' ' : '') + getRandomArrayElement(messages);
  }

  return message;
}

const nextCommentId = createIdGenerator();

function createComment() {
  /*Генерация обьекта комментария */
  return {
    id: nextCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomMessage(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function createPhoto(photoId) {
  /*Генерация фото */
  const commentCount = getRandomInteger(0, 30);
  const comments = [];

  for (let i = 0; i < commentCount; i++) {
    comments.push(createComment());
  }

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: comments,
  };
}

function generatePhotos() {
  const PHOTOS_COUNT = 25;
  const photos = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
}

export { generatePhotos };
