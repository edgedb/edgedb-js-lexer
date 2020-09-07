mod utils;

use edgeql_parser::tokenizer::TokenStream;
use wasm_bindgen::prelude::*;
use combine::easy::Error;
use serde::Serialize;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Debug, Clone, Serialize)]
pub struct Token {
    pub kind: edgeql_parser::tokenizer::Kind,
    pub value: String,
    pub position: Position,
}

#[wasm_bindgen]
#[derive(Debug, Clone, Serialize)]
pub struct Position {
    pub line: usize,
    pub column: usize,
    pub offset: usize,
}

#[wasm_bindgen(module="error")]
extern "C" {
    pub type TokenizerError;
    #[wasm_bindgen(constructor)]
    fn new(message: String, position: Position) -> TokenizerError;
}

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn lexEdgeQL(input: &str) -> Result<JsValue, JsValue> {
    let data = lex_edgeql(input)?;
    JsValue::from_serde(&data)
    .map_err(|e| {
        AsRef::<JsValue>::as_ref(&js_sys::Error::new(&e.to_string())).clone()
    })
}

fn utf16_size(string_chunk: &str) -> usize {
    string_chunk
        .chars()
        .map(|x| x.len_utf16())
        .sum()
}

pub fn lex_edgeql(input: &str) -> Result<Vec<Token>, TokenizerError> {
    utils::set_panic_hook();

    let mut token_stream = TokenStream::new(&input);
    let mut tokens = Vec::new();
    let mut pos = token_stream.current_pos();
    let mut utf16_offset = utf16_size(&input[..pos.offset as usize]);
    while let Some(res) = (&mut token_stream).next() {
        match res {
            Ok(t) => {
                tokens.push(Token {
                    kind: t.token.kind,
                    value: t.token.value.into(),
                    position: Position {
                        line: pos.line,
                        column: pos.column,
                        offset: utf16_offset,
                    },
                });
                let old = pos.offset as usize;
                pos = token_stream.current_pos();
                let new = pos.offset as usize;
                utf16_offset += utf16_size(&input[old..new]);
            }
            Err(e) => {
                let pos = token_stream.current_pos();
                let position = Position {
                    line: pos.line,
                    column: pos.column,
                    offset: utf16_size(&input[..pos.offset as usize]),
                };
                let message = match e {
                    Error::Unexpected(s) => s.to_string(),
                    _ => e.to_string(),
                };
                return Err(TokenizerError::new(message, position));
            }
        }
    }
    Ok(tokens)
}
