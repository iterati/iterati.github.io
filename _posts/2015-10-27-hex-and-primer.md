---
layout: post
title: "Meet Hex and Primer!"
date: 2015-10-27T00:00:00.000Z
categories: osm
published: true
---

# Meet Hex and Primer!
[Hex](http://github.com/iterati/hex) and [Primer](http://github.com/iterati/primer) are glover-focused firmwares for the Open Source Microlight (OSM). The goal of these firmwares is to maximize customization with an easy to use interface allowing glovers to truly leverage their creativity. The two share their palettes, strobe animations, the ability to select between and customize 4 bundles (mode playlists), conjuration mode, and the color and prime configuration control methods. They differ in their core concept that they try to perfect.

## Hex
Hex is the most customizable classic microlight firmware on the market today. Featuring:

* 16 Strobe Animations
* 16 Mode Slots
* 16 Color Slots per Mode
* 62 Color + Blank Palette
* 4 Shades per Color
* 4 16-slot Bundles
* Conjuring Mode
* and an Easy to Use Configuration Interface

Hex allows you to not only express your  possibilities, it lets you experiment with mode playlists to take every show down a different journey. The 16 color slots per mode allow you to use blanks to create new patterns and timings without sacraficing color variety.

## Primer
Primer is an attempt to perfect the "accelerometer as a switch", 2 variant light. Featuring:

* 16 Strobe Animations
* 12 Mode Slots with 2 Variations per Mode
* 12 Color Slots per Variation
* 62 Color + Blank Palette
* 4 Shades per Color
* 4 12-slot Bundles
* 4 (+ Off) Accelerometer Trigger Functions
* 3 Sensitivity Levels
* Conjuring Mode
* Easy to Use Configuration Interface

Primer gives your shows a different dimension with the accelerometer triggers allowing for instant transitions mid-show.

# Features
## Bundles
Bundles represent mode playlists. Both Hex and Primer come with 4 bundles that can be selected and reconfigured through a simple menu. Bundles can include 1 to 12 (16 for Hex) modes.

## Conjuration Mode
Conjuration mode can be enabled for any active mode. When enabled, clicking will cycle the light off and on rather than cycle through modes. Conjuration mode is automatically disabled when powering off the light.

## Palette
The palette consists of 62 colors + a blank. The palette is based on the RGB color wheel. The 3 primary colors are, of course, red, green, and blue. The colors in the middle are yellow (red and green), cyan (green and blue), and magenta (blue + red). These 6 colors represent the 6 "major" colors in my palette. My palette is also broken down into 4 major sections based on these colors. Each color has 4 shading levels to chose from.

### Section 1: Blank + Dims
0 indicates showing a blank in place of a color for that part of the animation.
1 is a dim white for when you want a dim white.
The next 6 are dim versions of the 6 major colors.

### Section 2: Color Wheel
The 24 colors from 8 through 31 represent a balanced blend of the 6 major colors from red back around to red with 4 steps in between each major color. These colors are shown at the maximum saturation or vibrancy.

### Section 3: Saturated Majors
The 24 colors from 32 through 55 represent 4 different saturation levels for each of the 6 major colors. Including the colors from section 2, this gives 5 saturation levels per color.

### Section 4: White + Experimentals
This section is for experimental colors and a bright white

### Palette Grid

**Note** that the image your monitor shows you differs from the color your LED will display. This is an approximation than exact. Anything grey will look more white on your light.

![Palette](/images/palette.png)

## Strobe Animations
There are 16 Strobe animations to chose from for each of your modes. The images below to demonstrate each mode are also the defaults modes stored on Hex.

**Note** that as with the palette image, all colors are estimations. The colors on your lights will vary from the images.

### Strobe - Mode 1
![Strobe](/images/anim01.png)

### Hyper - Mode 2
![Hyper](/images/anim02.png)

### Dops - Mode 3
![Dops](/images/anim03.png)

### Strobie - Mode 4
![Strobie](/images/anim04.png)

### Pulse - Mode 5
![Pulse](/images/anim05.png)

### Seizure - Mode 6
![Seizure](/images/anim06.png)

### Tracer - Mode 7
![Tracer](/images/anim07.png)

### Dash dops - Mode 8
![Dash dops](/images/anim08.png)

### Blink-E - Mode 9
![Blink-E](/images/anim09.png)

### Edge - Mode 10
![Edge](/images/anim10.png)

### Lego - By Andrew Suchan - Mode 11
![Lego](/images/anim11.png)

### Chase - Mode 12
![Chase](/images/anim12.png)

### Morph - Mode 13
![Morph](/images/anim13.png)

### Ribbon - Mode 14
![Ribbon](/images/anim14.png)

### Comet - Based on "Ember" by Andrew Suchan - Mode 15
![Comet](/images/anim15.png)

### Candy - Mode 16
![Candy](/images/anim16.png)

## Accelerometer Triggers
Primer has 4 different accelerometer triggers that switch between variants. Each trigger has 3 sensitivity levels. Accelerometer triggers and sensitivities are configurable on-chip.

### Acceleration
Acceleration mode tracks the g-forces the light is under. When over a threshold for a period of time, the variations switch and stay switched until the light comes to rest for 0.25 seconds. For low and medium sensitivities, the threshold is high enough that motion on multiple axes is required to trigger the switch while fast enough acceleration along a single axis is enough to trigger the highest sensitivity setting. The threshold time for low, medium, and high are 0.15, 0.25, and 0.5 seconds respectively.

### Tilt X
Tilt X mode triggers when the light points upwards to the sky or downwards to the floor. Your hands must be over 75 degrees either up or down for 0.15, 0.3, and 0.45 seconds for high, medium, and low sensitivities respectively to swap variations.

### Tilt Y
Tilt Y triggers when the button side of the light faces either the right or left. As with Tilt X, the tilt must be greater than 75 degrees for the 0.15, 0.3, and 0.45 second thresholds before swapping.

### Flip Z
Flip Z triggers when the button faces up to the sky or down to the floor. When the g-forces along the Z axis are near 1g for the 0.15, 0.3, and 0.45 thresholds, the variant swaps.

## Primer Defaults
The 12 Primer defaults include one mode for each accelerometer trigger and sensitivity. This can easily be changed through the configuration interface, but you can use them to get a handle on how each mode feels.

### Mode 1
![Mode 1](/images/mode01.png)

### Mode 2
![Mode 2](/images/mode02.png)

### Mode 3
![Mode 3](/images/mode03.png)

### Mode 4
![Mode 4](/images/mode04.png)

### Mode 5
![Mode 5](/images/mode05.png)

### Mode 6
![Mode 6](/images/mode06.png)

### Mode 7
![Mode 7](/images/mode07.png)

### Mode 8
![Mode 8](/images/mode08.png)

### Mode 9
![Mode 9](/images/mode09.png)

### Mode 10
![Mode 10](/images/mode10.png)

### Mode 11
![Mode 11](/images/mode11.png)

### Mode 12
![Mode 12](/images/mode12.png)

# Controls
Most of the controls are shared between Hex and Primer, but Primer has a config menu to help select between the 6 configuration states.

## Hex Controls
### Off
* Press - Turn on. Go to **Play**.
* Hold 1.5s - Go to **Bundle Select**. Flashes blue.

### Bundle Select
* Press - Cycle bundle.
* Hold 1.5s - Selects current bundle. Go to **Play**. Flashes blue.
* Hold 3.0s - Go to **Bundle Edit**. Flashes yellow.

### Bundle Edit
* Press - Cycle bundle slot to next mode.
* Hold 1.5s - Sets current bundle slot to selected mode. Cycles to next bundle slot. Flashes magenta.
* Hold 3.0s - Saves bundle with current bundle slot as the end of the bundle. Go to **Play**. Flashes white.

### Play (Normal Mode)
* Press - Cycle to next mode.
* Hold 1.0s - Put light to sleep. Flashes white.
* Hold 2.5s - Enables **Conjure Mode**. Flashes blue.
* Hold 4.0s - Go to **Palette Config**. Flashes yellow.
* Hold 5.5s - Go to **Prime Config**. Flashes yellow.

### Play (Conjure Mode)
* Press - Toggle light on/off (processor still running).
* Hold 1.0s - Turn off light and deactivate Conjure Mode. Flashes white.
* Hold 2.5s - Disable **Conjure Mode**. Flashes blue.
* Hold 4.0s - Go to **Config Select**. Flashes yellow.

### Palette Config
* Press - Cycle forward through palette options.
* Dpress - Cycle backward through palette options.
* Hold 1.5s - Select color. Flashes white.
* Hold 1.5s more - Cycle to next shade. Flashes white.
* Release after hold - Go to **Confirm Color**.

### Confirm Color
* Press - Accept color.
  * If last (12th) color slot, go to **Play** and save. Flashes white.
  * Otherwise just go to next color slot.
* Hold 1.5s - Reject color.
  * If first color slot, go to **Config Palette**. Flashes red.
  * Otherwise, go to **Confirm Color** for previous color slot. Flashes red.
* Hold 3.0s - Accept and save. Sets current color slot as last color. Go to **Play**. Flashes white.

### Prime Config
* Press - Cycles to next prime.
* Hold 1.5s - Accept and save. Go to **Play**. Flashes white.

## Primer Config
### Off
* Press - Turn on. Go to **Play**.
* Hold 1.5s - Go to **Bundle Select**. Flashes blue.

### Bundle Select
* Press - Cycle bundle.
* Hold 1.5s - Selects current bundle. Go to **Play**. Flashes blue.
* Hold 3.0s - Go to **Bundle Edit**. Flashes yellow.

### Bundle Edit
* Press - Cycle bundle slot to next mode.
* Hold 1.5s - Sets current bundle slot to selected mode. Cycles to next bundle slot. Flashes magenta.
* Hold 3.0s - Saves bundle with current bundle slot as the end of the bundle. Go to **Play**. Flashes white.

### Play (Normal Mode)
* Press - Cycle to next mode.
* Hold 1.0s - Put light to sleep. Flashes white.
* Hold 2.5s - Enables **Conjure Mode**. Flashes blue.
* Hold 4.0s - Go to **Config Select**. Flashes yellow.

### Play (Conjure Mode)
* Press - Toggle light on/off (processor still running).
* Hold 1.0s - Turn off light and deactivate Conjure Mode. Flashes white.
* Hold 2.5s - Disable **Conjure Mode**. Flashes blue.
* Hold 4.0s - Go to **Config Select**. Flashes yellow.

### Config Select
* Press - Cycle between configuration options. Color indicates what configuration mode will be selected.
  * Palette A - red
  * Palette B - blue
  * Prime A - magenta
  * Prime B - cyan
  * Accelerometer mode - green
  * Accelerometer sensitivity - yellow
* Hold 1.5s - Go to **Configure** for current configuration mode. Flashes yellow.
* Hold 3.0s - Go to **Play**. Flashes white.

### Config Palette
* Press - Cycle forward through palette options.
* Dpress - Cycle backward through palette options.
* Hold 1.5s - Select color. Flashes white.
* Hold 1.5s more - Cycle to next shade. Flashes white.
* Release after hold - Go to **Confirm Color**.

### Confirm Color
* Press - Accept color.
  * If last (12th) color slot, go to **Play** and save. Flashes white.
  * Otherwise just go to next color slot.
* Hold 1.5s - Reject color.
  * If first color slot, go to **Config Palette**. Flashes red.
  * Otherwise, go to **Confirm Color** for previous color slot. Flashes red.
* Hold 3.0s - Accept and save. Sets current color slot as last color. Go to **Play**. Flashes white.

### Config Prime
* Press - Cycles to next prime.
* Hold 1.5s - Accept and save. Go to **Play**. Flashes white.

### Config Accelerometer Mode
* Press - Cycle to next accelerometer mode. Color indicates what mode will be selected.
  * Off - dim white
  * Speed - red
  * Tilt X - blue
  * Tilt Y - yellow
  * Flip Z - green
* Hold 1.5s - Accept and save. Go to **Play**. Flashes white.

### Config Accelerometer Sensitivity
* Press - Cycle to next accelerometer sensitivity. Color indicates what sensitivity will be selected.
  * Low - blue
  * Medium - magenta
  * High - red
* Hold 1.5s - Accept and save. Go to **Play**. Flashes white.

# Installation
Both Hex and Lumino are open source, but due to the nature of Arduino software distribution issues I've yet to solve, compiled releases are the preferred way of installing the firmwares.

## Mac OS X
**Note** If you are comfortable with the terminal, you can use the command line as described in the Linux Installation guide if you prefer.

 1. Install the [Arduino 1.6.5](https://www.arduino.cc/Main/Software) IDE to you /Applications directory.
 2. Download and mount either the [Hex v0.1.5](/firmwares/Hex%20v0.1.5%20152.dmg) or [Primer v0.2.5](/firmwares/Primer%20v0.2.5%20103.dmg) .dmg files from github.
 3. Plug in your OSM via USB and double-click the **Upload .hex** application.

## Windows
1. Download the [XLoader](http://russemotto.com/xloader/) software.
2. Download either the [Hex v0.1.5](/firmwares/hex_v0_1_5_152.hex) or [Primer v0.2.5](/firmwares/primer_v0_2_5_103.hex) .hex files from github.
3. Plug in your OSM and program according to [this tutorial](https://liudr.wordpress.com/2013/03/03/load-compiled-binary-to-arduino-with-xloader/). Be sure to select **Uno(ATmega328)** from the *Device* dropdown.

## Linux
 1. Install [avrdude](http://www.nongnu.org/avrdude/). The Arduino IDE comes with avrdude bundled. (OSX users, the location of avrdude is Arduino.app/Contents/Java/hardware/tools/avr/bin/avrdude).
 2. Download either the [Hex v0.1.5](/firmwares/hex_v0_1_5_152.hex) or [Primer v0.2.5](/firmwares/primer_v0_2_5_103.hex) .hex files from github.
 3. Plug in your OSM and run the command:
     `avrdude -v -patmega328p -carduino -P[path to programmer] -b115200 -D -Uflash:w:[path to .hex file]:i`
(OSX users, your path to programmer is /dev/cu.SLAB_USBtoUART)

# Discussion
I tend to hang out in the [OSM Mode Swap](https://www.facebook.com/groups/osmModeSwap/) Facebook group and #osmlounge on the freenode IRC server.
