# La Pony Bakery — website

A three-page website for La Pony, an Argentine micro-bakery in Aarhus. Plain HTML, CSS and JavaScript — no frameworks, no build step.

## Pages

| File | Contents |
|---|---|
| `index.html` | Header with the awning, hero, marquee, two menu cards with prices and a quantity counter, footer |
| `story.html` | The owner's story, the "Why La Pony" note, a behind-the-scenes block linking to Instagram |
| `contact.html` | Contact form with validation and the pop-up market details |

## Structure

```
la-pony-site/
├── index.html
├── story.html
├── contact.html
├── css/
│   └── style.css      # all styles; colours are CSS variables in :root
├── js/
│   └── main.js        # menu, prices, counter, cart, form
├── img/
│   ├── medialunas.jpg
│   └── valeria.jpg
└── README.md
```

## What the JavaScript does

- **Mobile menu:** the burger button opens and closes the navigation.
- **Price choice:** clicking Dozen or Half dozen selects that option and recalculates the total.
- **Quantity:** the − and + buttons change the amount between 1 and 20.
- **Cart:** "Add to order" increases the counter in the header.
- **Reveal on scroll:** menu cards fade in using `IntersectionObserver`.
- **Behind the scenes:** the ▶ button on My Story links to the bakery's Instagram.
- **Form:** name, email and message are validated, with inline error messages.

## Run it locally

Open `index.html` in a browser. The Live Server extension for VS Code is handy for auto-reload.

## Live site

Published with GitHub Pages: https://tania-coder.github.io/la-pony-site/

## To do

- Replace the `Facturas photo` placeholder in `index.html` with a real photo.
- Swap `img/medialunas.jpg` and `img/valeria.jpg` for high-resolution originals.
- Replace `<div class="info__map">Map</div>` in `contact.html` with a Google Maps iframe.
- The form does not send anything yet. Add an `action` attribute pointing to a service such as Formspree to receive messages.

## Fonts

Bricolage Grotesque and Caveat load from Google Fonts. Offline, the browser falls back to the families listed in `--font-main` and `--font-script`.

## Credits

Design and code by Tetiana Radchenko, built with AI assistance. Photos by La Pony Bakery.
