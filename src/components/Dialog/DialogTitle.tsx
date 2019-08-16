import React from 'react';
import MaterialDialogTitle, {
  DialogTitleProps
} from '@material-ui/core/DialogTitle';

export function DialogTitle({ children, ...props }: DialogTitleProps) {
  return (
    <MaterialDialogTitle
      style={{ borderBottom: '1px solid #e0e0e0' }}
      {...props}
    >
      {children}
    </MaterialDialogTitle>
  );
}
