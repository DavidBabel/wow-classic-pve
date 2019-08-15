import { RaidNames } from '../types/database.type';

export const cleanRaidTitles: { [raidName in RaidNames]: string } = {
  wb: 'World Bosses',
  drakes: 'Emerald Dragons',
  mc: 'Molten Core',
  ony: 'Onyxia Lair',
  bwl: 'Blackwing Lair',
  zg: 'Zul Gurub',
  aq20: 'Ahn Quiraj 20',
  aq40: 'Ahn Quiraj 40',
  naxx: 'Naxxramas'
};
