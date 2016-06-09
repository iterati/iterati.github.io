---
layout: page
title: "Vectr"
---
# Vectr

Vectr is a motion-reactive firmware for the OSM 2.0 and OSM 2.1 Microlights.

It is configured using VectrUI and has no on-chip programming capabilities.


## Features

* Limitless customization (patterns, pattern timings, colors, etc)
* 2 8-mode bundles
* Up to 9 colors per mode
* Light-lock
* Conjuring (single-mode) operation
* 32 levels (+ idle) of velocity tracking (Vectr modes)
* 4 accelerometer triggers with custom thresholds (Primer modes)


## Installation

Vectr is a Chrome App (currently unsigned) and has a few steps for installation while we're still in beta.

* Install the [Arduino IDE](https://www.arduino.cc/en/Main/Software) version 1.6.5 or higher.
* Download the [Vectr Source](/firmwares/vectr.16.06.09.zip) file and extract it to a directory somewhere on your computer.
* In the Chrome address bar type in ```chrome://extensions```.
* Make sure the "Developer Mode" checkbox is checked.
    * ![Checkbox](/images/vectr/developermode.png)
* Click "Load unpacked extension..." and load the directory you extracted in the first step.
* Launch the app.
* On first launch, the first thing you will be presented with is a file picker screen that allows you to pick a directory.
You should create a new directory somewhere convenient (like on the desktop or in you documents folder) called "vectr".
This is where modes and firmwares will be stored.
* After the first launch, a default firmware is created in <your vectr dir>/firmwares/default/default.ino.
* Open the default.ino file in the Arduino IDE.
* Select Sketch/Upload or click the arrow pointint to the right in the upper left hand to flash a light.

You are now ready to use Vectr.


## Customization

The UI is used to generate source code - not to reprogram your light like previous versions of Primer and Vectr. This means
that every Vectr user has a custom firmware that contains their modes - not the same firmware with some different values in
EEPROM. As such, customizing modes uses the light as a display rather than reprograms it. To customize your modes:

* Open the Vectr app in Chrome. You can click the "Apps" bookmark on the left of the Chrome bookmark bar.
* With the light plugged in with the cable, click the "Refresh Ports" button and select the correct port from the dropdown then click "Connect".
* Edit your modes and view how they work on the light.
* When you're ready to save a mode, type a name in the text field above "Save Mode" and click "Save Mode". Typing the name of another mode will overwrite the previous mode.
* Do this for all modes you want to create.

To create a custom firmware with your modes:

* Drag and drop modes from the mode library on the right to the two bundles immediately to the left in the order you wish.
* When you have your bundles configured, type a name in the box above "Save Firmware" and click "Save Firmware". Typing the name of another firmware will overwrite the previous firmware.
* Open the firmwares/<firmware name>/<firmware name>.ino file from your vectr directory in the Arduino IDE.
* Upload the firmware to all of your lights.


## Controls

### Off

Under normal operations:

* Hold less than 2 seconds - Wakes on release.
* Hold between 2 and 4 seconds - Switches bundles and wakes on release. Flashes white at 2 seconds.
* Hold 4 seconds or more - Locks and turns off light on release. Flashes red at 4 seconds.

If light lock is enabled:

* Hold less than 2 seconds - Goes back to sleep. Flashes red on release.
* Hold between 2 and 4 seconds - Wakes on release. Flashes green at 2 seconds.
* Hold 4 seconds or more - Goes back to sleep on release. Flashes red on release.

### Play

Under normal operation:

* Hold less than 0.5 seconds - Cycle to next mode.
* Hold between 0.5 and 2 seconds - Turns off light on release. Flashes white at 0.5 seconds.
* Hold between 2 and 4 seconds - Enables conjure mode on release. Flashes blue at 2 seconds.
* Hold 4 seconds or more - Locks and turns off light on release. Flashes red at 4 seconds.

In conjure mode:

* Hold less than 0.5 seconds - Turns light off on release.
* Hold between 0.5 and 2 seconds - Turns off light on release. Flashes white at 0.5 seconds.
* Hold between 2 and 4 seconds - Disables conjure mode on release. Flashes blue at 2 seconds.
* Hold between 4 seconds or more - Lock light and go to sleep on release. Flashes red at 4 seconds.
