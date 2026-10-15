import * as yup from 'yup';

import { SearchInputOption } from '../../../components/SearchInput/SearchInput';
import { TranslationParam } from '../../../types/translations.types';

export interface GameFormValues {
  category: string;
  designer: SearchInputOption;
  image_id: string;
  is_owned: boolean;
  last_played: string;
  name: string;
  player_count: string;
  publisher: string;
  rating: number | null;
  system_id?: string | null;
  type: 'system' | 'edition' | 'expansion' | 'sequel';
  year: string;
}
export const defaultValues: GameFormValues = {
  category: '',
  designer: {
    id: '',
    imageId: '',
    label: ''
  },
  image_id: '',
  is_owned: false,
  last_played: '',
  name: '',
  player_count: '',
  publisher: '',
  rating: null,
  system_id: '',
  type: 'system',
  year: ''
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<GameFormValues> =>
  yup.object({
    category: yup.string().defined().default(''),
    designer: yup.object({
      id: yup.string().defined().default(''),
      imageId: yup.string().defined().default(''),
      label: yup.string().defined().default('')
    }).required(),
    image_id: yup.string().defined().default(''),
    is_owned: yup.boolean().required(),
    last_played: yup.string().defined().default(''),
    name: yup.string().required(tv('requiredField')),
    player_count: yup.string().defined().default(''),
    publisher: yup.string().defined().default(''),
    rating: yup.number().nullable().defined().default(null),
    system_id: yup.string().nullable().optional().default(''),
    type: yup.string().oneOf<GameFormValues['type']>(['system', 'edition', 'expansion', 'sequel']).required(),
    year: yup.string().defined().default('')
  }).required();
