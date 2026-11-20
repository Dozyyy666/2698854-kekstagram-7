// Модуль отвечает за работу с формой загрузки изображения:
// открытие/закрытие, сброс полей и валидацию через Pristine
import { resetEditor } from './image-editor.js';

//элементы формы
const uploadForm = document.querySelector('.img-upload__form');// сама форма
const uploadInput = uploadForm.querySelector('.img-upload__input');// скрытый input[type=file]
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');// окно редактирования
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');// кнопка «Закрыть»
const hashtagsField = uploadForm.querySelector('.text__hashtags');// поле хэштегов
const descriptionField = uploadForm.querySelector('.text__description');// поле комментария

//Константы для валидации
const MAX_HASHTAGS_COUNT = 5;// нельзя больше 5 хэштегов
const MAX_COMMENT_LENGTH = 140;// максимальная длина комментария

//регулярка для валидации хэшТегов
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;


//Открытие формы: показываем окно и блокируем прокрутку страницы
const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

//закрытие: прячем окно, снимаем блокировку, сбрасываем форму
const closeUploadForm = () => {
  uploadForm.reset();
  uploadInput.value = '';
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Сбрасываем масштаб и эффекты
  resetEditor();
};

//Обработчик Esc для document
const onEscKeyDown = (event) => {
  // Закрываем форму только если она сейчас открыта
  if (event.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    closeUploadForm();
  }
};

//Если фокус в поле хэштегов или комментария то Esc не должен закрывать форму.
const blockEsc = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};


const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

//Каждый хэштег проходит регулярку
const validateHashtagFormat = (value) =>
  getHashtags(value).every((tag) => HASHTAG_REGEXP.test(tag));

//Не больше максимального количества тэгов
const validateHashtagCount = (value) =>
  getHashtags(value).length <= MAX_HASHTAGS_COUNT;

//Нет ли дубликатов? сравниваем без учета регистра
const validateHashtagUnique = (value) => {
  const tags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(tags).size === tags.length; // Set выбрасывает повторы
};

//Комментарий не длиннее 140 символов?
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

//инициализация pristine
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

//для каждой ошибки свое сообщение
pristine.addValidator(hashtagsField, validateHashtagFormat, 'Невалидный хэштег');
pristine.addValidator(hashtagsField, validateHashtagCount, `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`);
pristine.addValidator(hashtagsField, validateHashtagUnique, 'Хэштеги не должны повторяться');
pristine.addValidator(descriptionField, validateComment, `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`);

//ОБРАБОТЧИКИ СОБЫТИЙ

//открытие
uploadInput.addEventListener('change', openUploadForm);

//закрытие
uploadCancelButton.addEventListener('click', closeUploadForm);

//Esc висит на document постоянно и сам решает реагировать ли
document.addEventListener('keydown', onEscKeyDown);

//Попытка отправить форму
uploadForm.addEventListener('submit', (event) => {
  if (!pristine.validate()) {
    event.preventDefault();
  }
});

// Esc внутри полей ввода не закрывает форму
hashtagsField.addEventListener('keydown', blockEsc);
descriptionField.addEventListener('keydown', blockEsc);
