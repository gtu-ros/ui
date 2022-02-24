import { parse } from 'papaparse';

export const loadCsv = async (file) => {
  return fetch(file)
    .then((r) => r.text())
    .then((text) => {
      const { data } = parse(text, { header: true });
      const rowsFromCsv = data.map((row, id) => ({ id, ...row }));
      return rowsFromCsv;
    });
};
