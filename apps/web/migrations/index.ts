import * as migration_20260701_154549_initial from './20260701_154549_initial';

export const migrations = [
  {
    up: migration_20260701_154549_initial.up,
    down: migration_20260701_154549_initial.down,
    name: '20260701_154549_initial'
  },
];
