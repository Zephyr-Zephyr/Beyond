# Aurora Template

A third starting point, soft where `brutal` is hard and calmer than
`website`: pastel gradient blobs, glassmorphism cards, rounded pill
buttons, friendly rounded display type. Good for a product or SaaS-style
landing page.

No build step, no framework.

## Usage

```bash
npx degit Zephyr-Zephyr/Beyond/templates/aurora my-site
cd my-site
# open index.html in your browser, or serve it locally with e.g. npx serve .
```

## Structure

```
index.html            Page structure
assets/style.css        Design tokens (colors/radius) + styles
assets/script.js          Mobile menu, current year in footer
```

The three blurred background shapes are plain `<div>`s positioned with
CSS (`.blob-a/b/c` in `assets/style.css`) — no images. Change their
`background` color or `top/left/right/bottom` position to retune the
glow.
