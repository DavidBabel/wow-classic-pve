import React from 'react';
import { Faction } from '../../types/database.type';
import styles from './styles.module.scss';
import CONFIG from '../../config';

const baseUrl = `${CONFIG.appPath}/img/skin/${CONFIG.skin}`;
const killAlliance = `${baseUrl}/killAlliance.gif`;
const killHorde = `${baseUrl}/killHorde.gif`;
const nokill = `${baseUrl}/nokill.gif`;
const fkill = `${baseUrl}/fkill.gif`;
export const fkillHorde = `${baseUrl}/fkillHorde.gif`;
export const fkillAlliance = `${baseUrl}/fkillAlliance.gif`;

interface Props {
  isFirst?: boolean;
  isServerFirst?: boolean;
  date?: string;
  faction?: Faction;
}

export function Case({ date, isFirst, isServerFirst, faction }: Props) {
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
  return (
    <div className={styles.Case}>
      <img src={imgSrc} alt={date} title={date} />
    </div>
  );
}
// interface DateProps {
//   date: string;
// }

// export function FirstServerCase({ date }: DateProps) {
//   return <Case isServerFirst={true} date={date} />;
// }
// export function FirstHordeCase({ date }: DateProps) {
//   return <Case faction="horde" isFirst={true} date={date} />;
// }
// export function FirstAllianceCase({ date }: DateProps) {
//   return <Case faction="alliance" isFirst={true} date={date} />;
// }
// export function KillHordeCase({ date }: DateProps) {
//   return <Case faction="horde" date={date} />;
// }
// export function KillAllianceCase({ date }: DateProps) {
//   return <Case faction="alliance" date={date} />;
// }
// export function EmptyCase() {
//   return <Case />;
// }
