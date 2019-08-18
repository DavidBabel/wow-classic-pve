import React from 'react';
import { Dialog, DialogActions, DialogTitle } from '../Dialog';
import { DialogContent } from '@material-ui/core';
import { helpImage } from '../../utils/images';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalHelp({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
      <DialogTitle>Help with updates</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions onClick={onClose}>Ok</DialogActions>
    </Dialog>
  );
}
