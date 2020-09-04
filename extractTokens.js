const tokens = require("./temp/edgeql_wasm.js").TokenKind;

console.log(`export enum TokenKind {`);

Object.values(tokens)
  .filter((token) => typeof token === "string")
  .forEach((token) => console.log(`  ${token} = "${token}",`));

console.log(`}`);
