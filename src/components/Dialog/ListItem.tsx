import React from 'react';
import MaterialListItem, { ListItemProps } from '@material-ui/core/ListItem';
import styles from './styles.module.scss';

export function ListItem(props: any) {
  return <MaterialListItem className={styles.formListItem} {...props} />;
}
