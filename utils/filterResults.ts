import { ResultsObjectType } from '@/types';

/**
 * @description Filters results by removing any item with a falsey value or a value equal to 'Not Applicable'
 * @param {ResultsObjectType} [results={}]
 * @returns {ResultsObjectType}
 */
const filterResults = (results: ResultsObjectType = {}): ResultsObjectType => {
  // eslint-disable-next-line prefer-const
  let filteredResults = {};
  Object.keys(results).forEach((prop) => {
    if (results[prop] && results[prop] !== 'Not Applicable') {
      filteredResults[prop] = results[prop];
    }
  });
  return { ...filteredResults };
};

export { filterResults };
