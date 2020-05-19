import { mockRawResults } from '@/test/__mocks__/mockDecodeVinValuesExtendedResults';
import { fetchDecodeVinResults } from '@/utils/fetchDecodeVinResults';
import { DecodeVinValuesExtendedResults } from '@/types';

describe('fetchDecodeVinResults Utility Method', () => {
  let results: DecodeVinValuesExtendedResults;

  test('should resolve with mock results', async () => {
    results = await fetchDecodeVinResults('TESTVIN').catch((err) => {
      // should never be called
      expect(err).toBeUndefined();
      return err;
    });
    expect(results).toEqual(mockRawResults);
  });

  test('should handle empty fetch response as an Error', async () => {
    results = await fetchDecodeVinResults('mock empty response').catch(
      (err) => {
        return err;
      }
    );
    expect(results instanceof Error).toBe(true);
  });

  test('should handle empty Results array as an Error', async () => {
    results = await fetchDecodeVinResults('mock empty Results').catch((err) => {
      return err;
    });
    expect(results instanceof Error).toBe(true);
  });

  test('should handle promise rejection', async () => {
    results = await fetchDecodeVinResults('mock error').catch((err) => {
      return err;
    });
    expect(results instanceof Error).toBe(true);
  });
});
