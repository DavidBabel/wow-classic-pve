import React from 'react';
import { DisplayedRaids, DisplayedFactions } from '../../types/states.type';
import {
  Checkbox as MaterialCheckbox,
  FormControlLabel
} from '@material-ui/core';
import { RaidNames, Faction } from '../../types/database.type';

interface Props {
  name: RaidNames | Faction;
  label: string | React.ReactNode;
  isChecked: boolean;
  onChange: (newValue: Partial<DisplayedRaids | DisplayedFactions>) => void;
}

export function Checkbox({ name, label, isChecked, onChange }: Props) {
  return (
    <FormControlLabel
      control={
        <MaterialCheckbox
          checked={isChecked}
          onChange={() => onChange({ [name]: !isChecked })}
          color="primary"
        />
      }
      label={label}
    />
  );
}
