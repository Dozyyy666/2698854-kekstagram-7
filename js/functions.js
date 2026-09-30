function isStringLengthValid(str, number){
  /*
  Принимает на вход строку и число, выводит true если длина полученной строки
  меньше или равна указанной длине, иначе false
  */
  return str.length <= number;
}

function isPalindrome (str){
  /*
  Принимет на вход строку, обрезает пробелы, приводит к одному регистру и проверяет, является ли строка палиндромом
  */
  const processedString = str.replaceAll(' ').toLowerCase();
  const reversedString = processedString.split('').reverse().join('');
  return processedString === reversedString;
}

function extractDigits(str){
  /*
  Принимет на вход строку, ищет в ней числа и выводит в типе Number
  */

  let digits = '';
  for (const char of str){
    if (char >= '0' && char <= '9'){
      digits += char;
    }
  }
  return digits === '' ? NaN : Number(digits);
}

function toMinutes(timeStr) {
  //переводит в минуты
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function checkMeeting (startWork, endWork, startMeeting, duration){
  // переводим время в минуты
  const workStartMin = toMinutes(startWork);
  const workEndMin = toMinutes(endWork);
  const meetingStartMin = toMinutes(startMeeting);

  //время окончания встречи
  const meetingEndMin = meetingStartMin + duration;

  return meetingStartMin >= workStartMin && meetingEndMin <= workEndMin;
}

