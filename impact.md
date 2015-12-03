---
layout: default
---
# Impact

[Impact](http://github.com/iterati/impact/) is an OSM firmware that emulates the clasic iNova light behavior, but with 3 customizable colors.

## Controls

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

![Impact's Palette](/images/impact/palette.png)

# Installation

## Mac OS X
 1. Install the [Arduino 1.6.5](https://www.arduino.cc/Main/Software) IDE to you /Applications directory.
 2. Download and mount the [Impact .dmg file](/firmwares/Impact.dmg).
 3. Plug in your OSM via USB and double-click the **Upload .hex** application.

## Windows
1. Download the [XLoader](http://russemotto.com/xloader/) software.
2. Download [Impact .hex file](/firmwares/impact.hex).
3. Plug in your OSM and program according to [this tutorial](https://liudr.wordpress.com/2013/03/03/load-compiled-binary-to-arduino-with-xloader/). Be sure to select **Uno(ATmega328)** from the *Device* dropdown.

## Linux
 1. Install [avrdude](http://www.nongnu.org/avrdude/). The Arduino IDE comes with avrdude bundled. (OSX users, the location of avrdude is Arduino.app/Contents/Java/hardware/tools/avr/bin/avrdude).
 2. Download [Impact .hex file](/firmwares/impact.hex).
 3. Plug in your OSM and run the command:
     `avrdude -v -patmega328p -carduino -P[path to programmer] -b115200 -D -Uflash:w:[path to .hex file]:i`
