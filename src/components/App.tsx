import React, { useState } from 'react';

import rawDB from '../generatedDatabase.json';
import { Database, Faction, RaidNames } from '../types/database.type';
import ServerSelect from './SelectServer/index';
import { Checkbox } from './Checkbox/index';
import { DisplayedRaids, DisplayedFactions } from '../types/states.type';
import { getBoolObjectAsArray } from '../utils/object';
import { cleanRaidTitles } from '../config/raidTitles';
import { RouteComponentProps } from 'react-router-dom';
import { Raids } from './Raids/index';
import { Menu } from './Menu';
import { capitalize } from '../utils/string';
import { fkillAlliance, fkillHorde } from './Case';
import {
  Drawer,
  Button,
  Checkbox as MaterialCheckbox,
  FormControlLabel
} from '@material-ui/core';
import { display } from '@material-ui/system';

const typedDatabase = (rawDB as unknown) as Database;
const servers = Object.keys(typedDatabase);

type Props = RouteComponentProps<{ serverName?: string }>;

export default function App({ match, history }: Props) {
  const serverName = (match && match.params && match.params.serverName) || '';
  const [showRaidDrawer, setRaidDrawerVisibility] = useState(false);
  const [currentServerName, setCurrentServerName] = useState(serverName);
  const [showEmptyGuilds, setEmptyGuildsVisibility] = useState(false);
  const [currentDisplayedFactions, setFactionDisplayed] = useState<
    DisplayedFactions
  >({
    alliance: true,
    horde: true
  });
  const [currentDisplayedRaids, setRaidDisplayed] = useState<DisplayedRaids>({
    wb: true,
    drakes: false,
    mc: true,
    ony: true,
    bwl: false,
    zg: false,
    aq20: false,
    aq40: false,
    naxx: false
  });

  // TODO filtrer les guildes qui n'ont rien down et proposer un bouton pour les afficher

  const currentServer = typedDatabase[currentServerName];

  if (serverName === '') {
    history && history.push('/Sulfuron');
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

  const guildsNames = Object.keys(currentServer.guilds).filter(guildName =>
    getBoolObjectAsArray<Faction>(currentDisplayedFactions).includes(
      currentServer.guilds[guildName].infos.faction
    )
  );

  return (
    <div style={{ marginTop: 100 }}>
      <Menu database={typedDatabase} currentServer={currentServerName} />
      <div style={{ position: 'fixed', right: 0, top: 0, display: 'flex' }}>
        <div style={{ margin: 10 }}>
          <FormControlLabel
            control={
              <MaterialCheckbox
                checked={showEmptyGuilds}
                onChange={() => setEmptyGuildsVisibility(!showEmptyGuilds)}
                color="primary"
              />
            }
            label={'Show all guilds'}
          />
          {(Object.keys(currentDisplayedFactions) as Faction[]).map(
            (factionName: Faction) => (
              <Checkbox
                name={factionName}
                label={
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={factionName === 'horde' ? fkillHorde : fkillAlliance}
                      alt={factionName}
                    />
                    &nbsp;&nbsp;{capitalize(factionName)}
                  </span>
                }
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
        </div>

        <div style={{ margin: 10 }}>
          <ServerSelect
            onChange={(newServer: string) => {
              setCurrentServerName(newServer);
              history.push(`/${newServer}`);
            }}
            servers={servers}
            selected={currentServerName}
          />
        </div>
      </div>

      <div>
        <Raids
          showEmptyGuilds={showEmptyGuilds}
          currentServer={currentServer}
          displayedGuilds={guildsNames}
          displayedRaids={getBoolObjectAsArray<RaidNames>(
            currentDisplayedRaids
          )}
        />
      </div>
      <Drawer open={showRaidDrawer} anchor="bottom" variant="persistent">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingLeft: 170,
            paddingRight: 170
          }}
        >
          {(Object.keys(currentDisplayedRaids) as RaidNames[]).map(
            (raidName: RaidNames) => (
              <div style={{ margin: 5, whiteSpace: 'nowrap' }}>
                <Checkbox
                  name={raidName}
                  label={cleanRaidTitles[raidName]}
                  isChecked={currentDisplayedRaids[raidName]}
                  onChange={newValue => {
                    const newState = {
                      ...currentDisplayedRaids,
                      ...newValue
                    };
                    setRaidDisplayed(newState);
                    // history.push({ search: qs.stringify(newState) });
                  }}
                />
              </div>
            )
          )}
        </div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setRaidDrawerVisibility(false)}
          style={{ position: 'fixed', bottom: 7, right: 7 }}
        >
          Hide raid filters
        </Button>
      </Drawer>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setRaidDrawerVisibility(true)}
        style={{ position: 'fixed', bottom: 7, right: 7 }}
      >
        Show raid filters
      </Button>
    </div>
  );
}
