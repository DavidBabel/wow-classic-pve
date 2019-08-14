import React, { ChangeEvent, ReactNode } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

interface Props {
  onChange: (newValue: string) => void;
  servers: string[];
  selected: string;
}

export default function ServerSelect({
  onChange = () => {},
  servers = [],
  selected
}: Props) {
  return (
    <FormControl style={{ width: 400 }}>
      <InputLabel htmlFor="age-simple">Choose your Server</InputLabel>
      <Select
        value={selected}
        onChange={(event: ChangeEvent<any>) => onChange(event.target.value)}
        inputProps={{
          name: 'age',
          id: 'age-simple'
        }}
      >
        {servers.map(server => (
          <MenuItem key={server} value={server}>
            {server}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
