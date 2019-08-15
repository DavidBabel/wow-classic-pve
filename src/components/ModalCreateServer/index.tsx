import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Radio,
  TextField,
  Modal,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  Button
} from '@material-ui/core';
// import Radio, { RadioProps } from '@material-ui/core/Radio';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { Database } from '../../types/database.type';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
  database: Database;
}

export function ModalCreateServer({ isOpen, onClose }: Props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [serverName, setServerName] = React.useState<string>();
  const [serverType, setServerType] = React.useState<string>();
  const [serverLang, setServerLang] = React.useState<string>();

  function openGithub() {
    const content = {
      lang: serverLang,
      type: serverType
    };
    let url = `https://github.com/DavidBabel/wow-classic-pve/new/master/?filename=servers/${serverName}/@server-infos.json&value=${encodeURIComponent(
      JSON.stringify(content, null, 2)
    )}`;

    window.open(url, '_blank');
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
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
            label="Server name"
            // className={classes.textField}
            value={serverName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setServerName(event.target.value)
            }
            margin="normal"
          />
          <div>
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
            <FormControlLabel
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
          </div>
          <div>
            <FormControl style={{ width: 250 }}>
              <InputLabel htmlFor="server-simple">
                Choose your Server language
              </InputLabel>
              <Select
                native
                value={serverLang}
                onChange={(event: ChangeEvent<any>) =>
                  setServerLang(event.target.value)
                }
              >
                <option value="" />
                {['fr', 'en', 'de', 'ru'].map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={!serverLang || !serverType || !serverName}
              onClick={openGithub}
            >
              Make request to add my server
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
