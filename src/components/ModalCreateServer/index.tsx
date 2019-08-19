import React, { ChangeEvent } from 'react';
import {
  Radio,
  TextField,
  DialogContent,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  List,
  MenuItem
} from '@material-ui/core';
import { openGithub } from '../../utils/openGithub';
import { GithubInfos } from '../GithubInfos';
import { Dialog, DialogActions, DialogTitle, ListItem } from '../Dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalCreateServer({ isOpen, onClose }: Props) {
  const [serverName, setServerName] = React.useState<string>();
  const [serverType, setServerType] = React.useState<string>();
  const [serverLang, setServerLang] = React.useState<string>();
  const [hasGithubAccount, setGithubAccount] = React.useState(false);

  const fileContent = {
    lang: serverLang,
    type: serverType
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add your server</DialogTitle>
      <DialogContent>
        <GithubInfos
          hasGithubAccount={hasGithubAccount}
          setGithubAccount={setGithubAccount}
        />
        <List>
          <ListItem>
            <TextField
              label="Server name"
              value={serverName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setServerName(event.target.value)
              }
              margin="normal"
            />

            <FormControlLabel
              style={{ marginLeft: 20 }}
              control={
                <Radio
                  checked={serverType === 'pve'}
                  onClick={() => setServerType('pve')}
                  value="pve"
                  name="radio-button-server-type"
                  inputProps={{ 'aria-label': 'pve' }}
                />
              }
              label="PvE"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={serverType === 'pvp'}
                  onClick={() => setServerType('pvp')}
                  value="pvp"
                  name="radio-button-server-type"
                  inputProps={{ 'aria-label': 'pvp' }}
                />
              }
              label="PvP"
            />
          </ListItem>
          <ListItem>
            <FormControl style={{ width: 250 }}>
              <InputLabel htmlFor="server-simple">
                Choose your Server language
              </InputLabel>
              <Select
                value={serverLang}
                onChange={(event: ChangeEvent<any>) =>
                  setServerLang(event.target.value)
                }
              >
                <MenuItem value="" />
                {['fr', 'en', 'de', 'ru'].map(lang => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions
        disabled={
          !hasGithubAccount || !serverLang || !serverType || !serverName
        }
        onClose={onClose}
        onClick={() =>
          openGithub(serverName!, '@server-infos.json', fileContent)
        }
      >
        Make a request to add my server
      </DialogActions>
    </Dialog>
  );
}
