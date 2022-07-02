import * as R from 'ramda';
import { PLUGIN_KEYS } from '../../constants';
import { db } from '../../db';

const pipeWhileNotNil = R.pipeWith((f, res) => (R.isNil(res) ? res : f(res)));

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

