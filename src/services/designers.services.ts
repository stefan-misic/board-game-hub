import type { Models } from 'appwrite';
import { Query } from 'appwrite';
import { v4 as uuid } from 'uuid';

import { SearchInputOption } from '../components/SearchInput/SearchInput';
import config from '../config';
import { tablesDB } from '../lib/appwrite';

const designersTableId = 'designers';

export type DesignerType = 'top' | 'essential' | 'other';
interface DesignerPayload {
  display_name: string;
  image_id: string;
  name: string;
  type: DesignerType;
}
export type DesignerRow = Models.Row & DesignerPayload;
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

export const searchDesignersService = async (searchTerm: string): Promise<SearchInputOption[]> => {
  if (!searchTerm || searchTerm.trim().length < 3) return [];

  try {
    const response = await tablesDB.listRows<DesignerRow>({
      databaseId: config.appwriteConfig.databaseId,
      tableId: designersTableId,
      queries: [
        Query.startsWith('display_name', searchTerm), 
        Query.select(['$id', 'display_name', 'image_id']),
        Query.limit(10)
      ]
    });

    return response?.rows?.map(row => ({
      id: row.$id,
      imageId: row.image_id,
      label: row.display_name
    })) ?? [];
  } catch (error) {
    console.error('Error - searchDesignersService:', error);
    return [];
  }
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
