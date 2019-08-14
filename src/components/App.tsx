import React, { useState } from 'react';
import db from '../generatedDatabase.json';
import { Database } from '../types/database.type';
import ServerSelect from './ServerSelect/index';
import {
  Case,
  FirstServerCase,
  FirstHordeCase,
  FirstAllianceCase,
  EmptyCase,
  KillAllianceCase,
  KillHordeCase
} from './Case/index';

const typedDatabase = (db as unknown) as Database;
const servers = Object.keys(typedDatabase);

export default function App() {
  const [currentServer, setCurrentServer] = useState('Sulfuron');
  // const [showFactions, setFactionsToShow] = useState(['alliance', 'horde']);
  return (
    <div className="App">
      <ServerSelect
        onChange={(newServer: string) => setCurrentServer(newServer)}
        servers={servers}
        selected={currentServer}
      />
      {JSON.stringify(typedDatabase[currentServer])}
      <Case
        faction="horde"
        isFirst={false}
        isServerFirst={false}
        date="coucou"
      />
      <div id="tests">
        <FirstServerCase date="coucou" />
        <FirstHordeCase date="coucou" />
        <FirstAllianceCase date="coucou" />
        <KillHordeCase date="coucou" />
        <KillAllianceCase date="coucou" />
        <EmptyCase />
      </div>
    </div>
  );
}
