import { v4 as uuidv4 } from 'uuid';

export class User {
  public readonly userId: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(name: string, email: string, password: string, userId?: string) {
    this.userId = userId ?? uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
