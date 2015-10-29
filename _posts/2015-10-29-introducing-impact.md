---
layout: post
title: "Introducing Impact"
date: 2015-10-29T00:00:00.000Z
categories: osm
published: true
---

[Impact](http://github.com/iterati/impact/) is a new OSM firmware made for light functions that are more geared for impact effects. As of now, it only supports an iNova-like mode with configurable colors. Other non-standard microlights such as the Photon Freedoms are candidates for addition.

## iNova Mode

iNova mode emulates classic iNovas while providing multiple colors and live configuration. You can select 3 different colors. If you want to operate with a single-color light, just select the same color 3 times.

### Off

* Press and release - Turns to **High** when pressed.
* Press and hold for 3s - Flashes yellow and enters **Configure** mode.

### High

* Press within 3s - Turns off while held, turns to **Low** when released.
* Press after 3s - Turns off and goes to **Off**.

### Low

* Press within 3s - Turns off while held, turns to **Blink** when released.
* Press after 3s - Turns off and goes to **Off**.

### Blink

* Press - Turns to off and goes to **Off**.

### Configure

* Press - Change to next color.
* Press and hold - Flashes yellow.
  * If last color, flashes white and saves. Goes to **Off**.
  * Otherwise, goes to next color.
  
  
## Palette
Impact has 25 colors and a blank to chose from.

![Impact's Palette](/images/impact_palette.png)

----
# Installation
Both Hex and Lumino are open source, but due to the nature of Arduino software distribution issues I've yet to solve, compiled releases are the preferred way of installing the firmwares.

## Mac OS X
**Note** If you are comfortable with the terminal, you can use the command line as described in the Linux Installation guide if you prefer.

 1. Install the [Arduino 1.6.5](https://www.arduino.cc/Main/Software) IDE to you /Applications directory.
 2. Download and mount either the [Impact v0.1 .dmg file](/firmwares/Impact%20v0.1%2010.dmg).
 3. Plug in your OSM via USB and double-click the **Upload .hex** application.

## Windows
1. Download the [XLoader](http://russemotto.com/xloader/) software.
2. Download [Impact v0.1 .hex file](/firmwares/impact_v0_1_10.hex).
3. Plug in your OSM and program according to [this tutorial](https://liudr.wordpress.com/2013/03/03/load-compiled-binary-to-arduino-with-xloader/). Be sure to select **Uno(ATmega328)** from the *Device* dropdown.

## Linux
 1. Install [avrdude](http://www.nongnu.org/avrdude/). The Arduino IDE comes with avrdude bundled. (OSX users, the location of avrdude is Arduino.app/Contents/Java/hardware/tools/avr/bin/avrdude).
 2. Download [Impact v0.1 .hex file](/firmwares/impact_v0_1_10.hex).
 3. Plug in your OSM and run the command:
     `avrdude -v -patmega328p -carduino -P[path to programmer] -b115200 -D -Uflash:w:[path to .hex file]:i`
(OSX users, your path to programmer is /dev/cu.SLAB_USBtoUART)

Prose

