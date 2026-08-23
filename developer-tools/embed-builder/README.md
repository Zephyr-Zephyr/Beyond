# Embed Builder

Interactive CLI tool that asks a few questions and assembles a Discord
embed, printed as ready-to-use JSON (compatible with `discord.js`'s
`EmbedBuilder` or webhook payloads).

## Usage

```bash
npm install
node index.js
```

Answer the prompts for title, description, color, footer, and fields.
The finished JSON object is printed to the terminal at the end.

## Example output

```json
{
  "title": "Server Rules",
  "description": "Please follow the rules.",
  "color": 8825855,
  "fields": [{ "name": "1. Respect", "value": "Be nice to each other." }],
  "footer": { "text": "Beyond" }
}
```
