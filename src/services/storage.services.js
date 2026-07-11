import { v4 as uuid } from 'uuid';

import config from '../config';
import { storage } from '../lib/appwrite';

export const uploadFileService = async (payload) => {
  const response = await storage.createFile({
    bucketId: config.appwriteConfig.bucketId,
    fileId: uuid(),
    file: payload
  });

  return response;
};
