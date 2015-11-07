---
layout: post
title: "Unveiling Tekton"
date: 2015-11-07T00:00:00.000Z
categories: osm
published: true
---
![Tekton](/images/tekton.png)

A picture's worth a thousand words, but here's a couple hundred to give light to it if you're not sure what's going on.

* This is a live GUI editor for Primer. Greg Robert's work on [SliderPro](http://github.com/gregroberti/Slider-Pro/) was a huge inspiration for me on this.
* Top-Middle is the mode you're editing. Since you can only edit with the chip plugged in live, you're directly editing a Primer mode here. When the mode changes, either by pressing on the light directly or clicking one of the mode cycle buttons to the side of the mode heading, the top of the UI will vanish and until the mode data is read from the light.
* Right below that are 4 dropdowns. The 5 accelerometer modes and 3 sensitivity levels can be chosen with the middle two dropdowns. The two ppattern dropdowns allow you to chose from the 48 (yes, 48) patterns available.
* The two rows of 16 squares below the dropdowns are the first and second variant's color slots (first on top, second on bottom). The "Less" and "More" buttons increase or decrease the number of color slots used. Clicking on an active color slot will select it and it will have a white border.
* The row of buttons below provide 4 critical functions:
  * Reload Mode - Tells the light to load the current mode from memory and resets the changes made in the editor.
  * Write Mode - Tells the light to store the current settings to memory.
  * Save - Saves mode configuration to filename specified in the text box relative to the directory of the tekton executable.
  * Load - Loads a mode configuration file from the filename specified in the text box and sends the mode to the light (but does not save write it to memory).
* The majority of the screen is taken up by the palette separated into 4 boxes with the brightest shades on the top of each grid. When a color slot is selected and highlighted white, clicking on a palette square will change the color to reflect the clicked square.

So that's about it, but it's still kind of a lot. You can now configure your light using a computer and push the mode to your lights, download a mode you design while out at a whoe for later use, or share your modes with the world by saving your presets and posting them on Facebook or elsewhere. I don't think I can design presets any other way now that I've got this. I'm sure you'll feel the same once you've tried it.


## Installation

For this you need three things (with maybe a few odds and ends):

* [Java 8 Runtime](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) downloaded and installed. This is a requirement to run Tekton.
* Tekton binary:
  * [Windows 32bit](/firmwares/tekton.0.1.win32.zip)
  * [Windows 64bit](/firmwares/tekton.0.1.win64.zip)
  * [Linux 32bit](/firmwares/tekton.0.1.linux32.zip) (Untested)
  * [Linux 64bit](/firmwares/tekton.0.1.linux64.zip) (Untested)
  * Max OS X coming soon
* [Primer](/primer.html) 0.5+ installed on your light


## Running

Once you have everything needed, plug your light in and start up the Tekton application. If the "Loading" message doesn't go away after 30 seconds, something is wrong and you should try restarting the application and trying different USB ports.

After the mode information has been read in from the light, you can edit, save, and load modes with the ease of a computer.
