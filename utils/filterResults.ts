import { ResultsObjectType } from '@/types';

export const filterResults = (
  results: ResultsObjectType
): ResultsObjectType => {
  const filteredResults = {};
  Object.keys(results).forEach(prop => {
    if (results[prop] && results[prop] !== 'Not Applicable') {
      filteredResults[prop] = results[prop];
    }
  });
  return { ...filteredResults };
};
