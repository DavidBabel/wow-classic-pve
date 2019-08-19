import React from 'react';
import { DialogContentText, Checkbox } from '@material-ui/core';

interface Props {
  hasGithubAccount: boolean;
  setGithubAccount: any;
}

export function GithubInfos({ hasGithubAccount, setGithubAccount }: Props) {
  return (
    <DialogContentText>
      <h5 style={{ marginBottom: 8, marginTop: -16, color: 'red' }}>
        <p>
          <label style={{ cursor: 'pointer' }}>
            <Checkbox
              value={hasGithubAccount}
              onChange={() => setGithubAccount(!hasGithubAccount)}
            />{' '}
            I have a github account
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            style={{
              color: '#0f0f0f',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
            href="https://github.com/"
            target="_href"
          >
            No ? Click <u>here</u> to create one (it's free).
          </a>
        </p>
      </h5>
    </DialogContentText>
  );
}
