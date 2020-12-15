/**
 * vee-validate - For Input Validation
 */

// Any rules you want to use MUST be imported AND extended
import { extend } from 'vee-validate';
import { required, alpha_num as alphaNum } from 'vee-validate/dist/rules';

// Offline VIN Validation
import { isValidVin } from '@shaggytools/nhtsa-api-wrapper';

export const rules = () => {
  /* Custom Rules */
  extend('vin', {
    message: 'That is not a valid VIN.',
    validate: (value) => {
      return isValidVin(value);
    },
  });

  /* Vee-Validate Rules */
  extend('required', {
    ...required,
    message: 'A {_field_} is required.',
  });

  extend('alpha_num', {
    ...alphaNum,
    message: 'A {_field_} may only contain alphabetic or numeric characters.',
  });
};

rules();
