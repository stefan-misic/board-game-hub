import * as yup from 'yup';

import { testEmail } from '../../../helpers/utils';

export const defaultValues = {
  email: '',
  password: ''
};

export const getSchema = (tv) =>
  yup.object({
    email: yup.string()
      .required(tv('requiredField'))
      .test({
        name: 'is-valid-email',
        test: (value, ctx) => {
          if (!testEmail(value)) {
            return ctx.createError({ message: tv('email') });
          }
          return true;
        }
      }),
    password: yup.string()
      .required(tv('requiredField'))
      .min(8, tv('password'))
      .max(256, tv('password'))
  }).required();
