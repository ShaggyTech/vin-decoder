import { ResultsObjectType } from '@/types';

export const mockRawResults: ResultsObjectType = {
  Make: 'Volkswagen',
  Model: 'Jetta',
  ModelYear: '2020',
  VIN: 'TESTVIN',
  /* all of these should be filtered out in final results */
  nullish: null,
  NA: 'Not Applicable',
  notDefined: undefined,
  empty: ''
};
