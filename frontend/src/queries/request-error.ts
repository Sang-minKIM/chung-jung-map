interface RequestErrorParams {
  message: string
  errorCode: string
  endpoint: string
}

export class RequestError extends Error {
  public errorCode: string
  public endpoint: string

  constructor({ message, errorCode, endpoint }: RequestErrorParams) {
    super(message)
    this.errorCode = errorCode
    this.endpoint = endpoint
  }
}
