import React from 'react';
import { DisplayedRaids } from '../../types/states.type';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { RaidNames } from '../../types/database.type';

interface Props {
  name: RaidNames;
  isChecked: boolean;
  onChange: (newValue: Partial<DisplayedRaids>) => void;
}

const cleanRaidTitles: { [raidName in RaidNames]: string } = {
  wb: 'World Bosses',
  mc: 'Molten Core',
  ony: 'Onyxia Lair',
  bwl: 'Blackwing Lair',
  zg: 'Zul Gurub',
  aq20: 'Ahn Quiraj 20',
  aq40: 'Ahn Quiraj 40',
  naxx: 'Naxxramas'
};

export function RaidCheckbox({ name, isChecked, onChange }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={() => onChange({ [name]: !isChecked })}
          color="primary"
        />
      }
      label={cleanRaidTitles[name]}
    />
  );
}
