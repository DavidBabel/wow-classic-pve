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
