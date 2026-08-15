// Lunaris Mini System — persistent per-guild storage.
// Simple JSON file store: enough for a single-instance "mini" bot,
// no external database required. Swap this module out for a real DB
// if you outgrow it later — everything else calls only the functions
// exported here.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const DATA_FILE = join(DATA_DIR, "guilds.json");

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
if (!existsSync(DATA_FILE)) writeFileSync(DATA_FILE, "{}");

let cache = JSON.parse(readFileSync(DATA_FILE, "utf-8"));

function persist() {
  writeFileSync(DATA_FILE, JSON.stringify(cache, null, 2));
}

function defaultGuildConfig() {
  return {
    logChannelId: null,
    logEvents: {
      memberJoin: true,
      memberLeave: true,
      messageDelete: true,
      messageEdit: true,
      moderation: true,
      roleChange: true,
      channelChange: true,
    },
    welcome: { channelId: null, message: "Welcome {user} to **{server}**! 🎉", enabled: false },
    leave: { channelId: null, message: "{user} has left **{server}**.", enabled: false },
    autoroleId: null,
    ticketCategories: {}, // name -> { categoryId, supportRoleId }
    ticketCounter: 0,
    warns: {}, // userId -> [{ reason, moderatorId, timestamp }]
  };
}

export function getGuildConfig(guildId) {
  if (!cache[guildId]) {
    cache[guildId] = defaultGuildConfig();
    persist();
  }
  return cache[guildId];
}

export function saveGuildConfig(guildId, config) {
  cache[guildId] = config;
  persist();
}

export function addWarn(guildId, userId, warn) {
  const config = getGuildConfig(guildId);
  if (!config.warns[userId]) config.warns[userId] = [];
  config.warns[userId].push(warn);
  saveGuildConfig(guildId, config);
  return config.warns[userId];
}

export function getWarns(guildId, userId) {
  const config = getGuildConfig(guildId);
  return config.warns[userId] || [];
}

export function clearWarns(guildId, userId) {
  const config = getGuildConfig(guildId);
  delete config.warns[userId];
  saveGuildConfig(guildId, config);
}
