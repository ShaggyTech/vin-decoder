import { mockRawResults } from '../../mockDecodeVinValuesExtendedResults';

class DecodeVinValuesExtended {
  DecodeVinValuesExtended(vin: string) {
    if (vin === 'mock error') {
      return Promise.reject(new Error('mocking generic error'));
    }
    if (vin === 'mock empty response') {
      return Promise.resolve({});
    }
    if (vin === 'mock empty Results') {
      return Promise.resolve({ Results: [] });
    }
    return Promise.resolve({ Results: [{ ...mockRawResults }] });
  }
}

const { isValidVin } = jest.requireActual('@shaggytools/nhtsa-api-wrapper');

export { DecodeVinValuesExtended, isValidVin };
