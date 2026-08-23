#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const [, , command, file, ...rest] = process.argv;

function getFlag(name, fallback) {
  const idx = rest.indexOf(`--${name}`);
  return idx !== -1 ? rest[idx + 1] : fallback;
}

if (!command || !file) {
  console.log("Nutzung: node index.js <format|validate|minify> <datei.json> [--indent 2] [--out ziel.json]");
  process.exit(1);
}

let raw;
try {
  raw = readFileSync(file, "utf-8");
} catch {
  console.error(`Datei nicht gefunden: ${file}`);
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`Ungueltiges JSON in ${file}:`);
  console.error(err.message);
  process.exit(1);
}

if (command === "validate") {
  console.log(`${file} ist gueltiges JSON.`);
  process.exit(0);
}

const indent = command === "minify" ? 0 : Number(getFlag("indent", 2));
const output = JSON.stringify(parsed, null, indent);
const outFile = getFlag("out", file);

writeFileSync(outFile, output + (indent ? "\n" : ""));
console.log(`Geschrieben nach ${outFile} (${command}).`);
