import type { Models } from 'appwrite';
import { v4 as uuid } from 'uuid';

import config from '../config';
import { account } from '../lib/appwrite';

export const changeUserPasswordService = async (
  id: string,
  password: string,
  secretKey: string
): Promise<Models.Token> => {
  const response = await account.updateRecovery({
    userId: id,
    secret: secretKey,
    password
  });

  return response;
};

export const createUserService = async (
  email: string,
  password: string
): Promise<Models.User<Models.Preferences>> => {
  const response = await account.create({
    userId: uuid(),
    email,
    password
  });

  return response;
};

export const loginUserService = async (
  email: string,
  password: string
): Promise<Models.Session> => {
  const response = await account.createEmailPasswordSession({
    email,
    password
  });

  return response;
};

export const logoutUserService = async (): Promise<Record<string, never>> => {
  const response = await account.deleteSession({ sessionId: 'current' });

  return response;
};

export const readUserService = async (): Promise<Models.User<Models.Preferences>> => {
  const response = await account.get();

  return response;
};

export const recoverUserPasswordService = async (email: string): Promise<Models.Token> => {
  const response = await account.createRecovery({
    email,
    url: `${config.env}/password-recovery/new-password`
  });

  return response;
};
