import React, { ChangeEvent } from 'react';
import { Guild } from '../../types/database.type';

interface Props {
  guild: Guild;
}

export function Guild({ guild: { infos, raids } }: Props) {}
