import * as yup from 'yup';

import { testEmail } from '../../../helpers/utils';
import { TranslationParam } from '../../../types/translations.types';

export interface PasswordRecoveryFormValues {
  email: string;
}
export const defaultValues: PasswordRecoveryFormValues = {
  email: '',
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<PasswordRecoveryFormValues> =>
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
  }).required();
