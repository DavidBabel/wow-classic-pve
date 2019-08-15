import React from 'react';
import {
  Drawer,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Divider
} from '@material-ui/core';
import { MenuIcon, AddGuild, AddServer, GridPlus, HelpIcon } from './icons';

import { ModalCreateServer } from '../ModalCreateServer';
import { ModalCreateGuild } from '../ModalCreateGuild';
import { ModalAddKillInfo } from '../ModalAddKillInfo';
import { ModalHelp } from '../ModalHelp';
import { Database } from '../../types/database.type';

interface Props {
  database: Database;
  currentServer: string;
}

export function Menu({ database, currentServer }: Props) {
  const [isOpen, setOpen] = React.useState(false);
  const [isModalInfoKillVisible, setModalInfoKillVisibility] = React.useState(
    false
  );

  const [isModalHelpVisible, setModalHelpVisibility] = React.useState(false);
  const [
    isModalCreateServerVisible,
    setModalCreateServerVisibility
  ] = React.useState(false);

  const [
    isModalCreateGuildVisible,
    setModalCreateGuildVisibility
  ] = React.useState(false);

  return (
    <div style={{ display: 'inline-block' }}>
      <MenuIcon onClick={() => setOpen(true)} />

      <Drawer open={isOpen} onClose={() => setOpen(false)}>
        <List style={{ width: 250 }}>
          <h2 style={{ textAlign: 'center' }}>Update infos</h2>
          <ListItem
            button
            onClick={() => {
              setOpen(false);
              setModalInfoKillVisibility(true);
            }}
          >
            <ListItemIcon>
              <GridPlus />
            </ListItemIcon>
            <ListItemText primary="Add a boss kill ?" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              setOpen(false);
              setModalCreateGuildVisibility(true);
            }}
          >
            <ListItemIcon>
              <AddGuild />
            </ListItemIcon>
            <ListItemText primary="Add your guild" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setOpen(false);
              setModalCreateServerVisibility(true);
            }}
          >
            <ListItemIcon>
              <AddServer />
            </ListItemIcon>
            <ListItemText primary="Add your Server" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              setOpen(false);
              setModalHelpVisibility(true);
            }}
          >
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
      </Drawer>
      <ModalCreateServer
        isOpen={isModalCreateServerVisible}
        onClose={() => setModalCreateServerVisibility(false)}
      />
      <ModalCreateGuild
        serverName={currentServer}
        isOpen={isModalCreateGuildVisible}
        onClose={() => setModalCreateGuildVisibility(false)}
      />
      <ModalAddKillInfo
        isOpen={isModalInfoKillVisible}
        onClose={() => setModalInfoKillVisibility(false)}
      />
      <ModalHelp
        isOpen={isModalHelpVisible}
        onClose={() => setModalHelpVisibility(false)}
      />
    </div>
  );
}
