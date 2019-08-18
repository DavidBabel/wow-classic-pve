import React from 'react';
import { Dialog, DialogTitle, DialogActions } from '../Dialog';
import { DialogContent } from '@material-ui/core';

export function ModalNoGuild() {
  const [isOpen, setOpen] = React.useState(true);
  const onClose = () => setOpen(false);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>No guild found</DialogTitle>
      <DialogContent>
        <p>
          Please create your first guild for this server, open the menu to do
          so.
        </p>
      </DialogContent>
      <DialogActions onClick={onClose}>Ok</DialogActions>
    </Dialog>
  );
}
