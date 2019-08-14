import React, { useState } from 'react';
import db from '../generatedDatabase.json';
import { Database, Faction, RaidNames } from '../types/database.type';
import ServerSelect from './ServerSelect/index';
import { GuildKills } from './GuildKills/index';
import { RaidCheckbox } from './RaidCheckbox/index';
import { DisplayedRaids } from '../types/states.type';

const typedDatabase = (db as unknown) as Database;
const servers = Object.keys(typedDatabase);

export default function App() {
  const [currentServerName, setCurrentServerName] = useState('Sulfuron');
  const [showFactions, setFactionsToShow] = useState<Faction[]>([
    'alliance',
    'horde'
  ]);
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
  const guildsNames = Object.keys(currentServer);
  return (
    <div className="App">
      <ServerSelect
        onChange={(newServer: string) => setCurrentServerName(newServer)}
        servers={servers}
        selected={currentServerName}
      />
      {(Object.keys(currentDisplayedRaids) as RaidNames[]).map(
        (raidName: RaidNames) => (
          <RaidCheckbox
            name={raidName}
            isChecked={currentDisplayedRaids[raidName]}
            onChange={(newValue: Partial<DisplayedRaids>) =>
              setRaidDisplayed({
                ...currentDisplayedRaids,
                ...newValue
              })
            }
          />
        )
      )}

      {guildsNames.map(guildDetail => (
        <GuildKills
          detail={currentServer[guildDetail]}
          displayedRaids={(Object.keys(
            currentDisplayedRaids
          ) as RaidNames[]).reduce((prev: RaidNames[], next: RaidNames) => {
            if (currentDisplayedRaids[next]) {
              prev.push(next);
            }
            return prev;
          }, [])}
        />
      ))}
    </div>
  );
}
