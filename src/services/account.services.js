import { v4 as uuid } from 'uuid';

import config from '../config';
import { account } from '../lib/appwrite';

export const changeUserPasswordService = async (id, password, secretKey) => {
  const response = await account.updateRecovery({
    userId: id,
    secret: secretKey,
    password
  });

  return response;
};

export const createUserService = async (email, password) => {
  const response = await account.create({
    userId: uuid(),
    email,
    password
  });

  return response;
};

export const loginUserService = async (email, password) => {
  const response = await account.createEmailPasswordSession({
    email,
    password
  });

  return response;
};

export const logoutUserService = async () => {
  const response = await account.deleteSession({ sessionId: 'current' });

  return response;
};

export const readUserService = async () => {
  const response = await account.get();

  return response;
};

export const recoverUserPasswordService = async (email) => {
  const response = await account.createRecovery({
    email,
    url: `${config.env}/password-recovery/new-password`
  });

  return response;
};
