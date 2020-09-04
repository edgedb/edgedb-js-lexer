export interface Position {
  line: number;
  column: number;
  offset: number;
}

export class TokenizerError extends Error {
  position: Position;

  constructor(message: string, position: Position) {
    super(message);
    this.position = position;
  }
}
