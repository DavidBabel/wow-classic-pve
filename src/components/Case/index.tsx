import React from 'react';
import { Faction } from '../../types/database.type';
import styles from './styles.module.scss';
import {
  killHorde,
  killAlliance,
  nokill,
  fkill,
  fkillHorde,
  fkillAlliance
} from '../../utils/images';

interface Props {
  isFirst?: boolean;
  isServerFirst?: boolean;
  date?: string;
  faction?: Faction;
  onClick: () => void;
}

export function Case({
  date,
  isFirst,
  isServerFirst,
  faction,
  onClick
}: Props) {
  let imgSrc = faction === 'horde' ? killHorde : killAlliance;
  if (!date) {
    imgSrc = nokill;
  } else {
    if (isServerFirst) {
      imgSrc = fkill;
    } else if (isFirst) {
      imgSrc = faction === 'horde' ? fkillHorde : fkillAlliance;
    }
  }
  const cursorStyle = imgSrc === nokill ? { cursor: 'pointer' } : {};

  return (
    <div className={styles.Case} style={cursorStyle} onClick={onClick}>
      <img src={imgSrc} alt={date} title={date} />
    </div>
  );
}
