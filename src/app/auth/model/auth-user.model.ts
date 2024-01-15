export interface AuthUser {
  email: string;
  claims: {
    admin: boolean;
  };
}
