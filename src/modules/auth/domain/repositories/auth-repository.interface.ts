export interface AuthRepository {
  findByEmail(
    email: string,
  ): Promise<{ userId: string; password: string } | null>;
  findById(userId: string): Promise<boolean | null>;
}
