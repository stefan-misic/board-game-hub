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

export const loginUserService = async (email, password) => {
  const response = await account.createEmailPasswordSession({
    email: email,
    password: password
  });

  return response;
};

export const logoutUserService = async () => {
  const response = await account.deleteSession({ sessionId: 'current' });

  return response;
};
