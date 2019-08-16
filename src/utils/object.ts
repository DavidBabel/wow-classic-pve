export function getBoolObjectAsArray<T>(anyBooleanObject: {
  [x: string]: boolean;
}): T[] {
  return (Object.keys(anyBooleanObject) as any[]).reduce(
    (prev: any[], next: any) => {
      if (anyBooleanObject[next]) {
        prev.push(next);
      }
      return prev;
    },
    []
  );
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
