import _ from 'lodash';

export const padStart = (val, count) => {
  return _.padStart(`${val}`, count, '0');
};

export const levelToString = (level) => {
  switch (level) {
    case 1:
      return 'DEBUG';
    case 2:
      return 'INFO';
    case 4:
      return 'WARN';
    case 8:
      return 'ERROR';
    case 16:
      return 'FATAL';
    default:
      return '?????';
  }
};
