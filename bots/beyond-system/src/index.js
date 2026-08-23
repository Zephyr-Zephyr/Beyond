// Beyond System — entry point.
// Dynamically loads every command under commands/**/*.js and every
// event under events/*.js, so adding a new module later is just
// "drop a file in the right folder" — no manual registration needed.

import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import "dotenv/config";
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
  partials: [Partials.Message, Partials.Channel],
});

client.commands = new Collection();

// --- Load commands ---
const commandsPath = join(__dirname, "commands");
for (const category of readdirSync(commandsPath)) {
  const categoryPath = join(commandsPath, category);
  for (const file of readdirSync(categoryPath).filter((f) => f.endsWith(".js"))) {
    const mod = await import(pathToFileURL(join(categoryPath, file)).href);
    if (mod.data && mod.execute) client.commands.set(mod.data.name, mod);
    else console.warn(`⚠️  Skipped ${category}/${file} — missing "data" or "execute" export.`);
  }
}
console.log(`📦 Loaded ${client.commands.size} commands.`);

// --- Load events ---
const eventsPath = join(__dirname, "events");
for (const file of readdirSync(eventsPath).filter((f) => f.endsWith(".js"))) {
  const mod = await import(pathToFileURL(join(eventsPath, file)).href);
  if (mod.once) client.once(mod.name, (...args) => mod.execute(...args));
  else client.on(mod.name, (...args) => mod.execute(...args));
}
console.log(`📡 Event listeners registered.`);

client.login(process.env.DISCORD_TOKEN);
