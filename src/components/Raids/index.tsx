import React from 'react';
import { RaidNames, Server, Guild } from '../../types/database.type';
import { Case } from '../Case/index';
import styles from './styles.module.scss';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ModalAddKill } from '../ModalAddKill';
import { deepClone } from '../../utils/object';

// TODO facto modal styles
// TODO replace modal by dialog
function getModalStyle() {
  const top = 30;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4)
    }
  })
);

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

function hasNoDown(g: Guild) {
  return Object.keys(g.raids).reduce(
    (bool: boolean, nextRaid: any) =>
      bool ||
      Object.keys((g.raids as any)[nextRaid]).reduce(
        (bool2: boolean, nextBoss: string) =>
          bool2 || Boolean((g.raids as any)[nextRaid][nextBoss]),
        false
      ),
    false
  );
}

interface Props {
  showEmptyGuilds: boolean;
  currentServer: Server;
  currentServerName: string;
  displayedGuilds: string[];
  displayedRaids: RaidNames[];
}

export function Raids({
  currentServer,
  currentServerName,
  displayedGuilds,
  displayedRaids,
  showEmptyGuilds
}: Props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [currentGuildName, setCurrentGuildName] = React.useState('');
  const [currentRaidName, setCurrentRaidName] = React.useState<RaidNames>();
  const [currentBossName, setCurrentBossName] = React.useState('');

  const unsortedRawGuilds: Guild[] = Object.keys(currentServer.guilds).reduce(
    (stack: Guild[], next: string) => {
      stack.push(currentServer.guilds[next]);
      return stack;
    },
    []
  );
  const unsortedGuilds = showEmptyGuilds
    ? unsortedRawGuilds
    : unsortedRawGuilds.filter(hasNoDown);
  const sortedGuilds = sortGuilds(unsortedGuilds);

  if (!sortedGuilds[0]) {
    return (
      // <Modal open={true}>
      <div style={modalStyle} className={classes.paper}>
        Please create your first guild for this server, open the menu to do so.
      </div>
      // </Modal>
    );
  }
  const reversedDisplayedRaids = deepClone(displayedRaids).reverse();
  return (
    <div className={styles.Raids}>
      {reversedDisplayedRaids.map((raidName: RaidNames) => {
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
                        onClick={() => {
                          if (bossValue) return;
                          setCurrentGuildName(g.infos.cleanName);
                          setCurrentRaidName(raidName);
                          setCurrentBossName(b);
                          setModalOpen(true);
                        }}
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
        {sortedGuilds
          .filter(g => displayedGuilds.includes(g.infos.cleanName))
          .map(g => (
            <div>{g.infos.cleanName}</div>
          ))}
      </div>
      <ModalAddKill
        serverInfos={currentServer}
        serverName={currentServerName}
        guildName={currentGuildName}
        raidName={currentRaidName!}
        bossName={currentBossName}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
