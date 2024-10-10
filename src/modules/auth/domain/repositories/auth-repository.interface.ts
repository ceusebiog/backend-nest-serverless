export interface AuthRepository {
  findByEmail(
    email: string,
  ): Promise<{ userId: string; password: string } | null>;
  findById(userId: string): Promise<boolean | null>;
  updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
  getRefreshToken(userId: string): Promise<string | null>;
}
