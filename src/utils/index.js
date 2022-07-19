import * as R from 'ramda';

const log = R.tap(console.log);

export const pipeWhileNotNil = R.pipeWith((f, res) =>
  R.isNil(res) ? res : f(res)
);

export const setLocalStorage = (key) => (value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorageOr = (defaultValue) =>
  R.tryCatch(
    R.pipe((x) => localStorage.getItem(x), JSON.parse, log),
    R.always(defaultValue)
  );

export const offsetDate = (secs) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + secs);
  return date;
};
