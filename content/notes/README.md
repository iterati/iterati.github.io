# Notes

Each note is a Markdown file here named `<date>-<slug>.md` (`2026-11-20-a-slug.md`), served at `/notes/<slug>/`.
Its front matter:

```
---
title: The note's title
date: 2026-11-20
toy: elements
blurb: One line for the notes list.
---
```

`toy` (optional) is a toy's key from `src/words.ts`. Pictures go in `img/` beside the notes; a picture alone in
its paragraph becomes a figure, its title the caption: `![What it shows](img/picture.webp "The caption.")`.
This README is not a note: only files named by date are.
