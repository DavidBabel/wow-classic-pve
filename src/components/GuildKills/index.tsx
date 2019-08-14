import React from 'react';
import { Guild, RaidNames } from '../../types/database.type';
import {
  Case,
  FirstServerCase,
  FirstHordeCase,
  FirstAllianceCase,
  EmptyCase,
  KillAllianceCase,
  KillHordeCase
} from '../Case/index';

interface Props {
  detail: Guild;
  displayedRaids: RaidNames[];
}

export function GuildKills({
  detail: { infos, raids },
  displayedRaids
}: Props) {
  const raidNames: RaidNames[] = Object.keys(raids) as RaidNames[];
  const getBosses = (raidName: RaidNames) => {
    const bosses = Object.keys(raids[raidName]);
    return bosses
      .reverse()
      .map((boss: string) => (
        <Case faction={infos.faction} date={(raids[raidName] as any)[boss]} />
      ));
  };
  return (
    <div>
      {infos.cleanName}
      {raidNames
        .filter(raidName => displayedRaids.includes(raidName))
        .reverse()
        .map(getBosses)}
    </div>
  );
}
