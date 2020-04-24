export const handleError = (err: Error, errMsg: string): void => {
  // eslint-disable-next-line no-console
  console.error(`${errMsg}`, err);
};
