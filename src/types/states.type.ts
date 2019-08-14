import { RaidNames, Faction } from './database.type';

export type DisplayedRaids = {
  [raidName in RaidNames]: boolean;
};

export type DisplayedFactions = {
  [faction in Faction]: boolean;
};
