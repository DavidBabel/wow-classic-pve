import React, { useState } from 'react';

import rawDB from '../generatedDatabase.json';
import { Database, Faction, RaidNames } from '../types/database.type';
import ServerSelect from './ServerSelect/index';
import { GuildKills } from './GuildKills/index';
import { Checkbox } from './Checkbox/index';
import { DisplayedRaids, DisplayedFactions } from '../types/states.type';
import { getBoolObjectAsArray } from '../utils/object';
import { cleanRaidTitles } from '../config/raidTitles';
import { RouteComponentProps } from 'react-router-dom';

const typedDatabase = (rawDB as unknown) as Database;
const servers = Object.keys(typedDatabase);

type Props = RouteComponentProps<{ serverName?: string }>;

export default function App({
  match: {
    params: { serverName = '' }
  },
  history
}: Props) {
  const [currentServerName, setCurrentServerName] = useState(serverName);
  const [currentDisplayedFactions, setFactionDisplayed] = useState<
    DisplayedFactions
  >({
    alliance: true,
    horde: true
  });
  const [currentDisplayedRaids, setRaidDisplayed] = useState<DisplayedRaids>({
    wb: true,
    mc: true,
    ony: true,
    bwl: false,
    zg: false,
    aq20: false,
    aq40: false,
    naxx: false
  });

  const currentServer = typedDatabase[currentServerName];

  if (serverName === '') {
    history.push('/Sulfuron');
  }

  if (!servers.includes(serverName)) {
    return (
      <div>
        Something went wrong, this server is not known. Please go to{' '}
        <a href="https://github.com/DavidBabel/wow-classic-pve">
          https://github.com/DavidBabel/wow-classic-pve
        </a>{' '}
        and create it.
      </div>
    );
  }

  const guildsNames = Object.keys(currentServer).filter(guildName =>
    getBoolObjectAsArray<Faction>(currentDisplayedFactions).includes(
      currentServer[guildName].infos.faction
    )
  );

  return (
    <div className="App">
      <ServerSelect
        onChange={(newServer: string) => {
          setCurrentServerName(newServer);
          history.push(`/${newServer}`);
        }}
        servers={servers}
        selected={currentServerName}
      />
      {(Object.keys(currentDisplayedFactions) as Faction[]).map(
        (factionName: Faction) => (
          <Checkbox
            name={factionName}
            label={factionName} // todo, put images here
            isChecked={currentDisplayedFactions[factionName]}
            onChange={newValue =>
              setFactionDisplayed({
                ...currentDisplayedFactions,
                ...newValue
              })
            }
          />
        )
      )}
      {(Object.keys(currentDisplayedRaids) as RaidNames[]).map(
        (raidName: RaidNames) => (
          <Checkbox
            name={raidName}
            label={cleanRaidTitles[raidName]}
            isChecked={currentDisplayedRaids[raidName]}
            onChange={newValue =>
              setRaidDisplayed({
                ...currentDisplayedRaids,
                ...newValue
              })
            }
          />
        )
      )}
      <div>
        {guildsNames.map(guildDetail => (
          <GuildKills
            detail={currentServer[guildDetail]}
            displayedRaids={getBoolObjectAsArray<RaidNames>(
              currentDisplayedRaids
            )}
          />
        ))}
      </div>
    </div>
  );
}
