import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { MenuProps } from '@material-ui/core/Menu';
import {
  // Menu as MaterialMenu,
  Drawer,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
  // MenuItem,
  List,
  Divider,
  Typography,
  Popover
} from '@material-ui/core';
import { MenuIcon, AddGuild, AddServer, GridPlus, HelpIcon } from './icons';

import { ModalCreateServer } from '../ModalCreateServer';
import { ModalCreateGuild } from '../ModalCreateGuild';
import { ModalAddKillInfo } from '../ModalAddKillInfo';
import { ModalHelp } from '../ModalHelp';
import { Database } from '../../types/database.type';

// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5'
//   }
// })((props: MenuProps) => (
//   <MaterialMenu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center'
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center'
//     }}
//     {...props}
//   />
// ));

// const StyledMenuItem = withStyles(theme => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white
//       }
//     }
//   }
// }))(MenuItem);

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
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <ListItemIcon>
          <MenuIcon />
        </ListItemIcon>
        Open Menu
      </Button>
      <Drawer open={isOpen} onClose={() => setOpen(false)}>
        <List>
          <h2>Update infos</h2>
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
