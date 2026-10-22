import FlagCz from '../assets/flags/cz.jpg';
import FlagDe from '../assets/flags/de.jpg';
import FlagFr from '../assets/flags/fr.jpg';
import FlagGb from '../assets/flags/gb.jpg';
import FlagUs from '../assets/flags/us.jpg';
import config from '../config';
import { Category, Country } from '../types/global.types';

const availableCategories: Category[] = [
  {
    id: 'conf',
    name: 'conflict'
  },
  {
    id: 'solo-tact',
    name: 'soloTactical'
  }
];

const availableCountries: Country[] = [
  {
    code: 'CZ',
    flagUrl: FlagCz,
    id: 203,
    name: 'Czech Republic'
  },
  {
    code: 'FR',
    flagUrl: FlagFr,
    id: 250,
    name: 'France'
  },
  {
    code: 'DE',
    flagUrl: FlagDe,
    id: 276,
    name: 'Germany'
  },
  {
    code: 'GB',
    flagUrl: FlagGb,
    id: 826,
    name: 'United Kingdom'
  },
  {
    code: 'US',
    flagUrl: FlagUs,
    id: 840,
    name: 'United States'
  }
];

export const createErrorMessage = (error: Error | unknown): string => {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  return errorMessage;
};

export const getCategories = (): Category[] => {
  return availableCategories;
};

export const getCountries = (): Country[] => {
  return availableCountries;
};

export const getStorageImageUrl = (imageId: string): string => {
  return `${config.appwriteConfig.apiEndpoint}/storage/buckets/${config.appwriteConfig.bucketId}/files/${imageId}/view?project=${config.appwriteConfig.projectId}`;
};

export const testEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
