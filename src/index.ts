export {TokenizerError} from "./error";
export {Token, TokenKind, Position} from './interfaces';

import {loadLib} from "../loader";
import {Token} from "./interfaces";

export async function lexEdgeQL(str: string): Promise<Token[]> {
  const lib = await loadLib();
  return lib.lexEdgeQL(str);
}
