import FlagCz from '../assets/flags/cz.jpg';
import FlagDe from '../assets/flags/de.jpg';
import FlagFr from '../assets/flags/fr.jpg';
import FlagGb from '../assets/flags/gb.jpg';
import FlagUs from '../assets/flags/us.jpg';
import { Country } from '../types/global.types';

const availableCountries: Country[] = [
  {
    code: 'CZ',
    flagUrl: FlagCz,
    id: 203,
    name: 'Czech Republic'
  },
  {
    code: 'DE',
    flagUrl: FlagDe,
    id: 276,
    name: 'Germany'
  },
  {
    code: 'FR',
    flagUrl: FlagFr,
    id: 250,
    name: 'France'
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

export const getCountries = (): Country[] => {
  return availableCountries;
};

export const testEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
