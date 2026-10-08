import * as yup from 'yup';

import { TranslationParam } from '../../../types/translations.types';

export interface DesignerFormValues {
  display_name: string;
  image_id: string;
  name: string;
  type: string;
}
export const defaultValues: DesignerFormValues = {
  display_name: '',
  image_id: '',
  name: '',
  type: 'other'
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<DesignerFormValues> =>
  yup.object({
    display_name: yup.string().required(tv('requiredField')),
    image_id: yup.string().defined().default(''),
    name: yup.string().defined().default(''),
    type: yup.string().defined().default('')
  }).required();
