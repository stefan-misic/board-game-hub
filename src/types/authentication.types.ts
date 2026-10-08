export interface AuthenticationData {
  id: string;
  email: string | null;
  error?: string;
  permissions: string[] | null;
}
