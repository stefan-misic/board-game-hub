import * as yup from 'yup';

export const defaultValues = {
  display_name: '',
  image_id: '',
  name: '',
  type: 'other'
};

export const getSchema = (tv) =>
  yup.object({
    display_name: yup.string().required(tv('requiredField')),
    image_id: yup.string(),
    name: yup.string(),
    type: yup.string()
  }).required();
