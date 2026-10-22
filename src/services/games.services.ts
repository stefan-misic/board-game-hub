import type { Models } from 'appwrite';
import { v4 as uuid } from 'uuid';

import config from '../config';
import { tablesDB } from '../lib/appwrite';
import { Category } from '../types/global.types';

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
export type GameRow = Models.Row & GamePayload;
export const createGameService = async (payload: GamePayload): Promise<GameRow> => {
  const response = await tablesDB.createRow<GameRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: gamesTableId,
    rowId: uuid(),
    data: payload,
  });

  return response;
};
