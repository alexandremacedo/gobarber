export default interface IHashProvider {
  generateHash(password: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
