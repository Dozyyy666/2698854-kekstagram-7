function getRandomInteger(min, max){
  /*генератор рандомных чисел из диапазона*/
  return Math.floor(Math.random() * (max - min + 1))  + min;
}

function createIdGenerator() {
  const used = new Set();

  return function () {
    let id;
    do {
      id = getRandomInteger(1, 25);
    } while (used.has(id));

    used.add(id);
    return id;
  };
}

function getRandomArrayElement(array){
  /* Возвращает рандомный элемент массива*/
  return array[getRandomInteger(0, array.length - 1)];
}

const DESCRIPTIONS = [
  'Мой новый закат на берегу моря.',
  'Прогулка по осеннему парку.',
  'Вкусный завтрак в любимом кафе.',
  'Встреча с друзьями после долгой разлуки.',
  'Горные вершины на рассвете.',
  'Уютный вечер с книгой и чаем.',
  'Пушистый любимец греется на солнце.',
  'Чевепчес капитальный',
  'Городские огни ночью.',
  'Пикник на природе в тёплый день.'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём', 'Кирилл',
  'Саша', 'Петя',
  'Катя', 'Анна',
  'Мария','Сергей',
  'Федя'
];

function getRandomMessage (messages){
  let message = '';
  for (let i = 0; i < getRandomInteger(1,2); i++){
    message += (i > 0 ? ' ' : '') + messages[getRandomInteger(0, messages.length - 1)];
  }
  return message;
}

const nextCommentId = createIdGenerator();

function createComment(){
  /* Создает 1 обьект комментария*/
  return {
    id: nextCommentId(),
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getRandomMessage(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function createPhoto(photoId){
  /* Создает 1 обьект фото*/
  const commentCount = getRandomInteger(0,30);
  const comments = [];

  for (let i = 0; i < commentCount; i++){
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
  /* Создает фотографии*/
  const PHOTOS_COUNT = 25;
  const _photos = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++){
    _photos.push(createPhoto(i));
  }
  return _photos;
}

const photos = generatePhotos();
