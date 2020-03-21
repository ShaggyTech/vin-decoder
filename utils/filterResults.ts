export const filterResults = (results: object): object => {
  const filteredResults = {};
  Object.keys(results).forEach(prop => {
    if (results[prop] && results[prop] !== 'Not Applicable') {
      filteredResults[prop] = results[prop];
    }
  });
  return { ...filteredResults };
};
