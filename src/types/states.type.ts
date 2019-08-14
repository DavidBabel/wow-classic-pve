import { RaidNames } from './database.type';

export type DisplayedRaids = {
  [raidName in RaidNames]: boolean;
};
