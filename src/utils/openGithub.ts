export function openGithub(
  serverName: string,
  filePath: string,
  fileContent: object
) {
  const baseUrl =
    'https://github.com/DavidBabel/wow-classic-pve/new/master/?filename=servers/';
  function getContent(obj: any) {
    return '&value=' + encodeURIComponent(JSON.stringify(obj, null, 2));
  }
  let url = `${baseUrl}${serverName}/${filePath}${getContent(fileContent)}`;

  window.open(url, '_blank');
}
