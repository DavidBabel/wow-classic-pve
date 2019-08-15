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
  Divider
} from '@material-ui/core';
import { MenuIcon, AddGuild, AddServer, GridPlus } from './icons';

import { ModalCreateServer } from '../ModalCreateServer';
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
}

export function Menu({ database }: Props) {
  const [isOpen, setOpen] = React.useState(false);
  const [
    isModalCreateServerVisible,
    setModalCreateServerVisibility
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
          <ListItem button>
            <ListItemIcon>
              <GridPlus />
            </ListItemIcon>
            <ListItemText
              primary="Add a boss kill"
              onClick={() => {
                setOpen(false);
                console.log('coucou');
              }}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AddGuild />
            </ListItemIcon>
            <ListItemText
              primary="Add your guild"
              onClick={() => {
                setOpen(false);
                console.log('coucou');
              }}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AddServer />
            </ListItemIcon>
            <ListItemText
              primary="Add your Server"
              onClick={() => {
                setOpen(false);
                setModalCreateServerVisibility(true);
              }}
            />
          </ListItem>
        </List>
      </Drawer>
      {/* <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <AddGuild />
          </ListItemIcon>
          <ListItemText
            primary="Add your guild"
            onClick={() => {
              handleClose();
              console.log('coucou');
            }}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <AddServer />
          </ListItemIcon>
          <ListItemText
            primary="Add your Server"
            onClick={() => {
              handleClose();
              setModalCreateServerVisibility(true);
            }}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <GridPlus />
          </ListItemIcon>
          <ListItemText
            primary="Add a boss kill"
            onClick={() => {
              handleClose();
              console.log('coucou');
            }}
          />
        </StyledMenuItem>
      </StyledMenu> */}
      <ModalCreateServer
        database={database}
        isOpen={isModalCreateServerVisible}
        onClose={() => setModalCreateServerVisibility(false)}
      />
    </div>
  );
}
