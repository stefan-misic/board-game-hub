import type { Models } from 'appwrite';
import { v4 as uuid } from 'uuid';

import config from '../config';
import { tablesDB } from '../lib/appwrite';
import { Country } from '../types/global.types';

const publishersTableId = 'publishers';

export type PublisherType = 'essential' | 'other';
interface PublisherPayload {
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
