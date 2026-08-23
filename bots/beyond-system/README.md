# 🚀 Beyond System

The central Discord bot of Beyond. One single bot, all the core
features — gains more modules over time.

Standalone project, independent from the other Beyond bots
(`discord-ticket-bot`, `giveaway-bot`, `welcome-bot`).

## Modules

**🤖 Core**
`/help` `/ping` `/about` `/serverinfo` `/userinfo`

**🛡️ Moderation**
`/ban` `/kick` `/timeout` `/warn` `/warnings` `/clearwarnings` `/clear`
— includes a warn system and moderation logs, respects Discord's role
hierarchy (can't moderate equal- or higher-ranked members).

**🎫 Tickets**
`/ticket-category add|remove|list` — as many categories as you want,
each with its own Discord category and support role
`/ticket-panel` — posts a select menu users can pick a category from.
Tickets can be **closed**, **reopened**, and **deleted** via buttons.

**📋 Logging**
`/set-log-channel` · `/toggle-log-event`
Logs member join/leave, message delete/edit, moderation actions, role
changes, and channel changes — each event toggled on/off individually.

**👋 Welcome**
`/set-welcome` · `/set-leave` · `/set-autorole`
Configurable messages with placeholders: `{user}`, `{username}`,
`{server}`, `{membercount}`.

## Setup

```bash
cp .env.example .env
# fill in the values in .env
npm install
npm run deploy-commands
npm start
```

### Discord Developer Portal

Under **Bot**, these privileged intents need to be enabled:
- **Server Members Intent**
- **Message Content Intent**

Without these the bot still starts, but welcome/leave, autorole, and
message logging won't work.

### Permissions when inviting

The bot needs at least: `Manage Roles`, `Manage Channels`,
`Kick Members`, `Ban Members`, `Moderate Members`, `Manage Messages`,
`View Channels`, `Send Messages`, `Read Message History`.

## Architecture

```
src/
├── index.js              Loads all commands & events automatically
├── deploy-commands.js      Registers slash commands with Discord
├── store.js                 Persistence (JSON file, see below)
├── utils.js                  Embeds, permission checks, duration parser
├── tickets.js                 Ticket logic (create/close/reopen/delete)
├── commands/
│   ├── core/, moderation/, tickets/, logging/, welcome/
└── events/
    └── ready, interactionCreate, guildMemberAdd/Remove,
        messageDelete/Update, guildMemberUpdate, channelCreate/Update/Delete
```

To add a new module: drop a new file in `commands/<category>/` that
exports `export const data` (a SlashCommandBuilder) and `export async
function execute(interaction)` — it's loaded automatically on the next
start and registered with `npm run deploy-commands`. No manual wiring
needed.

## Persistence

Configuration and warnings live in `data/guilds.json` (created
automatically on first start). Enough for a single-instance bot on a
reasonable number of servers. For larger scale, swap `store.js` for a
real database — the rest of the bot only ever calls the functions it
exports (`getGuildConfig`, `saveGuildConfig`, `addWarn`, `getWarns`,
`clearWarns`), so replacing `store.js` is all it takes.

## License

MIT
