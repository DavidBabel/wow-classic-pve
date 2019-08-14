import React, { useState } from 'react';
import db from '../generatedDatabase.json';
import { Database, Faction, RaidNames } from '../types/database.type';
import ServerSelect from './ServerSelect/index';
import { GuildKills } from './GuildKills/index';
import { Checkbox } from './Checkbox/index';
import { DisplayedRaids, DisplayedFactions } from '../types/states.type';

const typedDatabase = (db as unknown) as Database;
const servers = Object.keys(typedDatabase);

function getBoolObjectAsArray<T>(anyBooleanObject: {
  [x: string]: boolean;
}): T[] {
  return (Object.keys(anyBooleanObject) as any[]).reduce(
    (prev: any[], next: any) => {
      if (anyBooleanObject[next]) {
        prev.push(next);
      }
      return prev;
    },
    []
  );
}

const cleanRaidTitles: { [raidName in RaidNames]: string } = {
  wb: 'World Bosses',
  mc: 'Molten Core',
  ony: 'Onyxia Lair',
  bwl: 'Blackwing Lair',
  zg: 'Zul Gurub',
  aq20: 'Ahn Quiraj 20',
  aq40: 'Ahn Quiraj 40',
  naxx: 'Naxxramas'
};

export default function App() {
  const [currentServerName, setCurrentServerName] = useState('Sulfuron');
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
  const guildsNames = Object.keys(currentServer).filter(guildName =>
    getBoolObjectAsArray<Faction>(currentDisplayedFactions).includes(
      currentServer[guildName].infos.faction
    )
  );
  return (
    <div className="App">
      <ServerSelect
        onChange={(newServer: string) => setCurrentServerName(newServer)}
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
      {guildsNames.map(guildDetail => (
        <GuildKills
          detail={currentServer[guildDetail]}
          displayedRaids={getBoolObjectAsArray<RaidNames>(
            currentDisplayedRaids
          )}
        />
      ))}
    </div>
  );
}
