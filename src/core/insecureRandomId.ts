export const generateInsecureRandomId = (): string =>
  Math.random().toString(36).substr(2, 9);
