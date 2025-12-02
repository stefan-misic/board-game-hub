import * as yup from 'yup';

export const defaultValues = {
  display_name: '',
  image_url: '',
  is_essential: false,
  name: ''
};

export const getSchema = (tv) =>
  yup.object({
    display_name: yup.string().required(tv('requiredField')),
    image_url: yup.string(),
    is_essential: yup.boolean(),
    name: yup.string()
  }).required();
