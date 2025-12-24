import { Client, Storage, TablesDB } from 'appwrite';

import config from '../../config';

export const client = new Client();

client
  .setEndpoint(config.appwriteConfig.apiEndpoint)
  .setProject(config.appwriteConfig.projectId);

export const tablesDB = new TablesDB(client);

export const storage = new Storage(client);
