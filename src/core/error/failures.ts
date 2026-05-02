export class Failure extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "Failure"
    this.code = code
  }
}

export class NotFoundFailure extends Failure {
  constructor(message: string) {
    super("NOT_FOUND", message)
    this.name = "NotFoundFailure"
  }
}

export class ValidationFailure extends Failure {
  constructor(message: string) {
    super("VALIDATION", message)
    this.name = "ValidationFailure"
  }
}

export class UnauthorizedFailure extends Failure {
  constructor(message = "Authentication required") {
    super("UNAUTHORIZED", message)
    this.name = "UnauthorizedFailure"
  }
}
