# JS Obfuscation Tools

Production-ready Jekyll static site for JavaScript obfuscation and reverse deobfuscation tools, optimized for GitHub Pages.

Live site: `https://itisuniqueofficial-gh.github.io/js-obfuscation-tools/`

## Overview

This project provides two browser-based developer tools:

- `HEX + Base64 JS Obfuscator`
- `JS Reverse Deobfuscator`

The site is fully static, GitHub Pages compatible, and structured as a reusable Jekyll project with shared layouts, includes, and a small design system.

## Features

- Jekyll-compatible project structure
- GitHub Pages deployment ready
- Shared layouts and includes
- Responsive UI design system
- Dark mode support
- Basic SEO setup
- Basic PWA support with manifest and service worker
- Browser-only processing with no backend

## Project Structure

```text
_config.yml
_includes/
  card.html
  footer.html
  header.html
  hero.html
  nav.html
  tool-panel.html
_layouts/
  default.html
  page.html
  post.html
assets/
  css/
    main.css
  js/
    main.js
deobfuscator.html
index.html
manifest.webmanifest
robots.txt
service-worker.js
sitemap.xml
README.md
```

## Local Development

### Prerequisites

- Ruby
- Bundler
- Jekyll

### Install

```bash
gem install bundler jekyll
```

### Run Locally

```bash
jekyll serve
```

Then open:

```text
http://127.0.0.1:4000/js-obfuscation-tools/
```

If you want GitHub Pages parity locally, use the `github-pages` gem in a `Gemfile` and run with Bundler.

## GitHub Pages Configuration

Current Pages settings:

- Branch: `master`
- Folder: `/ (root)`
- URL: `https://itisuniqueofficial-gh.github.io/js-obfuscation-tools/`

Important `_config.yml` values:

```yml
url: "https://itisuniqueofficial-gh.github.io"
baseurl: "/js-obfuscation-tools"
```

## Design System Notes

The UI keeps the original developer-tool identity while improving structure and consistency.

- Spacing uses a tokenized 4px/8px-based scale
- Typography uses responsive `clamp()` sizing
- Layout uses reusable hero, workspace, and card patterns
- Dark mode is supported through CSS variables
- Components are built as reusable Jekyll includes

## Accessibility

- Semantic landmarks
- Keyboard-friendly navigation
- Skip link support
- Accessible status messaging
- Improved contrast in both themes

## SEO and PWA

- Canonical URLs
- Open Graph and Twitter metadata
- `robots.txt`
- `sitemap.xml`
- `manifest.webmanifest`
- `service-worker.js`

## Notes

- The tools process input entirely in the browser.
- No backend or data storage is used.
- The generated obfuscation format is intended for lightweight encoding workflows, not strong security.

## License

Add your preferred license for public reuse and distribution.
