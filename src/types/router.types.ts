import { ReactNode } from 'react'; 

export interface RouteConfig {
  element: ReactNode;
  path: string;
  permissions?: string[];
}
