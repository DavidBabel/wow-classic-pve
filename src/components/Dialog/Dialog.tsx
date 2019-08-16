import React from 'react';
import MaterialDialog, { DialogProps } from '@material-ui/core/Dialog';

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <MaterialDialog fullWidth={true} {...props}>
      <form noValidate autoComplete="off">
        {children}
      </form>
    </MaterialDialog>
  );
}
