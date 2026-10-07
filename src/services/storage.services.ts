import type { Models } from 'appwrite';
import { v4 as uuid } from 'uuid';

import config from '../config';
import { storage } from '../lib/appwrite';

export const uploadFileService = async (payload: File): Promise<Models.File> => {
  const response = await storage.createFile({
    bucketId: config.appwriteConfig.bucketId,
    fileId: uuid(),
    file: payload
  });

  return response;
};
