# 🌙 Lunaris Mini — v0.0.1

Early, incomplete first release. This is everything that's actually
ready right now — not a roadmap promise.

```
lunaris-mini/
├── bots/
│   └── lunaris-mini-system/   The central bot: Core, Moderation,
│                                Tickets, Logging, Welcome
├── templates/
│   └── website/                 Framework-free HTML/CSS/JS starter template
├── website/                       The actual lunaris-mini.com landing page
│                                    (pre-launch / "coming soon" state)
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## What works

- **`bots/lunaris-mini-system`** — fully working Discord bot with 19
  slash commands. Setup instructions in its own `README.md`.
- **`templates/website`** — starter template for your own web projects,
  no build step needed.
- **`website`** — the real Lunaris Mini landing page. Not public yet,
  so "Log in" and the GitHub links currently show a "coming soon" panel
  instead of doing anything live.

## What's still missing (planned for later versions)

- `developer-tools/` (motd-generator, embed-builder, json-formatter)
- `libraries/node` (shared utils package)
- `templates/nextjs`, `templates/discord-bot`
- A live, public GitHub repository for `website` to link to
- More standalone bots

See [CHANGELOG.md](./CHANGELOG.md) for details on this release.

## License

MIT — see [LICENSE](./LICENSE).
