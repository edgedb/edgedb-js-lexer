use edgeql_wasm::lex_edgeql;

#[test]
fn comment_utf16_offset() {
    assert_eq!([7, 14, 15, 16],
        &lex_edgeql("# test\nSELECT 1+1")
        .map_err(|_| "Error").unwrap()
        .iter()
        .map(|t| t.position.offset)
        .collect::<Vec<_>>()[..]);
}
