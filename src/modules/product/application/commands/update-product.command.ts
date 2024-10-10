export class UpdateProductCommand {
  constructor(
    public readonly productId: string,
    public readonly name?: string,
    public readonly price?: number,
    public readonly stock?: number,
    public readonly description?: string,
  ) {}
}
