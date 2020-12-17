import { DecodeVinValuesExtendedResults } from '@/types';

export const mockRawResults: Partial<DecodeVinValuesExtendedResults> = {
  Make: 'Volkswagen',
  Model: 'Jetta',
  ModelYear: '2020',
  VIN: 'TESTVIN',
  /* all of the below should be filtered out in final results */
  NCSABodyType: '',
  NCSAMake: 'Not Applicable',
};
