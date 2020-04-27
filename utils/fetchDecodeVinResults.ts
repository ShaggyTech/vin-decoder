import { DecodeVinValuesExtendedResults } from '@/types';

/**
 * @description Returns response from NHTSA API endpoint DecodeVinValuesExtended
 * @param {string} vinValue Vehicle Identification Number
 * @returns {(Promise<DecodeVinValuesExtendedResults>)} Single object containing item key:value pairs
 * returned in the NHSTA API response.
 */
const fetchDecodeVinResults = async (
  vinValue: string
): Promise<DecodeVinValuesExtendedResults> => {
  /* Fetch the results and handle any errors */
  const { DecodeVinValuesExtended } = await import(
    '@shaggytools/nhtsa-api-wrapper'
  );
  const Decoder = new DecodeVinValuesExtended();

  try {
    const { Results } = await Decoder.DecodeVinValuesExtended(vinValue);

    if (!Results?.[0]) {
      throw new Error('Sorry, no results were found or an error occurred');
    }

    return Results[0];
  } catch (err) {
    return Promise.reject(err);
  }
};

export { fetchDecodeVinResults };
