import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Radio,
  TextField,
  Modal,
  FormControlLabel,
  Button
} from '@material-ui/core';

import { openGithub } from '../../utils/openGithub';

import guildRef from '../../utils/guildReference.json';

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
  serverName: string;
}

export function ModalCreateGuild({ isOpen, onClose, serverName }: Props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
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
          <div>
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
          <TextField
            label="Guild Discord"
            value={guildDiscord}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGuildDiscord(event.target.value)
            }
            margin="normal"
          />
          <TextField
            label="Guild Website"
            value={guildSite}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGuildSite(event.target.value)
            }
            margin="normal"
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={!guildName || !guildFaction || !guildGMName}
              onClick={() =>
                openGithub(serverName!, guildName! + '.json', fileContent)
              }
            >
              Make a request to create my guild
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
