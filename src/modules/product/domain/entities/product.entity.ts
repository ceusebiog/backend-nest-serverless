import { v4 as uuidv4 } from 'uuid';

export class Product {
  public readonly productId: string;
  public name: string;
  public price: number;
  public stock: number;
  public description: string;

  constructor(
    name: string,
    price: number,
    stock: number,
    description: string,
    productId?: string,
  ) {
    this.productId = productId ?? uuidv4();
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
  }
}
