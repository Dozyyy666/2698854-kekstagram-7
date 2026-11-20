// Модуль отвечает за редактирование изображения:
// масштабирование и применение эффектов через noUiSlider

//Элементы управления масштабом
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

//Элементы управления эффектами
const effectRadios = document.querySelectorAll('.effects__radio');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

//Константы
const SCALE_STEP = 25;        // Шаг изменения масштаба
const SCALE_MIN = 25;         // Минимальный масштаб
const SCALE_MAX = 100;        // Максимальный масштаб
const SCALE_DEFAULT = 100;    // Масштаб по умолчанию

//Конфигурация эффектов
// Каждый эффект: минимальное значение, максимальное, шаг, функция применения CSS
const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    apply: () => {
      previewImage.style.filter = 'none';
    },
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    apply: (value) => {
      previewImage.style.filter = `grayscale(${value})`;
    },
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    apply: (value) => {
      previewImage.style.filter = `sepia(${value})`;
    },
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    apply: (value) => {
      previewImage.style.filter = `invert(${value}%)`;
    },
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    apply: (value) => {
      previewImage.style.filter = `blur(${value}px)`;
    },
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    apply: (value) => {
      previewImage.style.filter = `brightness(${value})`;
    },
  },
};

//Масштабирование

// Обновить отображение масштаба и применить CSS
const updateScale = (value) => {
  scaleValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

// Уменьшить масштаб
const decreaseScale = () => {
  const current = parseInt(scaleValue.value, 10);
  if (current > SCALE_MIN) {
    updateScale(current - SCALE_STEP);
  }
};

// Увеличить масштаб
const increaseScale = () => {
  const current = parseInt(scaleValue.value, 10);
  if (current < SCALE_MAX) {
    updateScale(current + SCALE_STEP);
  }
};

//Эффекты

// Инициализация слайдера noUiSlider
const initSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  // При изменении слайдера обновляем значение и применяем эффект
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    effectLevelValue.value = value;
    applyCurrentEffect(value);
  });
};

// Применить текущий выбранный эффект с заданным значением
const applyCurrentEffect = (value) => {
  const activeEffect = document.querySelector('.effects__radio:checked').value;
  const effect = EFFECTS[activeEffect];
  effect.apply(value);
};

// Обновить настройки слайдера под выбранный эффект
const updateSliderForEffect = (effectName) => {
  const effect = EFFECTS[effectName];

  // Если выбран "Оригинал" (none) — прячем слайдер
  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = 'none';
    return;
  }

  // Показываем слайдер
  effectLevelContainer.classList.remove('hidden');

  // Обновляем диапазон слайдера под текущий эффект
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    start: effect.max, // Сбрасываем на максимальное значение
  });

  // Обновляем скрытое поле
  effectLevelValue.value = effect.max;

  // Применяем эффект
  effect.apply(effect.max);
};

// === Обработчики событий ===

// Масштаб
scaleSmaller.addEventListener('click', decreaseScale);
scaleBigger.addEventListener('click', increaseScale);

// Эффекты: при переключении радио-кнопки
effectRadios.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    updateSliderForEffect(event.target.value);
  });
});

//Инициализация
initSlider();

// Экспортируем функцию сброса (надо при закрытии формы)
const resetEditor = () => {
  updateScale(SCALE_DEFAULT);
  document.querySelector('#effect-none').checked = true;
  updateSliderForEffect('none');
};

export { resetEditor };
