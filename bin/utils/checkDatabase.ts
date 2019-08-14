export function isGuildInfosValid(base: any, ref: any, level: number = 0) {
  const baseKeys = Object.keys(base);
  const refKeys = Object.keys(ref);
  if (baseKeys.length !== refKeys.length) {
    throw 'Incorrect number of keys';
  }
  const diff = baseKeys.filter(x => !refKeys.includes(x));
  if (diff.length > 0) {
    throw `Unkown keys ${diff}`;
  }
  if (!baseKeys.every((value, index) => value === refKeys[index])) {
    throw 'Some keys are in wrong order';
  }

  refKeys.forEach(refKey => {
    if (refKey === 'faction') {
      if (base[refKey] !== 'alliance' && base[refKey] !== 'horde') {
        throw "'faction' key has to be 'alliance' or 'horde'";
      }
    }
    if (level === 2) {
      const isNotBoolean = typeof base[refKey] !== 'boolean';
      const isNotValidDate =
        typeof base[refKey] !== 'string' ||
        !/20[0-9]{2}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}/g.test(base[refKey]);

      if (isNotBoolean && isNotValidDate) {
        throw `The date for ${refKey} is invalid.`;
      }
    } else {
      if (typeof base[refKey] !== typeof ref[refKey]) {
        throw `Wrong type found for key ${refKey}`;
      }
      if (typeof base[refKey] === 'object') {
        isGuildInfosValid(base[refKey], ref[refKey], level + 1);
      }
    }
  });
}

export function isServerValid() {
  return true;
}
