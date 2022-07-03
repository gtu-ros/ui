import Dexie from 'dexie';
import {
  importDB,
  exportDB,
  importInto,
  peakImportFile
} from 'dexie-export-import';
import { PLUGIN_KEYS } from '../constants';
import download from 'downloadjs';

export let db = new Dexie('gturover-db');

export const LIMIT = 60;

const dbStructure = {
  [PLUGIN_KEYS.ZED_IMAGE]: '++id, secs',
  [PLUGIN_KEYS.ROSOUT]: '++id, secs',
  [PLUGIN_KEYS.ORIENTATION]: '++id, secs'
};

const KEYS = Object.keys(dbStructure);

const getAll = () => KEYS.map((key) => db[key]);

db.version(1).stores(dbStructure);

export const resetDatabase = () => {
  return db.transaction('rw', ...getAll(), async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
};

export const exportDatabase = async () => {
  const blob = await exportDB(db, { prettyJson: true });
  download(blob, `gturover-db-${+new Date()}.json`, 'application/json');
};

export const importDatabase = async (file) => {
  // const file = ev.dataTransfer.files[0];
  await db.delete();
  db = await importDB(file);
};
