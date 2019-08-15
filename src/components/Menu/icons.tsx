import React from 'react';

// svg from https://materialdesignicons.com/

interface Props {
  draw: string;
  fill?: string;
}
const Icon = ({ draw, fill = '#000000' }: Props) => (
  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
    <path fill={fill} d={draw} />
  </svg>
);

export const HelpIcon = () => (
  <Icon draw="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
);
export const MenuIcon = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    style={{
      width: 50,
      height: 50,
      padding: 14,
      marginRight: 20,
      cursor: 'pointer'
      // borderRadius: 5,
      // border: '1px color gray'
    }}
  >
    <Icon draw="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
  </div>
);
export const CloseMenuIcon = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    style={{
      width: 50,
      height: 50,
      padding: 14,
      marginRight: 20,
      cursor: 'pointer'
      // borderRadius: 5,
      // border: '1px color gray'
    }}
  >
    <Icon draw="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  </div>
);
export const AddGuild = () => (
  <Icon draw="M13,12A3.5,3.5 0 0,0 16.5,8.5A3.5,3.5 0 0,0 13,5A3.5,3.5 0 0,0 9.5,8.5A3.5,3.5 0 0,0 13,12M13,7A1.5,1.5 0 0,1 14.5,8.5A1.5,1.5 0 0,1 13,10A1.5,1.5 0 0,1 11.5,8.5A1.5,1.5 0 0,1 13,7M17.26,11.97C18.04,11.03 18.5,9.82 18.5,8.5C18.5,7.18 18.04,5.97 17.26,5.03C17.34,5 17.42,5 17.5,5A3.5,3.5 0 0,1 21,8.5A3.5,3.5 0 0,1 17.5,12C17.42,12 17.34,12 17.26,11.97M5,13V16H3V13H0V11H3V8H5V11H8V13M24,17.25V19H20.96V17.25C20.96,15.77 20.16,14.65 19,13.81C21.46,14.08 24,15.23 24,17.25M13,13.75C10.66,13.75 7,14.92 7,17.25V19H19V17.25C19,14.92 15.34,13.75 13,13.75M9.34,17C10.18,16.42 11.21,15.75 13,15.75C14.79,15.75 15.82,16.42 16.66,17" />
);
export const AddGuildDark = () => (
  <Icon draw="M13,13C11,13 7,14 7,16V18H19V16C19,14 15,13 13,13M19.62,13.16C20.45,13.88 21,14.82 21,16V18H24V16C24,14.46 21.63,13.5 19.62,13.16M13,11A3,3 0 0,0 16,8A3,3 0 0,0 13,5A3,3 0 0,0 10,8A3,3 0 0,0 13,11M18,11A3,3 0 0,0 21,8A3,3 0 0,0 18,5C17.68,5 17.37,5.05 17.08,5.14C17.65,5.95 18,6.94 18,8C18,9.06 17.65,10.04 17.08,10.85C17.37,10.95 17.68,11 18,11M8,10H5V7H3V10H0V12H3V15H5V12H8V10Z" />
);

export const PlusSymbol = () => (
  <Icon draw="M4,9H9V4H15V9H20V15H15V20H9V15H4V9M11,13V18H13V13H18V11H13V6H11V11H6V13H11Z" />
);

export const GridPlus = () => (
  <Icon draw="M13 3V11H21V3H13M3 21H11V13H3V21M3 3V11H11V3H3M13 16H16V13H18V16H21V18H18V21H16V18H13V16Z" />
);

export const TabPlus = () => (
  <Icon draw="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" />
);
export const BookmarkPlus = () => (
  <Icon draw="M17,18V5H7V18L12,15.82L17,18M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7H13V9H15V11H13V13H11V11H9V9H11V7Z" />
);
export const BookmarkPlusDark = () => (
  <Icon draw="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7V9H9V11H11V13H13V11H15V9H13V7H11Z" />
);
export const AddServer = () => (
  <Icon draw="M18,14H20V17H23V19H20V22H18V19H15V17H18V14M12,3C16.42,3 20,4.79 20,7C20,9.21 16.42,11 12,11C7.58,11 4,9.21 4,7C4,4.79 7.58,3 12,3M4,9C4,11.21 7.58,13 12,13C16.42,13 20,11.21 20,9V9L20,12.08L19,12C16.41,12 14.2,13.64 13.36,15.94L12,16C7.58,16 4,14.21 4,12V9M4,14C4,16.21 7.58,18 12,18H13C13,19.05 13.27,20.04 13.75,20.9L12,21C7.58,21 4,19.21 4,17V14Z" />
);
