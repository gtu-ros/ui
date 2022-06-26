import { mapValues } from 'lodash/fp';

const publicPath = 'maps';

const makePath = (area) => mapValues((m) => `/${publicPath}/${area}/${m}`);

const arcMaps = {
  annoted: 'annoted.png',
  lengths: 'len.png',
  raw: 'raw.png'
};

export const arcMapPaths = makePath('arc21')(arcMaps);
