export type DownDate = string | boolean;

export type Faction = 'horde' | 'alliance';

export interface Database {
  [server: string]: Guild;
}
export interface GuildInfos {
  cleanName: string;
  faction: Faction;
  gm: string;
  discord: string;
  site: string;
}

export interface Raids {
  wb: {
    Azuregos: DownDate;
    Kazzak: DownDate;
  };
  mc: {
    Lucifron: DownDate;
    Magmadar: DownDate;
    Gehennas: DownDate;
    Garr: DownDate;
    Shazzrah: DownDate;
    'Baron Geddon': DownDate;
    'Sulfuron Harbinger': DownDate;
    'Golemagg the Incinerator': DownDate;
    'Majordomo Executus': DownDate;
    Ragnaros: DownDate;
  };
  ony: {
    Onyxia: DownDate;
  };
  bwl: {
    'Razorgore the Untamed': DownDate;
    'Vaelastrasz the Corrupt': DownDate;
    'Broodlord Lashlayer': DownDate;
    Firemaw: DownDate;
    Ebonroc: DownDate;
    Flamegor: DownDate;
    Chromaggus: DownDate;
    Nefarian: DownDate;
  };
  zg: {
    'High Priest Venoxis': DownDate;
    'Bloodlord Mandokir': DownDate;
    "Cache of Madness - Gri'lek": DownDate;
    "Cache of Madness - Hazza'rah": DownDate;
    'Cache of Madness - Renataki': DownDate;
    'Cache of Madness - Wushoolay': DownDate;
    'High Priestess Kilnara': DownDate;
    Zanzil: DownDate;
    "Jin'do the Godbreaker": DownDate;
  };
  aq20: {
    Kurinnaxx: DownDate;
    'General Rajaxx': DownDate;
    Moam: DownDate;
    'Buru the Gorger': DownDate;
    'Ayamiss the Hunter': DownDate;
    'Ossirian the Unscarred': DownDate;
  };
  aq40: {
    'The Prophet Skeram': DownDate;
    'Battleguard Sartura': DownDate;
    'Fankriss the Unyielding': DownDate;
    'Princess Huhuran': DownDate;
    'Silithid Royalty': DownDate;
    Viscidus: DownDate;
    'The Twin Emperors': DownDate;
    Ouro: DownDate;
    "C'thun": DownDate;
  };
  naxx: {
    "Anub'Rekhan": DownDate;
    'Grand Widow Faerlina': DownDate;
    Maexxna: DownDate;
    'Noth the Plaguebringer': DownDate;
    'Heigan the Unclean': DownDate;
    Loatheb: DownDate;
    'Instructor Razuvious': DownDate;
    'Gothik the Harvester': DownDate;
    'The Four Horsemen': DownDate;
    Patchwerk: DownDate;
    Grobbulus: DownDate;
    Gluth: DownDate;
    Thaddius: DownDate;
    Sapphiron: DownDate;
    "Kel'Thuzad": DownDate;
  };
}

export type RaidNames = keyof Raids;
export type BossWB = keyof Raids['wb'];
export type BossMC = keyof Raids['mc'];
export type BossOny = keyof Raids['ony'];
export type BossBwl = keyof Raids['bwl'];
export type BossZG = keyof Raids['zg'];
export type BossAQ20 = keyof Raids['aq20'];
export type BossAQ40 = keyof Raids['aq40'];
export type BossNaxx = keyof Raids['naxx'];

export interface Guild {
  infos: GuildInfos;
  raids: Raids;
}
