import React from 'react';
import 'date-fns';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  List,
  ListItem
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

import styles from './styles.module.scss';

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
    <Dialog
      fullWidth={true}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <form noValidate autoComplete="off">
        <DialogTitle
          id="form-dialog-title"
          style={{ borderBottom: '1px solid #e0e0e0' }}
        >
          Please fill the form {required}
        </DialogTitle>
        <DialogContent>
          <GithubInfos />
          <List>
            <ListItem className={styles.formListItem}>
              <TextField label="Server" value={serverName} disabled />
              <TextField label="Guild name" value={guildName} disabled />
              <TextField label="Boss name" value={bossName} disabled />
            </ListItem>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ListItem className={styles.formListItem}>
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
                  label="Approximative time of kill"
                  value={date}
                  onChange={(date: any) => date && setDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </ListItem>
            </MuiPickersUtilsProvider>
            <ListItem className={styles.formListItem}>
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
        <DialogActions style={{ borderTop: '1px solid #e0e0e0' }}>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!stringDate}
            onClick={() => {
              // TODO fix this type
              const fileContent = deepClone<any>(serverInfos.guilds[guildName]);
              fileContent.raids[raidName][bossName] = stringDate;
              openGithub(serverName, guildName + '.json', fileContent);
            }}
          >
            Make a request to add my boss kill
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
