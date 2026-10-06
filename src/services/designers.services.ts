import { Query } from 'appwrite';
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

export const deleteDesignerService = async (id) => {
  const response = await tablesDB.deleteRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: id
  });

  return response;
};

export const readDesignerService = async (id) => {
  const response = await tablesDB.getRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: id
  });

  return response;
};

export const readDesignersService = async () => {
  const response = await tablesDB.listRows({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId
  });

  return response;
};

export const updateDesignerService = async (id, payload) => {
  const response = await tablesDB.updateRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: id,
    data: payload,
  });

  return response;
};
