// Registers all slash commands with Discord.
// Run this once whenever commands are added or changed:
//   npm run deploy-commands

import { REST, Routes } from "discord.js";
import "dotenv/config";
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const commands = [];

const commandsPath = join(__dirname, "commands");
for (const category of readdirSync(commandsPath)) {
  const categoryPath = join(commandsPath, category);
  for (const file of readdirSync(categoryPath).filter((f) => f.endsWith(".js"))) {
    const mod = await import(pathToFileURL(join(categoryPath, file)).href);
    if (mod.data) commands.push(mod.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const route = process.env.GUILD_ID
  ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
  : Routes.applicationCommands(process.env.CLIENT_ID);

await rest.put(route, { body: commands });
console.log(`✅ Registered ${commands.length} slash commands${process.env.GUILD_ID ? " (guild-only, instant)" : " (global, may take up to 1h)"}.`);
