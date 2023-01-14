export const toHex = (value: number) => value.toString(16);

export const fromHex = (value: string) => parseInt(value, 16);

export const isHexFormat = (value: string) => /^([a-fA-F0-9])*$/.test(value);
