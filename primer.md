---
layout: page
title: "Primer"
---
# Primer and Tekton

Primer is a Work In Progress firmware for the OSM Microlight and Tekton is a GUI for configuring the light in real time.

* Primer requires Arduino 1.6.4 or higher
* Tekton requires Processing 3.0.1 or higher

**Last Updated to 0.9 on January 11, 2016**
* Fixes a sleep bug with both OSM versions
* Fix to conjure mode not enabling properly
* Fix for "Upload Light" button in Tekton
* Other various fixes


## Features

* 62 patterns to chose from
* 47 customizable (with Tekton) color palette (plus a blank) with 4 shading levels per color
* Each pattern supports up to 16 colors each
* 4 accelerometer triggers with 3 sensitivity settings
* 16 mode slots with 2 variations (pattern + colors) per slot
* 4 fully custimizable mode playlists (bundles) with 16 slots each
* Toggle Conjuring Mode (single-press on/off) for any preset
* Light lock feature to save your lights from turned on by accident.
* Easy to use GUI customization
* Easy to use on-chip customization
* Save, load, and share your custom palettes, modes, and preset playlists
* Upload yours or your friends' patterns to your lights or download your at-show customizations when you get home


##  Installation

### Auto Installer (for OS X)

* Install the latest [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
* Download the latest (0.9) [Primer 0.9.dmg](/firmwares/Primer%200.9.dmg)
* Open the .dmg
* Plug in one OSM light
* Double-click the **Upload primer.hex** app to install the firmware.
* Repeat previous step for all OSM lights.
* Drag **Tekton** app to your */Applications* directory.
* Double-Click **Tekton** app to begin configuration app.


### Packaged release (for PC)

* Install the latest [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
* Download the latest (0.9) zip file for your platform:
  * [Windows 32bit](/firmwares/primer_0.9.windows32.zip)
  * [Windows 64bit](/firmwares/primer_0.9.windows64.zip)
* Download the [XLoader](http://russemotto.com/xloader/) app.
* Plug in one OSM light
* Using XLoader, follow [this tutorial](https://liudr.wordpress.com/2013/03/03/load-compiled-binary-to-arduino-with-xloader/) to install the firmware.
  * Make sure to use 115200 for the speed.
  * Make sure to select "Uno(ATMega328)" from the Device dropdown.
  * Be sure to select the correct .hex file.
* Repeat previous step for all OSM lights.
* Drag **Tekton** exe to your computer.
* Double-Click the **Tekton** exe to begin configuration app.


### Packaged release (for Linux)

* Install the latest [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
* Install [avrdude](http://www.nongnu.org/avrdude/).
* Download the latest (0.9) zip file for your platform:
  * [Linux 32bit](/firmwares/primer_0.9.linux32.zip) (Untested)
  * [Linux 64bit](/firmwares/primer_0.9.linux64.zip) (Untested)
* Plug in one OSM light and run the command:
     `avrdude -v -patmega328p -carduino -P[path to programmer] -b115200 -D -Uflash:w:[path to .hex file]:i`
* Repeat previous step for all OSM lights.
* Run the included "tekton" executable to begin configuration app.


### Source

* Source code can be found at [http://github.com/iterati/primer](http://github.com/iterati/primer)
* You must use Arduino 1.6.4 or greater for the firmware and Processing 3.0.1 for the GUI.


## Controls

### Off

Under normal operations:

* Press - Turn on. Go to **Play** on release.
* Hold 1.0s - Go to **Bundle Select** on release. Flashes blue.
* Hold 4.0s - Go to **Master Reset** on release. Flashes red.
* Hold 7.0s - Failsafe mode. Turns off when released.

If light lock is enabled:

* Press or hold < 3.0s - Do nothing.
* Hold for 3.0s - Go to **Play** on release. Flashes green.

### Master Reset

Light glows red.

* Press - Go to sleep.
* Hold 3.0s - Reset and go to **Play** on released.

### Bundle Select

Light plays first mode of the bundle.

* Press - Cycle bundle.
* Hold 1.0s - Selects current bundle and go to **Play** on release. Flashes blue.
* Hold 2.0s - Go to **Bundle Edit** on release. Flashes yellow.
* Every second you hold after cycles through select and edit.

### Bundle Edit

Plays the mode currently selected for the slot.

* Press - Cycle bundle slot to next mode.
* Hold 1.0s - Sets current bundle slot to selected mode. Cycles to next bundle slot. Flashes magenta.
* Hold 2.0s - Saves bundle with current bundle slot as the end of the bundle. Go to **Play**. Flashes white.

### Play

Under normal operation:

* Press - Cycle to next mode.
* Hold 0.5s - Put light to sleep on release. Flashes white.
* Hold 1.5s - Go to **Config Select** on release. Flashes yellow.
* Hold 2.5s - Enables **Conjure Mode** on release. Flashes blue.
* Hold 3.5s - Enables **Light Lock** on release. Flashes red.
* Every second you hold after this will cycle through sleep, config, conjure, and light lock options.

In conjure mode, if the light is off for 3 minutes, the light will go to sleep. This disabled conjure mode but will save your batteries.

* Press - Toggle light on/off (processor still running).

### Config Select

* Press - Cycle between configuration options. Color indicates what configuration mode will be selected.
  * Colors A - red
  * Colors B - blue
  * Pattern A - magenta
  * Pattern B - cyan
  * Accelerometer mode - green
* Hold 1.0s - Go to **Configure** for current configuration mode on release. Flashes yellow.
* Hold 2.0s - Go to **Play** on release. Flashes white.

### Color Select

* Press - Cycle forward through palette options.
* Hold 0.5s - Select color. Flashes white.
* Every second you hold after, the shade will cycle. On release, go to **Confirm Color**.

### Confirm Color

* Press - Accept color.
  * If last color slot, save and go to **Play**. Flashes white.
  * Otherwise, go to **Color Select** for the next color.
* Hold 1.0s - Reject color and go to **Color Select** for color. Flashes red.
* Hold 2.0s - Accept, save, set current color slot as last color, and go to **Play**. Flashes white.

### Pattern Select

* Press - Cycles to next prime.
* Hold 1.0s - Accept, save, and go to **Play**. Flashes white.

### Accelerometer Mode Select

* Press - Cycle to next accelerometer mode. Color indicates what mode will be selected.
  * Off - dim white
  * Speed - red
  * Tilt X - blue
  * Tilt Y - yellow
  * Flip Z - green
* Hold 1.0s - Select mode.
* Every second you hold after, the sensitivity will cycle. On release, go to **Play**.


## Tekton
The controls along the left control the entire light or the mode Tekton is in. The top three buttons define the editing mode as either editing presets, the palette, or bundles.

Below those controls are controls that use the light's memory. Reload Light loads the light's saved settings and effectively undoes all changes made in Tekton since the last save. Write Light saves all of the changes made in Tekton to the light. Upload light loads the filename in the box below and writes those settings to the light. This is to save time when writting saved settings to multiple lights at once.

The text box and Save and Load Light buttons are for saving and loading the light's settings to/from disk.

Disconnect allows you to remove a plugged in light without having to exit Tekton (unlike earlier versions) while exit functions as normal. When a new light is connected after disconnecting, or a light is put to sleep and woken back up while plugged in and disconnected, Tekton will reconnect to the light and put it back into slave mode.

### Edit Presets
When editing bundles, the arrows to the left and right of the "Preset X" title go to the previous and next mode respectively. The bottom of the screen is the color palette + shade levels that are selectable. The dropdowns right below define the patterns and accelerometer settings the mode uses. Keyboard shortcuts for changing Pattern 1 are up and down. To change Pattern 2, hold the shift key when pressing up or down.

Below the mode settings are the colors for Patterns 1 and 2. The Less and More buttons decrease or increase the number of color slots in use. Clicking on a color slot and clicking a color will change the selected color.

The controls below the pattern colors are for reloading the preset from the light's memory, saving the edited preset to memory, or for saving and loading to a file on your computer. The file is saved to the directory of the tekton executable.

### Edit Palette
When editing the palette, select the color to edit with the lower part of the screen and edit the color using the sliders at the top.

Keyboard controls for increasing and decreasing each color channel exist. q, w, e, and r are used to change red by -8, -1, +1, +8. a, s, d and f are used for green and z, x, c, and v are used for blue.

### Edit Bundles
When editing bundles, the bundles have Less and More buttons just like the pattern colors from the Preset Editor. Setting a slot to a preset works in the same way as setting colors in the Preset Editor.


## Patterns

These images represent a selection of animations. 1 horizontal pixel represents 0.5s of animation time. Some animations take too long and are truncated in some way. Those are denoted with an Nx, with N being about how much shorter the animation is.

**NOTE**: Colors displayed on the monitor differ from colors displayed on the light. These colors are approximations. Anything grey tends more to white than grey when shown on the LED.

![Ribbon](/images/primer/01.png)
![Hyper](/images/primer/02.png)
![Strobe](/images/primer/03.png)
![Nano](/images/primer/04.png)
![Dops](/images/primer/05.png)
![Slow Strobe](/images/primer/06.png)
![Strobie](/images/primer/07.png)
![Faint](/images/primer/08.png)
![Signal](/images/primer/09.png)
![Blaster](/images/primer/10.png)
![Heavy Blaster](/images/primer/11.png)
![Auto Blaster](/images/primer/12.png)
![Strobe2](/images/primer/13.png)
![Hyper3](/images/primer/14.png)
![Dops3](/images/primer/15.png)
![Blaster3](/images/primer/16.png)
![Heavy Blaster3](/images/primer/17.png)
![Auto Blaster3](/images/primer/18.png)
![Tracer](/images/primer/19.png)
![DashDops](/images/primer/20.png)
![DopsDash](/images/primer/21.png)
![Vexing](/images/primer/22.png)
![Vexing3](/images/primer/23.png)
![Ribbon Tracer](/images/primer/24.png)
![Dotted](/images/primer/25.png)
![Firework](/images/primer/26.png)
![Bottlerocket](/images/primer/27.png)
![Grow (4x)](/images/primer/28.png)
![Shrink (4x)](/images/primer/29.png)
![Stretch (4x)](/images/primer/30.png)
![Wave (16x)](/images/primer/31.png)
![Shift (4x)](/images/primer/32.png)
![Comet (16x)](/images/primer/33.png)
![Meteor (16x)](/images/primer/34.png)
![Embers (16x)](/images/primer/35.png)
![Influx (4x)](/images/primer/36.png)
![Sword](/images/primer/37.png)
![Sword5](/images/primer/38.png)
![Razor](/images/primer/39.png)
![Razor5](/images/primer/40.png)
![Barbs](/images/primer/41.png)
![Barbs5](/images/primer/42.png)
![Cyclops](/images/primer/43.png)
![FadeIn](/images/primer/44.png)
![StrobeIn](/images/primer/45.png)
![FadeOut](/images/primer/46.png)
![StrobeOut](/images/primer/47.png)
![Pulse](/images/primer/48.png)
![Pulsar](/images/primer/49.png)
![Slow Morph](/images/primer/50.png)
![Morph](/images/primer/51.png)
![DopMorph](/images/primer/52.png)
![StrobieMorph](/images/primer/53.png)
![StrobeMorph](/images/primer/54.png)
![HyperMorph](/images/primer/55.png)
![DashMorph](/images/primer/56.png)
![Fuse](/images/primer/57.png)
![DopFuse](/images/primer/58.png)
![StrobieFuse](/images/primer/59.png)
![StrobeFuse](/images/primer/60.png)
![HyperFuse](/images/primer/61.png)
![DashFuse](/images/primer/62.png)
