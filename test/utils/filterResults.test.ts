import { filterResults } from '@/utils/filterResults';

const validResults = {
  Make: 'VW',
  Model: 'Jetta',
  ModelYear: 2020,
};

const nullishResults = {
  NullValue: null,
  UndefinedValue: undefined,
  emptyValue: '',
};

const notApplicableResults = {
  NotApplicable: 'Not Applicable',
};

describe('fitlerResults Utility Method', () => {
  test('should return an empty object if no results param is provided', () => {
    const filtered = filterResults();
    expect(filtered).toEqual({});
  });

  test('should return an empty object if empty results are provided', () => {
    const filtered = filterResults({});
    expect(filtered).toEqual({});
  });

  test('should remove null, undefined, or empty item values', () => {
    const filtered = filterResults({
      ...validResults,
      ...nullishResults,
    });
    expect(filtered).toEqual({ ...validResults });
  });

  test('should remove item values equal to "Not Applicable"', () => {
    const filtered = filterResults({
      ...validResults,
      ...notApplicableResults,
    });
    expect(filtered).toEqual({ ...validResults });
  });
});
