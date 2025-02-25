export const transformFilterParam = (value: any): string | string[] =>
  value.length > 0 ? value.map((item: string) => item.trim().toLowerCase()) : value;
