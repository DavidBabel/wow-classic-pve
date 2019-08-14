import React from 'react';
import { Guild, RaidNames } from '../../types/database.type';
import { Case } from '../Case/index';
import styles from './styles.module.scss';

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
    return (
      <div className={styles.bossBox}>
        {bosses.reverse().map((boss: string) => (
          <Case faction={infos.faction} date={(raids[raidName] as any)[boss]} />
        ))}
      </div>
    );
  };
  return (
    <div className={styles.GuildKills}>
      {/* {infos.cleanName} */}
      {raidNames
        .filter(raidName => displayedRaids.includes(raidName))
        .reverse()
        .map(getBosses)}
    </div>
  );
}
