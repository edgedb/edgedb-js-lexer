export interface Token {
  kind: TokenKind;
  value: string;
  position: Position;
}

export interface Position {
  line: number;
  column: number;
  offset: number;
}

export enum TokenKind {
  Assign = "Assign",
  SubAssign = "SubAssign",
  AddAssign = "AddAssign",
  Arrow = "Arrow",
  Coalesce = "Coalesce",
  Namespace = "Namespace",
  ForwardLink = "ForwardLink",
  BackwardLink = "BackwardLink",
  FloorDiv = "FloorDiv",
  Concat = "Concat",
  GreaterEq = "GreaterEq",
  LessEq = "LessEq",
  NotEq = "NotEq",
  NotDistinctFrom = "NotDistinctFrom",
  DistinctFrom = "DistinctFrom",
  Comma = "Comma",
  OpenParen = "OpenParen",
  CloseParen = "CloseParen",
  OpenBracket = "OpenBracket",
  CloseBracket = "CloseBracket",
  OpenBrace = "OpenBrace",
  CloseBrace = "CloseBrace",
  Dot = "Dot",
  Semicolon = "Semicolon",
  Colon = "Colon",
  Add = "Add",
  Sub = "Sub",
  Mul = "Mul",
  Div = "Div",
  Modulo = "Modulo",
  Pow = "Pow",
  Less = "Less",
  Greater = "Greater",
  Eq = "Eq",
  Ampersand = "Ampersand",
  Pipe = "Pipe",
  At = "At",
  Argument = "Argument",
  DecimalConst = "DecimalConst",
  FloatConst = "FloatConst",
  IntConst = "IntConst",
  BigIntConst = "BigIntConst",
  BinStr = "BinStr",
  Str = "Str",
  BacktickName = "BacktickName",
  Keyword = "Keyword",
  Ident = "Ident",
}
