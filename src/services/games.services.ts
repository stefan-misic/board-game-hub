import type { Models } from 'appwrite';
import { Query } from 'appwrite';
import { v4 as uuid } from 'uuid';

import { SearchInputOption } from '../components/SearchInput/SearchInput';
import config from '../config';
import { tablesDB } from '../lib/appwrite';
import { Category } from '../types/global.types';
import { DesignerRow } from './designers.services';
import { PublisherRow } from './publishers.services';

const gameRelationshipsTableId = 'game_relationships';
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
export type GameRow = Models.Row & Omit<GamePayload, 'designer_id' | 'publisher_id' | 'system_id'> & {
  designer: DesignerRow;
  publisher: PublisherRow;
  system: GameRow | null;
};
export const createGameService = async (payload: GamePayload): Promise<GameRow> => {
  const { designer_id, publisher_id, system_id, ...rest } = payload;

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

  if (system_id && response?.$id && payload?.type !== 'system') {
    await tablesDB.createRow({
      databaseId: config.appwriteConfig.databaseId,
      tableId: gameRelationshipsTableId,
      rowId: uuid(),
      data: {
        system_id: system_id,
        entry_id: response.$id,
        type: payload.type,
      }
    });
  }

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

type GameRelationshipRow = Models.Row & {
  entry_id: string;
  system_id: string;
  type: Exclude<GameType, 'system'>;
}
export const readGameService = async (id: string): Promise<GameRow> => {
  const response = await tablesDB.getRow<GameRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: gamesTableId,
    rowId: id,
    queries: [
      Query.select([
        '*',
        'designer.*',
        'publisher.*'
      ])
    ]
  });

  const relationshipResponse = await tablesDB.listRows<GameRelationshipRow>({
    databaseId: config.appwriteConfig.databaseId,
    tableId: gameRelationshipsTableId,
    queries: [
      Query.equal('entry_id', [id]), 
      Query.limit(1)
    ]
  });
  const relationship = relationshipResponse?.rows?.[0];

  if (relationship) {
    const systemResponse = await tablesDB.getRow<GameRow>({
      databaseId: config.appwriteConfig.databaseId,
      tableId: gamesTableId,
      rowId: relationship?.system_id
    });

    return {
      ...response,
      system: systemResponse
    };
  }

  return { ...response, system: null };
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

export const searchGamesService = async (searchTerm: string): Promise<SearchInputOption[]> => {
  if (!searchTerm || searchTerm.trim().length < 3) return [];

  try {
    const response = await tablesDB.listRows<GameRow>({
      databaseId: config.appwriteConfig.databaseId,
      tableId: gamesTableId,
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
    console.error('Error - searchGamesService:', error);
    return [];
  }
};
