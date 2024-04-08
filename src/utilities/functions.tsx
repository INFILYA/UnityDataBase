import { TUserInfo } from "../types/Types";

export const later = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function getFromLocalStorage(name: string) {
  const value = localStorage.getItem(name);
  if (!value) return null;
  return JSON.parse(value);
}
export const firstLetterCapital = (word: string): string | undefined => {
  const splitted = word.split("");
  const first = splitted[0]?.toUpperCase();
  const rest = [...splitted];
  rest.splice(0, 1);
  const result = [first, ...rest].join("");
  return result;
};

export const styledComponentValidator = (boolean: boolean): string => {
  return boolean.toString();
};
export function compare<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
export function upgradeAge<T extends TUserInfo>(player: T): T {
  if (typeof player.birthday === "number") return player;
  const age1 = new Date().getTime();
  const age2 = Date.parse(player.birthday);
  const newAge = Math.floor((age1 - age2) / (1000 * 60 * 60 * 24 * 365));
  const newPlayer = { ...player, birthday: newAge };
  return newPlayer;
}

export function currentDate() {
  const date = new Date();
  // Получаем год, месяц и день
  const month = date.getMonth() + 1; // Месяц (от 0 до 11, поэтому добавляем 1)
  const day = date.getDate(); // День месяца (от 1 до 31)
  // Для форматирования чисел, чтобы добавить ведущий ноль, если число меньше 10
  function addLeadingZero(number: number): number | string {
    return number < 10 ? "0" + number : number;
  }
  // Форматирование в строку с форматом "год-месяц-день"
  const formattedDate = addLeadingZero(month) + "-" + addLeadingZero(day);
  return formattedDate;
}

export const checkUserEmail = (email: string) => {
  const doubleDots = email.match(/[.]{2,}/g);
  const startWithDot = email.match(/^[.]/);
  const nameAbuse = email.match(/^abuse[@]/);
  const namePostmaster = email.match(/^postmaster[@]/);
  const correctLength = email.match(/^.{1,30}[@]\w{2,}[.]\w{2,}$/);
  const specialSymbols = email.match(/[&=+<>,_'-\s]/g);
  if (doubleDots) return true;
  else if (startWithDot) return true;
  else if (nameAbuse) return true;
  else if (namePostmaster) return true;
  else if (!correctLength) return true;
  else if (specialSymbols) return true;
  else return false;
};

export const checkPhotoFormat = (photo: string | null | undefined) => {
  if (!photo || photo === null) return true;
  const jpg = photo.toLowerCase().match(/jpg/g);
  const png = photo.toLowerCase().match(/png/g);
  const jpeg = photo.toLowerCase().match(/jpeg/g);
  if (jpg || png || jpeg) return false;
  else return true;
};

export const emptyUser: TUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  team: "",
  position: "",
  hand: "",
  telephone: "",
  birthday: "",
  height: "",
  weight: "",
  number: "",
  reach: "",
  photo: "",
  highlights: false,
};
