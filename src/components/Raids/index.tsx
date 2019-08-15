import React from 'react';
import { RaidNames, Server, Guilds, Guild } from '../../types/database.type';
import { Case } from '../Case/index';
import styles from './styles.module.scss';

interface Props {
  currentServer: Server;
  displayedGuilds: string[];
  displayedRaids: RaidNames[];
}

function sortGuilds(unsortedGuilds: Guild[]) {
  return unsortedGuilds.sort((a: any, b: any) => {
    const raidKeys = Object.keys(a.raids).reverse();

    for (let i = 0; i < raidKeys.length; i++) {
      const raidA = a.raids[raidKeys[i]];
      const raidB = b.raids[raidKeys[i]];
      const bossKeys = Object.keys(raidA).reverse();
      for (let j = 0; j < bossKeys.length; j++) {
        const currentBossA = raidA[bossKeys[j]] || '9999-99-99';
        const currentBossB = raidB[bossKeys[j]] || '9999-99-99';

        if (currentBossA > currentBossB) {
          return 1;
        }
        if (currentBossA < currentBossB) {
          return -1;
        }
      }
    }
    return 0;
  });
}

export function Raids({
  currentServer,
  displayedGuilds,
  displayedRaids
}: Props) {
  const unsortedGuilds: Guild[] = Object.keys(currentServer.guilds).reduce(
    (stack: Guild[], next: string) => {
      stack.push(currentServer.guilds[next]);
      return stack;
    },
    []
  );
  const sortedGuilds = sortGuilds(unsortedGuilds);

  return (
    <div className={styles.Raids}>
      {displayedRaids.reverse().map((raidName: RaidNames) => {
        if (!sortedGuilds[0]) {
          return '';
        }
        const bosses = Object.keys(sortedGuilds[0].raids[raidName]);
        const foundFirsts = bosses.reduce((stack: any, next) => {
          stack[next] = {
            horde: false,
            alliance: false
          };
          return stack;
        }, {});

        return (
          <div className={styles.raidBlock}>
            {bosses.reverse().map((b: string) => (
              <div className={styles.bossLine}>
                <div className={styles.bossName}>{b}</div>
                {sortedGuilds
                  .map(g => {
                    const bossValue = (g.raids[raidName] as any)[b];
                    const faction = g.infos.faction;
                    const isFirstServer =
                      bossValue &&
                      foundFirsts[b].horde === false &&
                      foundFirsts[b].alliance === false;
                    const isFirstFaction =
                      bossValue && foundFirsts[b][faction] === false;
                    if (isFirstServer) {
                      foundFirsts[b][faction] = true;
                    } else if (isFirstFaction) {
                      foundFirsts[b][faction] = true;
                    }
                    if (!displayedGuilds.includes(g.infos.cleanName)) {
                      return null;
                    }
                    return (
                      <Case
                        faction={g.infos.faction}
                        date={bossValue}
                        isFirst={isFirstFaction}
                        isServerFirst={isFirstServer}
                      />
                    );
                  })
                  .filter(x => x)}
              </div>
            ))}
          </div>
        );
      })}
      <div className={styles.guildNames}>
        {sortedGuilds.map((g, index) => (
          <div>{g.infos.cleanName}</div>
        ))}
      </div>
    </div>
  );
}
