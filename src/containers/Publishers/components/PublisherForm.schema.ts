import * as yup from 'yup';

import { TranslationParam } from '../../../types/translations.types';

type PublisherType = 'essential' | 'other';
export interface PublisherFormValues {
  country: string;
  image_id: string;
  name: string;
  type: PublisherType;
}
export const defaultValues: PublisherFormValues = {
  country: '',
  image_id: '',
  name: '',
  type: 'other'
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<PublisherFormValues> =>
  yup.object({
    country: yup.string().defined().default(''),
    image_id: yup.string().defined().default(''),
    name: yup.string().required(tv('requiredField')),
    type: yup.string().oneOf<PublisherFormValues['type']>(['essential', 'other']).required()
  }).required();
