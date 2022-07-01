import Dexie from 'dexie';
import { PLUGIN_KEYS } from '../constants';

export const db = new Dexie('gturover-db');
db.version(1).stores({
  [PLUGIN_KEYS.ZED_IMAGE]: '++id, message',
  [PLUGIN_KEYS.ROSOUT]: '++id, message'
});
