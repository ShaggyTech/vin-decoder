import { handleError } from '@/utils/handleError';

const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('handleError Utility Method', () => {
  test('should log error to console', () => {
    handleError(new Error('Test Error'));
    expect(consoleSpy).toHaveBeenCalledWith('', Error('Test Error'));
  });

  test('should log error to console when provided optional console message', () => {
    handleError(new Error('Test Error'), 'Test message');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Test message',
      Error('Test Error')
    );
  });
});
