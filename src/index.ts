export {TokenizerError} from './error'

import {loadLib} from "../loader"

export async function lexEdgeQL(str: string): Promise<any> {
  const lib = await loadLib();
  return lib.lexEdgeQL(str);
}
