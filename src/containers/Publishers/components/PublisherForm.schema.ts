import * as yup from 'yup';

import { Country } from '../../../types/global.types';
import { TranslationParam } from '../../../types/translations.types';

type PublisherType = 'essential' | 'other';
export interface PublisherFormValues {
  country: Country['id'];
  image_id: string;
  name: string;
  type: PublisherType;
}
export const defaultValues: PublisherFormValues = {
  country: null,
  image_id: '',
  name: '',
  type: 'other'
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<PublisherFormValues> =>
  yup.object({
    country: yup.number().nullable().defined().default(null),
    image_id: yup.string().defined().default(''),
    name: yup.string().required(tv('requiredField')),
    type: yup.string().oneOf<PublisherFormValues['type']>(['essential', 'other']).required()
  }).required();
