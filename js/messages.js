// Модуль отвечает за показ и скрытие сообщений об успехе/ошибке

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

// Универсальная функция показа сообщения
const showMessage = (template, buttonSelector) => {
  const messageElement = template.cloneNode(true);

  const messageBlock = messageElement.firstElementChild; // <section class="error"> или <section class="success">
  const closeButton = messageBlock.querySelector(buttonSelector);

  document.body.appendChild(messageElement);

  // Функция закрытия сообщения
  const closeMessage = () => {
    messageBlock.remove();
    document.removeEventListener('keydown', onEscKey);
    document.removeEventListener('click', onOutsideClick);
  };

  closeButton.addEventListener('click', closeMessage);

  const onEscKey = (event) => {
    if (event.key === 'Escape') {
      closeMessage();
    }
  };
  document.addEventListener('keydown', onEscKey);

  const onOutsideClick = (event) => {
    if (!messageBlock.contains(event.target)) {
      closeMessage();
    }
  };
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button'); //успех
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__button');//ошибка
};

export { showSuccessMessage, showErrorMessage };
