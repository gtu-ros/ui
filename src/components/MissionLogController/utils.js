import * as R from 'ramda';
import { PLUGIN_KEYS } from '../../constants';
import { db } from '../../db';
import { pipeWhileNotNil } from '../../utils';

const getLast = (key) => db[key]?.orderBy('secs').last();
const getFirst = (key) => db[key]?.orderBy('secs').first();
const getCount = (key) => db[key]?.count();

const promiseAll = (getFn) =>
  pipeWhileNotNil([R.map(getFn), (ps) => Promise.all(ps)]);

const lasts = promiseAll(getLast);
const firsts = promiseAll(getFirst);
const counts = promiseAll(getCount);

const secs = R.map(R.prop('secs'));

const maxSec = R.pipe(secs, R.reduce(R.max, 0));
const minSec = R.pipe(secs, R.reduce(R.min, Infinity));

const lastEntries = lasts(Object.values(PLUGIN_KEYS));
const firstEntries = firsts(Object.values(PLUGIN_KEYS));
const pluginCounts = counts(Object.values(PLUGIN_KEYS));

export const getLastSec = () => lastEntries.then(maxSec);

export const getFirstSec = () => firstEntries.then(minSec);

export const getMaxCount = () => pluginCounts.then(R.reduce(R.max, 0));

export const getStats = async () => {
  const toDate = (secs) => new Date(secs * 1000);
  const first = await getFirstSec();
  const last = await getLastSec();
  const count = await getMaxCount();
  return { first: toDate(first), last: toDate(last), count };
};

export const getSecs = () => R.pipe(
  R.map((key) => db[key]),
  R.filter((x) => x),
  R.map(async (p) => await p.orderBy('secs').keys()),
  x => Promise.all(x),
  R.andThen(
    R.pipe(
      R.flatten, 
      R.uniq,
      xs => xs.sort()
    )
  ),
)(Object.values(PLUGIN_KEYS));
