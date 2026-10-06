import * as yup from 'yup';

export const defaultValues = {
  password: ''
};

export const getSchema = (tv) =>
  yup.object({
    password: yup.string()
      .required(tv('requiredField'))
      .min(8, tv('password'))
      .max(256, tv('password'))
  }).required();
