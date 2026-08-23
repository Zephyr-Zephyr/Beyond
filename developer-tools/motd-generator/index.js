#!/usr/bin/env node

const COLOR_MAP = {
  "0": "\x1b[30m", "1": "\x1b[34m", "2": "\x1b[32m", "3": "\x1b[36m",
  "4": "\x1b[31m", "5": "\x1b[35m", "6": "\x1b[33m", "7": "\x1b[37m",
  "8": "\x1b[90m", "9": "\x1b[94m", a: "\x1b[92m", b: "\x1b[96m",
  c: "\x1b[91m", d: "\x1b[95m", e: "\x1b[93m", f: "\x1b[97m",
};
const FORMAT_MAP = { l: "\x1b[1m", n: "\x1b[4m", o: "\x1b[3m", m: "\x1b[9m", r: "\x1b[0m" };
const RESET = "\x1b[0m";

function toAnsi(line) {
  return line.replace(/&([0-9a-fk-or])/gi, (_, code) => {
    const c = code.toLowerCase();
    return COLOR_MAP[c] || FORMAT_MAP[c] || "";
  });
}

const lines = process.argv.slice(2);

if (lines.length === 0) {
  console.log('Nutzung: node index.js "&6Zeile 1" "&7Zeile 2"');
  process.exit(1);
}

console.log("\n--- server.properties ---");
console.log(`motd=${lines.join("\\n")}`);

console.log("\n--- Vorschau ---");
for (const line of lines) {
  console.log(toAnsi(line) + RESET);
}
console.log();
