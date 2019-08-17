import React from 'react';
import 'date-fns';
import {
  TextField,
  DialogContent,
  DialogContentText,
  List
} from '@material-ui/core';
import { Server, RaidNames } from '../../types/database.type';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { openGithub } from '../../utils/openGithub';
import { deepClone } from '../../utils/object';
import { GithubInfos } from '../GithubInfos';

import { Dialog, DialogActions, DialogTitle, ListItem } from '../Dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serverInfos: Server;
  serverName: string;
  guildName: string;
  raidName: RaidNames;
  bossName: string;
}

const required = <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>;

export function ModalAddKill({
  isOpen,
  onClose,
  serverInfos,
  serverName,
  guildName,
  raidName,
  bossName
}: Props) {
  const [date, setDate] = React.useState(new Date());

  let stringDate: string;
  try {
    stringDate = date.toISOString().replace(/:[0-9]{2}.[0-9]{3}Z/, '');
  } catch (error) {
    stringDate = '';
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Adding a boss kill {required}</DialogTitle>
      <DialogContent>
        <GithubInfos />
        <List>
          <ListItem>
            <TextField label="Server" value={serverName} disabled />
            <TextField label="Guild name" value={guildName} disabled />
            <TextField label="Boss name" value={bossName} disabled />
          </ListItem>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ListItem>
              <KeyboardDatePicker
                margin="normal"
                label="Date of kill"
                format="yyyy/MM/dd"
                value={date}
                onChange={(date: any) => date && setDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                label="~ Time of kill (in your timezone)"
                value={date}
                onChange={(date: any) => date && setDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </ListItem>
          </MuiPickersUtilsProvider>
          <ListItem>
            <TextField
              label="UTC Date Preview"
              value={stringDate}
              disabled
              margin="normal"
            />
          </ListItem>
        </List>
        <DialogContentText>
          <p>{required} Note that you will need to provide proof</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        disabled={!stringDate}
        onClose={onClose}
        onClick={() => {
          // TODO fix this type
          const fileContent = deepClone<any>(serverInfos.guilds[guildName]);
          fileContent.raids[raidName][bossName] = stringDate;
          openGithub(serverName, guildName + '.json', fileContent);
        }}
      >
        Make a request to add my boss kill
      </DialogActions>
    </Dialog>
  );
}
