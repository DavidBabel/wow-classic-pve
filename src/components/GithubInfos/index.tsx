import React from 'react';
import { DialogContentText } from '@material-ui/core';

export function GithubInfos() {
  return (
    <DialogContentText>
      <h5 style={{ marginBottom: 8, marginTop: 4, color: '#d0d0d0' }}>
        First you need to have a{' '}
        <a href="https://github.com/" target="_href">
          GitHub account
        </a>{' '}
        (it's free).
      </h5>
    </DialogContentText>
  );
}
