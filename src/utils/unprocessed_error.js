class UnProcessedError extends Error {
  constructor(errors) {
    super(errors);
    this.message = errors;
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export default UnProcessedError;
