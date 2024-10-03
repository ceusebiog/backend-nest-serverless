export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly productId: string,
    public readonly quantity: number,
  ) {}
}
