import { v4 as uuid } from 'uuid';

import { account } from '../lib/appwrite';

export const createUserService = async (email, password) => {
  const response = await account.create({
    userId: uuid(),
    email: email,
    password: password
  });

  return response;
};
