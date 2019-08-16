import { RaidNames } from '../types/database.type';

export const cleanRaidTitles: { [raidName in RaidNames]: string } = {
  wb: 'World Bosses',
  drakes: 'Emerald Dragons',
  mc: 'Molten Core',
  ony: "Onyxia's Lair",
  bwl: 'Blackwing Lair',
  zg: "Zul'Gurub",
  aq20: "Ahn'Qiraj Ruins",
  aq40: "Ahn'Qiraj Temple",
  naxx: 'Naxxramas'
};
