# 🌙 Lunaris Mini System

Der zentrale Discord-Bot von Lunaris Mini. Ein einziger Bot, alle
Kernfunktionen — bekommt nach und nach weitere Module.

Eigenständiges Projekt, unabhängig von den anderen Lunaris-Mini-Bots
(`discord-ticket-bot`, `giveaway-bot`, `welcome-bot`).

## Module

**🤖 Core**
`/help` `/ping` `/about` `/serverinfo` `/userinfo`

**🛡️ Moderation**
`/ban` `/kick` `/timeout` `/warn` `/warnings` `/clearwarnings` `/clear`
— inkl. Warn-System und Moderations-Logs, respektiert Discords
Rollen-Hierarchie (kein Moderieren gleich- oder höherrangiger Mitglieder).

**🎫 Tickets**
`/ticket-category add|remove|list` — beliebig viele Kategorien mit
eigener Discord-Kategorie und Support-Rolle
`/ticket-panel` — postet ein Auswahlmenü, aus dem Nutzer:innen eine
Kategorie wählen. Tickets lassen sich per Button **schließen**,
**wieder öffnen** und **löschen**.

**📋 Logging**
`/set-log-channel` · `/toggle-log-event`
Protokolliert Member Join/Leave, Message Delete/Edit, Moderationsaktionen,
Rollenänderungen und Channel-Änderungen — jedes Event einzeln an/aus.

**👋 Welcome**
`/set-welcome` · `/set-leave` · `/set-autorole`
Konfigurierbare Nachrichten mit Platzhaltern: `{user}`, `{username}`,
`{server}`, `{membercount}`.

## Setup

```bash
cp .env.example .env
# Werte in .env eintragen
npm install
npm run deploy-commands
npm start
```

### Discord Developer Portal

Unter **Bot** müssen diese privilegierten Intents aktiviert sein:
- **Server Members Intent**
- **Message Content Intent**

Ohne diese startet der Bot zwar, aber Welcome/Leave, Autorole und
Message-Logging funktionieren nicht.

### Berechtigungen beim Einladen

Der Bot braucht mindestens: `Manage Roles`, `Manage Channels`,
`Kick Members`, `Ban Members`, `Moderate Members`, `Manage Messages`,
`View Channels`, `Send Messages`, `Read Message History`.

## Architektur

```
src/
├── index.js              Lädt alle Commands & Events automatisch
├── deploy-commands.js      Registriert Slash-Commands bei Discord
├── store.js                 Persistenz (JSON-Datei, siehe unten)
├── utils.js                  Embeds, Permission-Checks, Duration-Parser
├── tickets.js                 Ticket-Logik (create/close/reopen/delete)
├── commands/
│   ├── core/, moderation/, tickets/, logging/, welcome/
└── events/
    └── ready, interactionCreate, guildMemberAdd/Remove,
        messageDelete/Update, guildMemberUpdate, channelCreate/Update/Delete
```

Neues Modul hinzufügen = neue Datei in `commands/<kategorie>/` mit
`export const data` (SlashCommandBuilder) und `export async function
execute(interaction)` ablegen — wird beim nächsten Start automatisch
geladen und mit `npm run deploy-commands` registriert. Kein manuelles
Verdrahten nötig.

## Persistenz

Konfiguration und Warnungen liegen in `data/guilds.json` (wird beim
ersten Start automatisch angelegt). Reicht für einen Single-Instance-Bot
auf überschaubar vielen Servern. Für größeren Maßstab `store.js` gegen
eine echte Datenbank austauschen — der Rest des Bots ruft ausschließlich
die dort exportierten Funktionen auf (`getGuildConfig`, `saveGuildConfig`,
`addWarn`, `getWarns`, `clearWarns`), also genügt es, `store.js` zu
ersetzen.

## Lizenz

MIT
