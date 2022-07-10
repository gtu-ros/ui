import { mapValues } from 'lodash/fp';

const publicPath = 'maps';

const makePath = (area) => mapValues((m) => `/${publicPath}/${area}/${m}`);

const marsField = {
  annoted: 'annoted.png',
  lengths: 'len.png',
  raw: 'raw.png'
};

export const marsFieldPath = makePath('arc22')(marsField);
