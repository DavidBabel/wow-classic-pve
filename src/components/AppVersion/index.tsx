import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import CONFIG from '../../config';

interface Props {
  width: number;
}

export function AppVersion({ width }: Props) {
  return (
    <ListItem
      style={{
        position: 'fixed',
        bottom: 0,
        color: '#c0c0c0',
        textAlign: 'right',
        width
      }}
    >
      <ListItemText primary={CONFIG.appVersion} />
    </ListItem>
  );
}
