import * as fs from 'fs';
import { isGuildInfosValid, isServerValid } from './utils/checkDatabase';
import * as colors from 'colors/safe';

const guildInfosRef = JSON.parse(
  fs.readFileSync(`src/utils/guildReference.json`, 'utf8').toString()
);

const servers = fs.readdirSync('servers').filter(f => !f.endsWith('.json'));
const out = {};

servers.forEach(server => {
  const serverInfos = JSON.parse(
    fs.readFileSync(`servers/${server}/@server-infos.json`).toString()
  );
  try {
    isServerValid(serverInfos);
  } catch (error) {
    throw colors.red(
      `You Server file for ${colors.bold(
        server
      )} is malformated, build aborted: ${error}`
    );
  }
  out[server] = {
    infos: serverInfos,
    guilds: {}
  };
  const guildFiles = fs
    .readdirSync(`servers/${server}`)
    .filter(f => f !== '@server-infos.json');
  guildFiles.forEach(guildFile => {
    const guildName = guildFile.replace('.json', '');
    const guildInfos = JSON.parse(
      fs.readFileSync(`servers/${server}/${guildFile}`, 'utf8').toString()
    );
    try {
      isGuildInfosValid(guildInfos, guildInfosRef);
    } catch (error) {
      throw colors.red(
        `You Guild file for ${colors.bold(
          guildName
        )} is malformated, build aborted: ${error}`
      );
    }
    out[server].guilds[guildName] = guildInfos;
  });
});

fs.writeFileSync('src/generatedDatabase.json', JSON.stringify(out, null, 2));
