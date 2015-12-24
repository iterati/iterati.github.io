---
layout: post
title: "Pattern Theory Volume 2"
date: 2015-12-21
categories: osm
published: true
---
The last pattern theory was me collecting some thoughts as I was finalizing the newest releast of [Primer](/primer.html). In this one I'll go through some of my thoughts on a few of the patterns.


## Basic Strobe Timings

My basic strobe timings are all times around 25, 50, 100, or 200ms strobe times. This allows for some measure of syncing between variants when designing accelerometer modes. Ribbon, Strobe, Nano, and Dops all use 25ms timing totals, Slow Strobe and Strobie both use 50ms totals, and Hyper and Faint both use 100. Signal is the only pattern that uses 200ms timings.


## Blaster and Blaster3

Blaster and Blaster3 are two of my favorite patterns. They're similar to Blink-E in that they stribbon with a long blank and short ribbon time, but I am using 2.5ms strobe timines and 70ms blank times which are a bit more extreme. The quick ribbon time allows for the colors to bleed together, especially when combined with a frosted diffuser.

Blaster3 uses strobe-groups of 3 colors with any empty spaces in the last set padded with blanks (i.e. a 4 color palette will blink the first 3 colors and then the 4th followed by 2 blanks). This allows for multiple color patterns that alternate as if in a strobe. Using a bright color followed by a dim or two allows for ghost trails that appear in front of the light. Using the bright color at the end diminishes the strobe factor a bit on the eyes and makes the trail appear behind the color.

Blaster has a 5ms ribbon time variant in Heavy Blaster, and a strobed version in Auto Blaster. Neither can use the ghosting effect as well as Blaster itself, but noth offer their own unique effects.


## Hyper3 and Dops3

Hyper3 and Dops3 are the two "pick 3" variants of the Candy Strobe. They are also syncronized. If using an accelerometer trigger to switch variants, using the same palette on both and using Hyper3 or Dops3 will result in only the timing of the strobes changing, not the selection of colors. This is on display in the first default mode that comes with Primer 0.8. Alternating between the two variants doesn't result in any jarring changes to the colors, but the timings change radically.


## Razor and Razor5

Razor shares many of the same traits as Blaster, with the added effect of both being in front and behind the main color. Using dim colors near the end followed by a color that strongly contrasts the previous color can lead to halos appearing around the center color or other interesting effects. Razor5 expects sets of 5 colors as Blaster 3 expected 3. Having 3 edges with the same center color but varied halos is a great effect. If the halo effect being lost during fast movement is an issue, it might work to transition into the Sword pattern instead and take advantage of the longer edge timings to produce more interesting trails.
