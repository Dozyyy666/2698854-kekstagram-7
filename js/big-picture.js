// Модуль отвечает за отображение полноразмерного окна фотографии
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

//шаблон одного комментария из HTML
const commentTemplate = document.querySelector('#social__comment').content;

const COMMENTS_PER_PAGE = 5;
let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);
  const img = commentElement.querySelector('.social__picture');
  const text = commentElement.querySelector('.social__text');

  //заполнить данные комментария
  img.src = avatar;
  img.alt = name;
  text.textContent = message;

  return commentElement;
};

//очищает контейнер комментариев перед новой отрисовкой
const clearComments = () => {
  socialComments.innerHTML = '';
};

const updateCommentCounter = () => {
  const shownSpan = socialCommentCount.querySelector('.social__comment-shown');
  const totalSpan = socialCommentCount.querySelector('.comments-count');
  shownSpan.textContent = shownCommentsCount;
  totalSpan.textContent = currentComments.length;
};

const renderNextComments = () => {
  const endIndex = Math.min(shownCommentsCount + COMMENTS_PER_PAGE, currentComments.length);
  const fragment = document.createDocumentFragment();

  for (let i = shownCommentsCount; i < endIndex; i++) {
    const commentElement = createCommentElement(currentComments[i]);
    fragment.appendChild(commentElement);
  }

  socialComments.appendChild(fragment);
  shownCommentsCount = endIndex;

  updateCommentCounter();

  // Если показали все комментарии - прячем кнопку
  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  currentComments = photo.comments;
  shownCommentsCount = 0;
  clearComments();
  renderNextComments();

  // Показываем счетчик и кнопку (просто удаляем hidden а не добавляем)
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');
};

//закрывает полноразмерное окно
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Обработчик клика по кнопке закрытия
closeButton.addEventListener('click', () => {
  closeBigPicture();
});

// Обработчик нажатия клавиши Escape для закрытия окна
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeBigPicture();
  }
});

commentsLoader.addEventListener('click', () => {
  renderNextComments();
});

export { openBigPicture };
