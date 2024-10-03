import { Order } from '../entities/order.entity';

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
}
