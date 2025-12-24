import config from '../config';
import { tablesDB } from '../lib/appwrite';

const designersTableId = 'designers';

export const createDesignerService = async (id, payload) => {
  const response = await tablesDB.createRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: id,
    data: payload,
  });

  return response;
};
