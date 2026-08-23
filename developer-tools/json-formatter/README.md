# JSON Formatter

Simple CLI tool for validating and formatting JSON files, without
uploading anything to a website.

## Usage

```bash
# Format (default: 2-space indent), writes the formatted file
node index.js format data.json

# Validate only, reports errors with line/column
node index.js validate data.json

# Minify (single line)
node index.js minify data.json --out data.min.json
```

## Options

| Flag             | Description                              |
| ----------------- | ------------------------------------------ |
| `--indent <n>`     | Indent width in spaces (default 2)         |
| `--out <file>`      | Write to this file instead of overwriting  |
