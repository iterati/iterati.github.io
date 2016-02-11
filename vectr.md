---
layout: page
title: "Vectr"
---
# Vectr

Vectr is a motion-reactive firmware for the OSM2 Microlight.

It is configured using VectrUI and has no on-chip programming capabilities.

* Vectr requires [Arduino 1.6.4 or higher](https://www.arduino.cc/en/Main/Software)
* VectrUI requires the latest [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)


## Mac Download

[Vectr Beta 1](/firmwares/Vectr%20Beta%201.dmg)


## Windows Download

[Vectr Beta 1](/firmwares/vectr.b1.zip)


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
