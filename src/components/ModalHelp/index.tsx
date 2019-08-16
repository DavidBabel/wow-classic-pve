import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import CONFIG from '../../config';

const helpImage = `${CONFIG.appPath}/img/help.gif`;

function getModalStyle() {
  const top = 40;
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
      width: 900,
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
}

export function ModalHelp({ isOpen, onClose }: Props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal
      // aria-labelledby="simple-modal-title"
      // aria-describedby="simple-modal-description"
      open={isOpen}
      onClose={onClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2>Help with updates</h2>
        <p>
          This app rely on a github project. To update the informations you have
          to make a proposal in this project.
        </p>
        <p>
          The only (free) requirement is to have a{' '}
          <a
            style={{ color: 'black', fontWeight: 'bold' }}
            href="https://github.com/"
            target="_href"
          >
            GitHub account
          </a>
          . Then the formularies of the app automatically create or update the
          right files for you.
        </p>
        <p>
          Just think to scroll down and create a branch with your modifications
          :
        </p>
        <div style={{ textAlign: 'center', padding: 25 }}>
          <img src={helpImage} style={{ width: 800 }} alt="" />
        </div>
        <p>
          Then, on the next page, you have to create a new <b>pull request</b>.
        </p>
      </div>
    </Modal>
  );
}
