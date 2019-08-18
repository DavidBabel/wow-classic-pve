import React, { ChangeEvent } from 'react';

import {
  Radio,
  TextField,
  FormControlLabel,
  FormLabel,
  DialogContent,
  List
} from '@material-ui/core';
import { Dialog, DialogActions, DialogTitle, ListItem } from '../Dialog';

import { openGithub } from '../../utils/openGithub';

import guildRef from '../../utils/guildReference.json';
import { GithubInfos } from '../GithubInfos';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serverName: string;
}

export function ModalCreateGuild({ isOpen, onClose, serverName }: Props) {
  const [guildName, setGuildName] = React.useState<string>();
  const [guildFaction, setGuildFaction] = React.useState<string>();
  const [guildGMName, setGuildGMName] = React.useState<string>();
  const [guildDiscord, setGuildDiscord] = React.useState<string>('');
  const [guildSite, setGuildSite] = React.useState<string>('');

  const fileContent = {
    infos: {
      cleanName: guildName,
      faction: guildFaction,
      gm: guildGMName,
      discord: guildDiscord,
      site: guildSite
    },
    raids: {
      ...guildRef.raids
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add your guild</DialogTitle>
      <DialogContent>
        <GithubInfos />
        <List>
          <ListItem>
            <TextField
              label="Server"
              value={serverName}
              disabled
              margin="normal"
            />
            <TextField
              label="Guild name"
              value={guildName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setGuildName(event.target.value)
              }
              margin="normal"
            />
            <TextField
              label="GM name"
              value={guildGMName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setGuildGMName(event.target.value)
              }
              margin="normal"
            />
          </ListItem>
          <ListItem>
            <div style={{ marginTop: 16, marginBottom: -15 }}>
              <FormLabel component="legend">Faction</FormLabel>
              <FormControlLabel
                control={
                  <Radio
                    checked={guildFaction === 'horde'}
                    onClick={() => setGuildFaction('horde')}
                    value="horde"
                    name="radio-button-server-type"
                    inputProps={{ 'aria-label': 'horde' }}
                  />
                }
                label="Horde"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={guildFaction === 'alliance'}
                    onClick={() => setGuildFaction('alliance')}
                    value="alliance"
                    name="radio-button-server-type"
                    inputProps={{ 'aria-label': 'alliance' }}
                  />
                }
                label="Alliance"
              />
            </div>
          </ListItem>
          <ListItem>
            <TextField
              style={{ width: '100%' }}
              label="Guild Discord"
              value={guildDiscord}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setGuildDiscord(event.target.value)
              }
              margin="normal"
            />
          </ListItem>
          <ListItem>
            <TextField
              style={{ width: '100%' }}
              label="Guild Website"
              value={guildSite}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setGuildSite(event.target.value)
              }
              margin="normal"
            />
          </ListItem>
        </List>

        <DialogActions
          disabled={!guildName || !guildFaction || !guildGMName}
          onClose={onClose}
          onClick={() =>
            openGithub(serverName!, guildName! + '.json', fileContent)
          }
        >
          Make a request to add my guild
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
