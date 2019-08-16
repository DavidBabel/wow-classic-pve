import React from 'react';
import 'date-fns';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, TextField, Grid, Button } from '@material-ui/core';
import { Server, RaidNames } from '../../types/database.type';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  MaterialUiPickersDate
} from '@material-ui/pickers';
import { openGithub } from '../../utils/openGithub';
import { deepClone } from '../../utils/object';

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serverInfos: Server;
  serverName: string;
  guildName: string;
  raidName: RaidNames;
  bossName: string;
}

export function ModalAddKill({
  isOpen,
  onClose,
  serverInfos,
  serverName,
  guildName,
  raidName,
  bossName
}: Props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [date, setDate] = React.useState<string>();

  return (
    <Modal
      // aria-labelledby="simple-modal-title"
      // aria-describedby="simple-modal-description"
      open={isOpen}
      onClose={onClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2>Please fill the form</h2>
        <h5>
          First you need to have a{' '}
          <a href="https://github.com/" target="_href">
            GitHub account
          </a>{' '}
          (it's free).
        </h5>
        <form noValidate autoComplete="off">
          <TextField
            label="Server"
            value={serverName}
            disabled
            margin="normal"
          />
          <TextField
            label="Guild name"
            value={guildName}
            disabled
            margin="normal"
          />
          <TextField
            label="Boss name"
            value={bossName}
            disabled
            margin="normal"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                label="Date picker dialog"
                format="yyyy/MM/dd"
                value={date}
                onChange={(date: any) => setDate(new Date(date).toISOString())}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                label="Time picker"
                value={date}
                onChange={(date: any) => setDate(new Date(date).toISOString())}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={!date}
              onClick={() => {
                // TODO fix this type
                const fileContent = deepClone<any>(
                  serverInfos.guilds[guildName]
                );
                fileContent.raids[raidName][bossName] = date!.replace(
                  ':00.000Z',
                  ''
                );
                openGithub(serverName, guildName + '.json', fileContent);
              }}
            >
              Make a request to add my kill
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
