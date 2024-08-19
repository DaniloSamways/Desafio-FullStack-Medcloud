export class NotFoundRecord extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundRecord';
  }
}