import { User } from '../entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  deleteById(userId: string): Promise<void>;
}
