import * as yup from 'yup';

import { Category } from '../../../types/global.types';
import { TranslationParam } from '../../../types/translations.types';
import { GameType } from '../../../services/games.services';

export interface GameFormValues {
  category: Category['id'];
  designer_id: string;
  image_id: string;
  is_owned: boolean;
  last_played: string;
  name: string;
  player_count: number[];
  publisher_id: string;
  rating: number | null;
  system_id?: string;
  type: GameType;
  year: string;
}
export const defaultValues: GameFormValues = {
  category: '',
  designer_id: '',
  image_id: '',
  is_owned: false,
  last_played: '',
  name: '',
  player_count: [1, 4],
  publisher_id: '',
  rating: null,
  system_id: '',
  type: 'system',
  year: ''
};

export const getSchema = (tv: TranslationParam): yup.ObjectSchema<GameFormValues> =>
  yup.object({
    category: yup.string().defined().default(''),
    designer_id: yup.string().required(tv('requiredField')),
    image_id: yup.string().defined().default(''),
    is_owned: yup.boolean().required(),
    last_played: yup.string().defined().default(''),
    name: yup.string().required(tv('requiredField')),
    player_count: yup.array().of(yup.number().min(1).max(7).required()).min(2).max(2).required(),
    publisher_id: yup.string().required(tv('requiredField')),
    rating: yup.number().nullable().defined().default(null),
    system_id: yup.string().optional().default('')
      .when('type', {
        is: 'system', 
        then: (schema) => schema.notRequired().nullable().transform(() => ''),
        otherwise: (schema) => schema.required(tv('requiredField')),
      }),
    type: yup.string().oneOf<GameFormValues['type']>(['system', 'edition', 'expansion', 'sequel']).required(),
    year: yup.string().defined().default('')
  }).required();
