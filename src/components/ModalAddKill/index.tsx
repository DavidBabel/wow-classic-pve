import React from 'react';
import 'date-fns';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal, TextField, Grid, Button } from '@material-ui/core';
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

function getModalStyle() {
  const top = 45;
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
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [date, setDate] = React.useState(new Date());

  const stringDate = date.toISOString().replace(/:[0-9]{2}.[0-9]{3}Z/, '');

  return (
    <Modal
      // aria-labelledby="simple-modal-title"
      // aria-describedby="simple-modal-description"
      open={isOpen}
      onClose={onClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2>Please fill the form {required} </h2>
        <GithubInfos />
        <form noValidate autoComplete="off">
          <Grid container justify="space-around">
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
            <div style={{ width: 182 }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Date picker dialog"
                  format="yyyy/MM/dd"
                  value={date}
                  onChange={(date: any, b: any) => {
                    console.log(date);
                    console.log(b);

                    setDate(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  label="Time picker"
                  value={date}
                  onChange={(date: any, b: any) => {
                    console.log(date);
                    console.log(b);

                    setDate(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <TextField
              label="UTC Date Preview"
              value={stringDate}
              disabled
              margin="normal"
            />
            <div style={{ marginTop: 14 }}>
              <Button
                variant="contained"
                color="primary"
                disabled={!date}
                onClick={() => {
                  // TODO fix this type
                  const fileContent = deepClone<any>(
                    serverInfos.guilds[guildName]
                  );
                  fileContent.raids[raidName][bossName] = stringDate;
                  openGithub(serverName, guildName + '.json', fileContent);
                }}
              >
                Make a request to add my boss kill
              </Button>
            </div>
            <p>{required} Note that you will need to provide proof</p>
          </Grid>
        </form>
      </div>
    </Modal>
  );
}
