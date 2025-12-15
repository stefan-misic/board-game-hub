import * as yup from 'yup';

export const defaultValues = {
  display_name: '',
  image: '',
  is_essential: false,
  name: ''
};

export const getSchema = (tv) =>
  yup.object({
    display_name: yup.string().required(tv('requiredField')),
    image: yup.string(),
    is_essential: yup.boolean(),
    name: yup.string()
  }).required();
