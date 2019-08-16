import React from 'react';
import {
  Drawer,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Divider
} from '@material-ui/core';
import {
  MenuIcon,
  AddGuild,
  AddServer,
  GridPlus,
  HelpIcon,
  CloseMenuIcon,
  BugIcon
} from './icons';

import { ModalCreateServer } from '../ModalCreateServer';
import { ModalCreateGuild } from '../ModalCreateGuild';
import { ModalAddKillInfo } from '../ModalAddKillInfo';
import { ModalHelp } from '../ModalHelp';

interface Props {
  currentServer: string;
}

export function Menu({ currentServer }: Props) {
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
      <div style={{ position: 'fixed', top: 5, left: 5 }}>
        <MenuIcon onClick={() => setOpen(true)} />
      </div>

      <Drawer open={isOpen} onClose={() => setOpen(false)}>
        <div
          style={{ position: 'fixed', top: 5, left: 5, zIndex: 888888888888 }}
        >
          <CloseMenuIcon onClick={() => setOpen(false)} />
        </div>
        <List style={{ width: 250 }}>
          <h2 style={{ textAlign: 'center', marginTop: 55 }}>Update infos</h2>
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
          <ListItem
            button
            onClick={() => {
              setOpen(false);
              window.open(
                'https://github.com/DavidBabel/wow-classic-pve/issues',
                '_blank'
              );
            }}
          >
            <ListItemIcon>
              <BugIcon />
            </ListItemIcon>
            <ListItemText primary="Report a bug" />
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
