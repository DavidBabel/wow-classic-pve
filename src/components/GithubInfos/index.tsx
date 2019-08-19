import React from 'react';
import { DialogContentText } from '@material-ui/core';

export function GithubInfos() {
  return (
    <DialogContentText>
      <h5 style={{ marginBottom: 8, marginTop: 4, color: 'red' }}>
        <a
          style={{ color: 'red', fontWeight: 'bold', textDecoration: 'none' }}
          href="https://github.com/"
          target="_href"
        >
          Click here to create a GitHub account otherwise it will not work (it's
          free).
        </a>
      </h5>
    </DialogContentText>
  );
}
