#!/usr/bin/env node
import prompts from "prompts";

const answers = await prompts([
  { type: "text", name: "title", message: "Titel des Embeds" },
  { type: "text", name: "description", message: "Beschreibung" },
  { type: "text", name: "color", message: "Farbe als Hex (z.B. 7c6cff)", initial: "7c6cff" },
  { type: "text", name: "footer", message: "Footer-Text (optional)" },
  {
    type: "number",
    name: "fieldCount",
    message: "Wie viele Felder (Fields) moechtest du hinzufuegen?",
    initial: 0,
  },
]);

const fields = [];
for (let i = 0; i < (answers.fieldCount || 0); i++) {
  const field = await prompts([
    { type: "text", name: "name", message: `Feld ${i + 1} - Name` },
    { type: "text", name: "value", message: `Feld ${i + 1} - Wert` },
    { type: "confirm", name: "inline", message: "Inline?", initial: true },
  ]);
  fields.push(field);
}

const embed = {
  title: answers.title || undefined,
  description: answers.description || undefined,
  color: answers.color ? parseInt(answers.color.replace("#", ""), 16) : undefined,
  fields: fields.length ? fields : undefined,
  footer: answers.footer ? { text: answers.footer } : undefined,
};

console.log("\n--- Discord Embed JSON ---\n");
console.log(JSON.stringify(embed, null, 2));
