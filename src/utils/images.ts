import CONFIG from '../config';

export const baseUrl = `${CONFIG.appPath}/img/skin/${CONFIG.skin}`;
export const killAlliance = `${baseUrl}/killAlliance.gif`;
export const killHorde = `${baseUrl}/killHorde.gif`;
export const nokill = `${baseUrl}/nokill.gif`;
export const fkill = `${baseUrl}/fkill.gif`;
export const fkillHorde = `${baseUrl}/fkillHorde.gif`;
export const fkillAlliance = `${baseUrl}/fkillAlliance.gif`;

export const helpImage = `${CONFIG.appPath}/img/help.gif`;

export const helpAddKillImage = `${CONFIG.appPath}/img/help-add-kill.png`;

new Image().src = baseUrl;
new Image().src = killAlliance;
new Image().src = killHorde;
new Image().src = nokill;
new Image().src = fkill;
new Image().src = fkillHorde;
new Image().src = fkillAlliance;
new Image().src = helpImage;
new Image().src = helpAddKillImage;
