# Notes

Each note is a Markdown file here named `<date>-<slug>.md` (`2026-11-20-elements.md`), served at `/notes/<slug>/`.
Its front matter:

```
---
title: Why I hand out rhombic dodecahedra
date: 2026-11-20
toy: elements
blurb: Twelve faces, one rhombus, and no gaps.
---
```

`toy` (optional) is a toy's key from `src/words.ts`. Pictures go in `img/` beside the notes; a picture alone in
its paragraph becomes a figure, its title the caption: `![A patch of them](img/patch.webp "Seen straight down the long diagonal.")`.
This README is not a note: only files named by date are.
