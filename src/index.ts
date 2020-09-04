import {TokenizerError, Position} from "./error";
import {loadLib} from "../loader";

// @ts-ignore
import {TokenKind} from "./tokens";

export {TokenizerError, TokenKind};

export interface Token {
  kind: TokenKind;
  value: string;
  position: Position;
}

export async function lexEdgeQL(str: string): Promise<Token[]> {
  const lib = await loadLib();
  return lib.lexEdgeQL(str);
}
