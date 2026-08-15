# Studio Template

A second, deliberately different starting point from `templates/website`:
warm paper background, serif display type, numbered sections — an
editorial/portfolio feel instead of the dark tech look used elsewhere in
Lunaris Mini. Good for a studio, agency, or personal portfolio site.

No build step, no framework — open `index.html` and go.

## Usage

```bash
npx degit lunaris-mini/lunaris-mini/templates/studio my-site
cd my-site
# open index.html in your browser, or serve it locally with e.g. npx serve .
```

## Structure

```
index.html            Page structure
assets/style.css        Design tokens (colors/type) + styles
assets/script.js          Mobile menu, current year in footer
```

Colors and fonts live as CSS variables at the top of `assets/style.css`.
The underline accent under the hero headline is a hand-drawn SVG path —
edit it directly in `index.html` (`.underline path`) if you want a
different squiggle.
