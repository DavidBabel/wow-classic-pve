import React from 'react';
import { Dialog, DialogActions, DialogTitle } from '../Dialog';
import { DialogContent } from '@material-ui/core';
import { helpAddKillImage } from '../../utils/images';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddKillInfo({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Hey</DialogTitle>
      <DialogContent>
        <p> To update the kill of your guild, just click on any empty case: </p>
        <p style={{ textAlign: 'center', paddingRight: 40 }}>
          <img src={helpAddKillImage} alt="how to add boss kill" />
        </p>
      </DialogContent>
      <DialogActions onClick={onClose}>Ok</DialogActions>
    </Dialog>
  );
}
