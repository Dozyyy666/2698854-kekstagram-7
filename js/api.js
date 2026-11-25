// Модуль отвечает за взаимодействие с удалённым сервером через fetch

// Базовый адрес сервера
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

// Функция получения данных с сервера
// Возвращает Promise с массивом фотографий
const getData = async () => {
  const response = await fetch(`${BASE_URL}/data`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки данных: ${response.status}`);
  }

  return await response.json();
};

// Функция отправки данных на сервер
const sendData = async (body) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: body,
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки данных: ${response.status}`);
  }
};

export { getData, sendData };
