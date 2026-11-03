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

const renderComments = (comments) => {
  /*
  Функция отрисовывает все комментарии фотографии в контейнер
  Принимает массив объектов комментариев
  */
  clearComments();
  const fragment = document.createDocumentFragment();

  //каждый комментарий добавляется в фрагмент
  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
};

const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;

  socialCaption.textContent = photo.description;

  renderComments(photo.comments);

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

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

export { openBigPicture };
