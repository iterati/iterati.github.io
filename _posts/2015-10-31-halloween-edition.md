---
layout: post
title: "Halloween Edition"
date: 2015-10-31T00:00:00.000Z
categories: osm
published: true
---
Both [Hex](http://github.com/iterati/hex) and [Primer](http://github.com/iterati/primer) have been updated with a few new features for Halloween.

You can grab the files here:

* [Hex .hex](/firmwares/hex_halloween.hex)
* [Hex .dmg](/firmwares/Hex Halloween Edition.dmg)
* [Primer .hex](/firmwares/primer_halloween.hex)
* [Primer .dmg](/firmwares/Primer Halloween Edition.dmg)


## No Longer NEO Compatible

NEO, Primer, and Hex all try to use the EEPROM storage to store your bundles and mode configurations. While I had initially tried to keep compatible with NEO customizations, the memory requirements of Hex and Primer are such that there can be conflicts with NEO settings. To fix this, I am clearning the EEPROM on version mismatch detect and writing the Hex or Primer defaults to EEPROM.

As part of this change, the EEPROM address used to store the version number has changed from 512 to 1023.


## Master Reset

Master Reset allows you to reflash the defaults to your EEPROM and load your light as if it were first flashed. To trigger a Master Reset, turn the light off and hold for 4s until the light flashes red. Upon release, the memory will be reset.


## Custom BPM Auto-changing

Mode auto-changing can be enabled for any bundle.

1) Turn off the light
2) Hold for 1.5s until the light flashes blue and release (Enter Bundle Select menu)
3) Click to select the bundle you want to use
4) Hold for 4.5s until the light flashes green and release (Set BPM)
5) Click once on the downbeat of a bar to start the timer
6) Click again on the downbeat of the next 4 bars to set the BPM counter
7) After the BPM counter is set, the bundle will be selected and the mode will auto-change every 16 bars
  * **Note** Switching modes or turning the light off will reset the counter
8) To deactivate BPM auto-changing, turn off the light and enter the Bundle Select menu and select any bundle


## Lowered Hold Times

Hold times across the board. Anything that took 2 seconds takes 1.5 and anything that took 1.5 takes 1.


## Bug Fixes

There are a handful of bugs for modes that were not tested enough and some other issues with the core code.

The code has also been reorganized to support easier sharing of changes between Hex and Primer for faster development in the future.
