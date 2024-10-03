import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../value-objects/order-status.vo';

export class Order {
  public readonly orderId: string;
  public readonly userId: string;
  public readonly productId: string;
  public readonly quantity: number;
  public status: string;

  constructor(userId: string, productId: string, quantity: number) {
    this.orderId = uuidv4();
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.status = OrderStatus.PENDING;
  }

  updateStatus(status: OrderStatus) {
    this.status = status;
  }
}
