import * as yup from 'yup';

import { TranslationParam } from '../../../types/translations.types';

export interface NewPasswordFormValues {
  password: string;
}
export const defaultValues: NewPasswordFormValues = {
  password: ''
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<NewPasswordFormValues> =>
  yup.object({
    password: yup.string()
      .required(tv('requiredField'))
      .min(8, tv('password'))
      .max(256, tv('password'))
  }).required();
