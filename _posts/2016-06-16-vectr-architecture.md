---
layout: post
title: "Vectr Architecture"
date: 2016-06-16
categories: osm
published: true
---

My most recent and likely last firmware for the OSMs is [Vectr](/vectr2.html) and has been rewritten
for the second iteration almost entirely from the ground up. This post will attempt to explain the
architecture of Vectr and the reasons behind that architecture.


## Modes and Memory

Traditional microlight firmwares, including Primer and the earliest versions of Vectr, use EEPROM to
store user presets/modes. EEPROM is similar to a hard drive in the world of microcontrollers and is
used to store data that persists even when the power is disconnected from the chip. On the OSMs in
particular, EEPROM access is unpredictable under low-voltage conditions and can result in the wrong
value being stored or retrieved from memory. This is the main cause of issues with Primer and early
versions of Vectr, so I had to figure out an alternative way of getting customizations on chip.

Vectr now, rather than using EEPROM to store customizations, generates custom firmwares with the mode
settings built into the firmware. This removed the need for master resets, eeprom clearing, and fixes
the unpredictability under low-voltage. This does mean that it's not just unsupported, but impossible
to add on-chip programming to Vectr. It also requires that the user load the source code onto the
light using the Arduino IDE rather than clicking a "Write Light" button in the UI. The simplicity and
increased reliability made this change a no-brainer in spite of the shortcommings. It's also somewhat
cool that every user in essence has their own custom firmware rather than the same firmware with some
changed values in non-volatile memory.


## Mode Editing and Previewing

Primer and Vectr provided real-time previewing of modes through the UI and is one of the most fun
aspects of my firmwares. Since we're no longer using EEPROM to store modes, the UI now has two major
responsibilities while before there was one: customize the modes while showing real-time previews.
Now, the UI also must be able to generate source code to be pushed to the lights as well as show the
real-time preview. On first run, the Vectr UI will generate a default source file which will allow
you to then connect the light to the UI and get real-time previews. This flow is not the most
straight-forward, but it's effective and fairly simple to implement.

While previewing your changes and editing modes using the UI, the UI overwrites the in-memory mode.
The changes will not persist past a reboot of the light and it's only useful in the context of
editing and previewing your changes. This simplified flow has also improved the reliability of the UI
overall and has made for a more enjoyable customization experience.


## Single-file and No Dependency Source Code

Because all source code is now generated via a UI, it was essential to remove dependencies (beyond
the default Arduino dependencies) to reduce the complexity of the source generation and make it easy
to share firmwares around without needing multiple redundant dependency files. Prior to this change,
sleeping and timing used external libraries to simplify the process. The function for sleeping was
ported to the main .ino file and only takes up 12 lines. The LowPower library that was previously in
use supported a number of sleep modes and settings that were irrelevant to a microlight firmware and
now they are gone.

For timing, I've altered my strategy from using the ElapsedMillis library for a simple bit of logic
that uses the ```micros()``` function in the Arduino library.

    uint32_t cus = micros();
    while (cus - last_write < limiter_us) cus = micros();
    last_write = cus;

If you examine the source code, you'll see that limiter_us is declared at 500 (for 500us per frame
timings) but later multiplied by 64 (bit shifted 6 places to the left) to make the actual value
32000. The reason 32000 is used is due to the PWM timings on the board altering the result of the
```micros()``` function. Arduino uses Timer0 for tracking us and ms based on clock cycles and the
red LED channel also uses Timer0 for PWM. Since we're using the fastest PWM possible, this makes the
chip count us and ms at 64x the normal rate.

The only other timings required on the chip are around counting the frames/time between changes to
the state of the button. Rather than using the Arduino timing functions to track this, I'm simply
counting each run through the ```handle_button()``` function which gives me the same functionality
but more cheaply.


## 2000 Frames Per Second

Primer and the early versions of Vectr all ran at 1000fps. While this sounds really fast, it's not
fast enough when you're finger-wiggling and won't allow you to represent "True Dops" timings which
are 1.5ms on/11ms off. The main factors holding Vectr back from being 2000fps were a combination of
how long it takes to get data off the accelerometer and how expensive interpolation can be on an
Arduino. Basic interpolation is:

    interpolate(start, end, distance_along, total_distance):
        diff = end - start
        value = start + (diff * (distance_along / total_distance))

On an Arduino, that division is VERY costly. To get rid of the division, I'm instead multiplying by
the reciprocal. To do this, I've generated a 256-entry, 16-bit table of reciprocals and use that
instead. Some other functions that have been sped up at the expense of a little accuracy are the
arctan2 function which is used to calculate pitch and roll and the square root function which is
used to determine the magnitude of velocity for velocity tracking.

For reading from the accel, normally the host must: initiate the connection to the slave, send a read
command to the slave, read the response back in from the slave, and then perform any calculations
required with the data returned. Those steps are now spread out over 4 frames and no part takes more
than 200us, giving me 300us each frame where the accelerometer is read from to do something else with
the processor - in this case calculate the blinky. After the 3 axes are read from the accelerometer,
the next 7 frames are spent doing other calculations to determine what needs to happen (timings or
colors get blended in Vectr modes and patterns can switch from A to B or visa versa). This happens
every 40 frames (20ms).

Speeding up these two pieces, the accelerometer interfacing and the costly math functions, enabled me
to get to 2000fps and add Morph back as a base pattern.


## Next Steps

While these are the most important pieces of Vectr, the are not the only pieces that matter. The
velocity tracking algorithm is going to be the main focus of development over the next few months as
I work to perfect the feel of the accelerometer on these lights. There are quite a few velocity
"curves" that I can use for tracking and I've yet to find the perfect one. That will likely be the
topic of my next post so, stay tuned!
