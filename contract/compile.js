 /* Compile the contract and copy the resulting wasm into `../out` */

// `shelljs` is included in the devDependencies of the root project
const sh = require('shelljs')
const os = require('os')

// Add wasm32 as a rust target
const buildCmd1 = "rustup target add wasm32-unknown-unknown"
sh.exec(buildCmd1)

// Compile contract [Note: there are more compilation flags in .cargo/config]
const buildCmd2 = `cargo build --all --target wasm32-unknown-unknown --release`
const { code } = sh.exec(buildCmd2)

// Get package name from Cargo.toml
const packageName = require('fs').readFileSync(`Cargo.toml`).toString().match(/name = "([^"]+)"/)[1]
const compiledWasm = `./target/wasm32-unknown-unknown/release/${packageName}.wasm`
  
// Create `../out` dir
const destination = `../out`
sh.mkdir('-p', destination)

// Copy link
const outFile = `${destination}/main.wasm`
sh.rm('-f', outFile)
sh.cp('-u', compiledWasm, outFile)

// exit script with the same code as the build command
process.exit(code)
