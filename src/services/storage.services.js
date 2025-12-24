import config from '../config';
import { storage } from '../lib/appwrite';

export const uploadFileService = async (id, payload) => {
  const response = await storage.createFile({
    bucketId: config.appwriteConfig.bucketId,
    fileId: id,
    file: payload
  });

  return response;
};
