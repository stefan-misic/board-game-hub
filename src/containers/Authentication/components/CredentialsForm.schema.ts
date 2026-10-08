import * as yup from 'yup';

import { testEmail } from '../../../helpers/utils';
import { TranslationParam } from '../../../types/translations.types';

export interface CredentialsFormValues {
  email: string;
  password: string;
}
export const defaultValues: CredentialsFormValues = {
  email: '',
  password: ''
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<CredentialsFormValues> =>
  yup.object({
    email: yup.string()
      .required(tv('requiredField'))
      .test({
        name: 'is-valid-email',
        test: (value, ctx) => {
          if (!value || !testEmail(value)) {
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
