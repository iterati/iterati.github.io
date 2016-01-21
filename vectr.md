---
layout: page
title: "Vectr"
---
# Vectr

Vectr is a motion-reactive firmware for the OSM2 Microlight. It is configured using VectrUI and has no on-chip programming capabilities.

* Vectr requires [Arduino 1.6.4 or higher](https://www.arduino.cc/en/Main/Software)
* VectrUI requires the latest [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)

<iframe src="http://www.youtube.com/embed/x4SEo5d1pDM" height="576" width="1024"></iframe>
<br />
<iframe src="http://www.youtube.com/embed/T_lSN6L7dbM" height="576" width="1024"></iframe>

## Controls

### Off

Under normal operations:

* Press - Turn on. Go to **Play** on release.
* Hold 1.0s - Go to **Brightness Select** on release. Flashes white.
* Hold 4.0s - Go to **Master Reset** on release. Flashes red.
* Hold 7.0s - Failsafe mode. Turns off when released.

If light lock is enabled:

* Press or hold < 3.0s - Goes back to sleep. Flashes red.
* Hold for 3.0s - Go to **Play** on release. Flashes green.

### Brightness Select

Light glows white at the current brightness.

* Press - Cycle brightness (3 levels).
* Hold 1.0s - Set current brightness and go to **Play** on release. Flashes white.

### Master Reset

* Press - Go to sleep.
* Hold 3.0s - Reset and go to **Play** on released.

### Play

Under normal operation:

* Press - Cycle to next mode.
* Hold 0.5s - Put light to sleep on release.
* Hold 1.5s - Enables **Conjure Mode** on release. Flashes blue.
* Hold 2.5s - Enables **Light Lock** on release. Flashes red.
* Every second you hold after this will cycle through sleep (flashes white), conjure, and light lock options.

In conjure mode:

* Press - Toggle light on/off.
* Hold 3.0s - Disable **Conjure Mode** on release. Flashes blue.


## Installation

### Auto Installer (for OS X)

* Install the latest [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
* Download the latest (0.91) [Primer 0.91.dmg](/firmwares/Vectr%2001-21-16.dmg)
* Open the .dmg
* Plug in one OSM light
* Double-click the **Upload primer.hex** app to install the firmware.
* Repeat previous step for all OSM lights.
* Drag **Tekton** app to your */Applications* directory.
* Double-Click **Tekton** app to begin configuration app.


### Packaged release (for PC)

* Install the latest [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
* Download the latest (0.91) zip file for your platform:
  * [Windows 32bit](/firmwares/primer_0.91.windows32.zip)
  * [Windows 64bit](/firmwares/primer_0.91.windows64.zip)
* Download the [XLoader](http://russemotto.com/xloader/) app.
* Plug in one OSM light
* Using XLoader, follow [this tutorial](https://liudr.wordpress.com/2013/03/03/load-compiled-binary-to-arduino-with-xloader/) to install the firmware.
  * Make sure to use 115200 for the speed.
  * Make sure to select "Uno(ATMega328)" from the Device dropdown.
  * Be sure to select the correct .hex file.
* Repeat previous step for all OSM lights.
* Drag **Tekton** exe to your computer.
* Double-Click the **Tekton** exe to begin configuration app.
