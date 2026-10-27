const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

//Cоздание одного DOM элемента фотографии
const createPictureElement = ({ url, description, likes, comments }) => {
  // Клонируем содержимое шаблона <template id="picture">
  const pictureElement = pictureTemplate.cloneNode(true);

  //находим элементы внутри клона
  const img = pictureElement.querySelector('.picture__img');
  const likesBlock = pictureElement.querySelector('.picture__likes');
  const commentsBlock = pictureElement.querySelector('.picture__comments');

  img.src = url;
  img.alt = description;
  likesBlock.textContent = likes;
  commentsBlock.textContent = comments.length;

  return pictureElement;
};

// Функция для отрисовки всех фотографий
const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
