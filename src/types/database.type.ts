export type DownDate = string | boolean;

export type Faction = 'horde' | 'alliance';

export interface Database {
  [server: string]: Guild;
}

export interface Guild {
  cleanName: string;
  faction: Faction;
  gm: string;
  discord: string;
  site: string;
  instances: {
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
  };
}
