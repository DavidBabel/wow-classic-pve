import React, { ChangeEvent } from 'react';
import { Faction } from '../../types/database.type';

import killAlliance from '../../img/skin/default/killAlliance.gif';
import killHorde from '../../img/skin/default/killHorde.gif';
import nokill from '../../img/skin/default/nokill.gif';
import fkill from '../../img/skin/default/fkill.gif';
import fkillHorde from '../../img/skin/default/fkillHorde.gif';
import fkillAlliance from '../../img/skin/default/fkillAlliance.gif';

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
    <div>
      <img src={imgSrc} alt={date} title={date} />
    </div>
  );
}
interface DateProps {
  date: string;
}

export function FirstServerCase({ date }: DateProps) {
  return <Case isServerFirst={true} date={date} />;
}
export function FirstHordeCase({ date }: DateProps) {
  return <Case faction="horde" isFirst={true} date={date} />;
}
export function FirstAllianceCase({ date }: DateProps) {
  return <Case faction="alliance" isFirst={true} date={date} />;
}
export function KillHordeCase({ date }: DateProps) {
  return <Case faction="horde" date={date} />;
}
export function KillAllianceCase({ date }: DateProps) {
  return <Case faction="alliance" date={date} />;
}
export function EmptyCase() {
  return <Case />;
}
