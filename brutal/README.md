# Brutal Template

A third, genuinely different starting point: high-contrast black/white/
yellow, thick borders, hard offset shadows (no blur, no gradients),
monospace display type, a scrolling marquee banner. Neo-brutalist —
opposite end of the spectrum from the dark, minimal `templates/website`.

No build step, no framework.

## Usage

```bash
npx degit Zephyr-Zephyr/Beyond/templates/brutal my-site
cd my-site
# open index.html in your browser, or serve it locally with e.g. npx serve .
```

## Structure

```
index.html            Page structure
assets/style.css        Design tokens (colors/type) + styles
assets/script.js          Mobile menu, current year in footer
```

Colors, border width, and shadow offset are all CSS variables at the top
of `assets/style.css` — change `--yellow`, `--border-w`, or
`--shadow-offset` to retune the whole look.
