# Bearing Witness - 9/11

An interactive map documenting the photographers, filmmakers, and fixed cameras that recorded September 11, 2001, in Lower Manhattan - where they were, what they captured, and how well each claim is sourced.

This is a non-commercial preservation project. It is not affiliated with, endorsed by, or produced on behalf of the National September 11 Memorial & Museum or any of the individuals, families, or estates referenced in it.

## What's here

- **Movement Timeline** - 15 photographers and film crews whose documented movements across the day (or, for a few, the weeks after) are plotted with a stepped timeline.
- **Fixed Vantage Points** - 6 people or fixed cameras whose single, well-documented position and what they captured from it are the whole story.

## Methodology

Every waypoint carries a confidence tier:

- **Confirmed** - timestamped footage, a photograph, or a strongly corroborated firsthand account.
- **Reconstructed** - drawn from multiple consistent secondary accounts.
- **Estimated** - a single source, or a position inferred from timing and geography.

No photograph or video is hosted or reproduced here unless it is a verified U.S. government work (public domain). Everything else links out to the institution, estate, or original publisher that holds the rights.

## Project structure

```
index.html       - page markup
css/style.css     - all styling
js/data.js        - the people, entries, and landmark coordinates (start here to add/edit content)
js/app.js         - map rendering, timeline, filtering, and all interaction logic
```

To add a person or vantage point, edit `js/data.js` only - the `PEOPLE` array for the Movement Timeline, `ENTRIES` for Fixed Vantage Points. Each waypoint/entry requires real, checkable sourcing; see existing entries for the expected format and level of citation.

## Running locally

No build step. Clone the repo and open `index.html` in a browser, or serve the folder with any static file server (e.g. `python3 -m http.server`).

## Deploying

Designed for GitHub Pages: push to a repository, enable Pages in repo settings (source: main branch, root), done. A custom domain can be added via a CNAME record pointing at the GitHub Pages URL.

## Contact

Errors, corrections, or source issues: see the link in the site footer.

## AI Usage

This project was researched and developed with the assistance of Claude (Anthropic), directed, fact-checked, and edited by Shaun Lappin. All editorial decisions - what to include, how to handle sensitive material, and where to draw lines respectfully - were mine.
