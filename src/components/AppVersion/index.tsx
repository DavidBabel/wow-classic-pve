import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import CONFIG from '../../config';

export function AppVersion() {
  return (
    <ListItem
      style={{
        position: 'fixed',
        bottom: 0,
        color: '#c0c0c0',
        textAlign: 'right',
        width: 250
      }}
    >
      <ListItemText primary={CONFIG.appVersion} />
    </ListItem>
  );
}
