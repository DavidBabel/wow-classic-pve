import React from 'react';
import { Dialog, DialogActions, DialogTitle } from '../Dialog';
import { DialogContent, DialogContentText } from '@material-ui/core';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddKillInfo({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Hey</DialogTitle>
      <DialogContent>
        <p> To update the kill of your guild, just click on any empty case</p>
      </DialogContent>
      <img src="any" alt="" />
      <DialogActions onClick={onClose}>Ok</DialogActions>
    </Dialog>
  );
}
