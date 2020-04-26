/**
 * @description Will handle any errors via console.error
 * @param {Error} err Error to handle
 * @param {string} consoleMsg Optional prepended console message
 * @returns void
 */
const handleError = (err: Error, consoleMsg: string = ''): void => {
  // eslint-disable-next-line no-console
  console.error(`${consoleMsg}`, err);
};

export { handleError };
