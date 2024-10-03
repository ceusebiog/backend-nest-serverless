export interface AuthRepository {
  findByEmail(
    email: string,
  ): Promise<{ userId: string; password: string } | null>;
}
