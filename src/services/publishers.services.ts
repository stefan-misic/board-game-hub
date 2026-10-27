import type { Models } from 'appwrite';
import { Query } from 'appwrite';
import { v4 as uuid } from 'uuid';

import { SearchInputOption } from '../components/SearchInput/SearchInput';
import config from '../config';
import { tablesDB } from '../lib/appwrite';
import { Country } from '../types/global.types';

const publishersTableId = 'publishers';

export type PublisherType = 'essential' | 'other';
export interface PublisherPayload {
  country: Country['id'];
  image_id: string;
  name: string;
  type: PublisherType;
}
export type PublisherRow = Models.Row & PublisherPayload;
export const createPublisherService = async (payload: PublisherPayload): Promise<PublisherRow> => {
  const response = await tablesDB.createRow<PublisherRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: publishersTableId,
    rowId: uuid(),
    data: payload,
  });

  return response;
};

export const deletePublisherService = async (id: string): Promise<Record<string, never>> => {
  const response = await tablesDB.deleteRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: publishersTableId,
    rowId: id
  });

  return response;
};

export const readPublisherService = async (id: string): Promise<PublisherRow> => {
  const response = await tablesDB.getRow<PublisherRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: publishersTableId,
    rowId: id
  });

  return response;
};

export const readPublishersService = async (): Promise<Models.RowList<PublisherRow>> => {
  const response = await tablesDB.listRows<PublisherRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: publishersTableId
  });

  return response;
};

export const searchPublishersService = async (searchTerm: string): Promise<SearchInputOption[]> => {
  if (!searchTerm || searchTerm.trim().length < 3) return [];

  try {
    const response = await tablesDB.listRows<PublisherRow>({
      databaseId: config.appwriteConfig.databaseId,
      tableId: publishersTableId,
      queries: [
        Query.startsWith('name', searchTerm), 
        Query.select(['$id', 'name', 'image_id']),
        Query.limit(10)
      ]
    });

    return response?.rows?.map(row => ({
      id: row.$id,
      imageId: row.image_id,
      label: row.name
    })) ?? [];
  } catch (error) {
    console.error('Error - searchPublishersService:', error);
    return [];
  }
};

export const updatePublisherService = async (id: string, payload: PublisherPayload): Promise<PublisherRow> => {
  const response = await tablesDB.updateRow<PublisherRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: publishersTableId,
    rowId: id,
    data: payload,
  });

  return response;
};
