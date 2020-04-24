export const fetchDecodeVinResults = async (vinValue: string) => {
  /* Fetch the results and handle any errors */
  const { DecodeVinValuesExtended } = await import(
    '@shaggytools/nhtsa-api-wrapper'
  );
  const Decoder = new DecodeVinValuesExtended();

  return Decoder.DecodeVinValuesExtended(vinValue).catch(
    (err: Error): Error => err
  );
};
