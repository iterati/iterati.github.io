---
layout: post
title: "Primer Ate Hex"
date: 2015-11-05T00:00:00.000Z
categories: osm
published: true
---

After the Halloween Edition, Hex is shelved for the time being. While Hex and Primer share much in common, the most tedious code shared between them does not. This is mostly the button-handling code, but it's the largest block and maintaining features in both firmwares increases the chance of bugs being introduced so until Primer is near complete, Hex will remain stagnant.

With the bad news out of the way, Primer is ready for a new release and it now boasts 16 modes and 16 color slots per variation. For those missing Hex, just disable the accelerometer on every mode and you basically have Hex all over again with just an added menu for configuration. I feel this is the best compromise between features offered and driving myself insane.

Full instructions for Primer can be found on it's [documentation page](/primer.html). The latest .hex (v0.3) can be found [here](/firmwares/primer_v0_3.hex).

## Change Log

* Increased mode and bundle slots to 16
* Increased color slots to 16 per mode
* Decreased hold times for on-chip interface for faster navigation
* Swapped Conjure and Configure sentinel times (conjure now comes after config)
* Reduced color palette slots to 31 for rebalancing (will increase palette size in the future)
* Removed gamma table
* Reduced trigger thresholds for tilt and flip accelerometer triggers
* Fixed bug in tilt and flip sensitivities (high means high now, not low)
* Reworked speed trigger to be more consistent
* Simplified button control logic
* Master Reset resets modes and bundles (before just modes)
* Master Reset clears all EEPROM memory (prevents some bugs)
* Better accelerometer handling improves syncronization of lights
* Synconized timers on all three color channels (better color representation)
* Changed timing of some patterns
