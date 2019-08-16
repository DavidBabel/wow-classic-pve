import React from 'react';
import MaterialDialogActions, {
  DialogActionsProps
} from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';

interface Props extends DialogActionsProps {
  onClose: () => void;
  onClick: () => void;
  disabled: boolean;
}

export function DialogActions({
  onClose,
  onClick,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <MaterialDialogActions
      style={{ borderTop: '1px solid #e0e0e0' }}
      {...props}
    >
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </MaterialDialogActions>
  );
}
