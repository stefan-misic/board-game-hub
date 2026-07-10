import { v4 as uuid } from 'uuid';

import config from '../config';
import { tablesDB } from '../lib/appwrite';

const designersTableId = 'designers';

export const createDesignerService = async (payload) => {
  const response = await tablesDB.createRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: uuid(),
    data: payload,
  });

  return response;
};
