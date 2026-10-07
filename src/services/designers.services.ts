import type { Models } from 'appwrite';
import { v4 as uuid } from 'uuid';

import config from '../config';
import { tablesDB } from '../lib/appwrite';

const designersTableId = 'designers';

interface DesignerPayload {
  display_name: string;
  image_id: string;
  name: string;
  type: string;
}
type DesignerRow = Models.Row & DesignerPayload;
export const createDesignerService = async (payload: DesignerPayload): Promise<DesignerRow> => {
  const response = await tablesDB.createRow<DesignerRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: uuid(),
    data: payload,
  });

  return response;
};

export const deleteDesignerService = async (id: string): Promise<Record<string, never>> => {
  const response = await tablesDB.deleteRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: id
  });

  return response;
};

export const readDesignerService = async (id: string): Promise<DesignerRow> => {
  const response = await tablesDB.getRow<DesignerRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: id
  });

  return response;
};

export const readDesignersService = async (): Promise<Models.RowList<DesignerRow>> => {
  const response = await tablesDB.listRows<DesignerRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId
  });

  return response;
};

export const updateDesignerService = async (id: string, payload: DesignerPayload): Promise<DesignerRow> => {
  const response = await tablesDB.updateRow<DesignerRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: designersTableId,
    rowId: id,
    data: payload,
  });

  return response;
};
