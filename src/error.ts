import {Position} from "./interfaces";

export class TokenizerError extends Error {
  position: Position;

  constructor(message: string, position: Position) {
    super(message);
    this.position = position;
  }
}
