import type { Models } from 'appwrite';
import { Query } from 'appwrite';
import { v4 as uuid } from 'uuid';

import config from '../config';
import { tablesDB } from '../lib/appwrite';
import { Category } from '../types/global.types';
import { DesignerRow } from './designers.services';
import { PublisherRow } from './publishers.services';

const gamesTableId = 'games';

export type GameType = 'system' | 'edition' | 'expansion' | 'sequel';
interface GamePayload {
  category: Category['id'];
  designer_id: string;
  image_id: string;
  is_owned: boolean;
  last_played: string;
  name: string;
  player_count: number[];
  publisher_id: string;
  rating: number | null;
  system_id?: string;
  type: GameType;
  year: string;
}
export type GameRow = Models.Row & Omit<GamePayload, 'designer_id' | 'publisher_id'> & {
  designer: DesignerRow;
  publisher: PublisherRow;
};
export const createGameService = async (payload: GamePayload): Promise<GameRow> => {
  const { designer_id, publisher_id, ...rest } = payload;

  const response = await tablesDB.createRow<GameRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: gamesTableId,
    rowId: uuid(),
    data: {
      ...rest,
      designer: designer_id,
      publisher: publisher_id,
    } as unknown as GameRow
  });

  return response;
};

export const deleteGameService = async (id: string): Promise<Record<string, never>> => {
  const response = await tablesDB.deleteRow({
    databaseId: config.appwriteConfig.databaseId,
    tableId: gamesTableId,
    rowId: id
  });

  return response;
};

export const readGamesService = async (): Promise<Models.RowList<GameRow>> => {
  const response = await tablesDB.listRows<GameRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: gamesTableId,
    queries: [
      Query.select([
        '*',
        'designer.*',
        'publisher.*'
      ])
    ]
  });

  return response;
};
