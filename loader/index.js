// This a vanilla JS file because we don't want TypeScript
// to mess with the dynamic "import()" call.

let lib = null;

async function loadLib() {
    if (lib != null) {
        return lib;
    }
    lib = await import("../pkg/edgeql_wasm");
    return lib;
}

exports.loadLib = loadLib;
