---
layout: page
title: "Vectr"
---
# Vectr

Vectr is a motion-reactive firmware for the OSM 2.0 and OSM 2.1 Microlights.

It is configured using VectrUI and has no on-chip programming capabilities.

<iframe width="960" height="560" src="https://www.youtube.com/embed/B62LUWpwSpU" frameborder="0" allowfullscreen></iframe>


## Mac Download

* Install the drivers: https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx
* Install the Arduino.app to your /Applications directory: https://www.arduino.cc/en/Main/Software
* Install the latest Java Runtime Environment: http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
* Plug in your chips one at a time and run "Upload vectr.20160325.hex" for each one
* Use VectrUI

Download Link: [Vectr](/firmwares/vectr.20160325.osx.dmg)


## Windows Download

* Install the drivers: https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx
* Download XLoader: http://russemotto.com/xloader/
* Install the latest Java Runtime Environment: http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
* Plug in your chips one at a time and follow the XLoader tutorial: http://www.hobbytronics.co.uk/arduino-xloader
  * Use ATMega(328p) for the board
  * Use 115200 for Baud rate
  * Select the vectr.20160325.hex file to upload
* Use VectrUI

Download Link: [Vectr](/firmwares/vectr.20160325.win.zip)


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
