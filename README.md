# 🚀 Beyond — v0.0.2

Early, incomplete release. This is everything that's actually ready
right now — not a roadmap promise.

```
beyond/
├── bots/
│   └── beyond-system/   The central bot: Core, Moderation,
│                                Tickets, Logging, Welcome
├── developer-tools/
│   ├── motd-generator/           Minecraft-style MOTDs with color preview
│   ├── embed-builder/             Build a Discord embed as JSON
│   └── json-formatter/             Format / validate / minify JSON
├── libraries/
│   └── node/                       Shared utils used by the bots & tools
├── templates/
│   ├── website/                  Framework-free HTML/CSS/JS starter template
│   ├── brutal/                    High-contrast black/white/yellow, thick
│   │                                borders, hard shadows
│   └── aurora/                    Soft pastel gradients, glass cards,
│                                    rounded everything
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## What works

- **`bots/beyond-system`** — fully working Discord bot with 19
  slash commands. Setup instructions in its own `README.md`.
- **`developer-tools/`** — three small CLIs: `motd-generator`,
  `embed-builder`, `json-formatter`. Each has its own `README.md`.
- **`libraries/node`** — the shared `@beyond/utils` package
  (logger, time helpers) used across the bots and tools.
- **`templates/website`**, **`templates/brutal`**, **`templates/aurora`**
  — three starter templates, three different looks. Pick whichever fits.
- **`website`** — the Beyond landing page: what the toolkit is,
  the module categories, and a quickstart. Links straight to this repo
  on GitHub.

## What's still missing (planned for later versions)

- `templates/nextjs`, `templates/discord-bot`
- More standalone bots

See [CHANGELOG.md](./CHANGELOG.md) for details on this release.

## License

MIT — see [LICENSE](./LICENSE).
