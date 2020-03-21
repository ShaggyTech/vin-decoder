export interface User {
  firstName: string;
  lastName: string;
}

export interface Validator {
  rules: {
    [propName: string]: any;
  };
  immediate?: boolean;
  vid?: string;
  name?: string;
  customMessages?: {
    [propName: string]: string;
  };
}
