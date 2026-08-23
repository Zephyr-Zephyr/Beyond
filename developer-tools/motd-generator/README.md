# MOTD Generator

Small CLI tool for building Minecraft server MOTDs (Message of the Day)
with formatting codes (`&a`, `&l`, `&k`, ...) and seeing a live terminal
preview with real colors.

## Usage

```bash
node index.js "&6Welcome to &lBeyond&r&6!" "&7Line 2: &aOnline"
```

Outputs:
- the formatted `server.properties`-ready string (`motd=...`)
- a colored preview in the terminal

## Supported codes

`&0`-`&9`, `&a`-`&f` for colors, `&l` bold, `&n` underline, `&o` italic,
`&m` strikethrough, `&r` reset.
