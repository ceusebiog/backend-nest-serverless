export class User {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
