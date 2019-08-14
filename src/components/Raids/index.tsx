import React from 'react';
import { Guild, RaidNames, Server } from '../../types/database.type';
import { Case } from '../Case/index';
import styles from './styles.module.scss';

interface Props {
  currentServer: Server;
  displayedGuilds: string[];
  displayedRaids: RaidNames[];
}

export function Raids({
  currentServer,
  displayedGuilds,
  displayedRaids
}: Props) {
  return <div></div>;
}
