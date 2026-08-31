# Changelog

## [0.0.2] – Website + a second template

### Added
- `templates/brutal` — a second starter template, deliberately different
  from `templates/website`: high-contrast black/white/yellow, thick
  borders, hard offset shadows, monospace headlines, scrolling marquee
- `templates/aurora` — a third starter template: soft pastel gradients,
  glassmorphism cards, rounded pill buttons
- `developer-tools/` — `motd-generator`, `embed-builder`, `json-formatter`
- `libraries/node` — the shared `@beyond/utils` package

### Changed
- `README.md` updated to list every module now included

## [0.0.1] – First public release

Early, incomplete release — most of Beyond isn't built yet. This is
what actually works today, not a roadmap promise.

### Included
- `bots/beyond-system` — the central Discord bot: Core, Moderation,
  Tickets, Logging, Welcome
- `templates/website` — framework-free HTML/CSS/JS starter template
  (translated to English this release; was German before)

### Not in this release yet
- `website` (landing page) — added in 0.0.2
- A second template — added in 0.0.2 (`templates/brutal`, `templates/aurora`)
- `developer-tools/` — added in 0.0.2
- `libraries/node` — added in 0.0.2
- `templates/nextjs`, `templates/discord-bot`
- Standalone example bots (ticket/giveaway/welcome bots) — superseded by
  `beyond-system`, may return as separate minimal examples later

See [README.md](./README.md) for the current state and what's planned.
