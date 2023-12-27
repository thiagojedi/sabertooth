export class RequestError extends Error {
  public status: number;
  info: object;

  constructor(status: number, info: object) {
    super("Request Error");

    this.status = status;
    this.info = info;
  }
}
