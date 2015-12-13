---
layout: post
title: "Pattern Theory Volume 1"
date: 2015-12-13
categories: osm
published: true
---
Blinking patterns are an interesting area for me as both an artist and an engineer. The artist wants to be able to express every blink pattern I can imagine while the engineer wants these expressions to be as generic and malleable as possible. These are less in oposition to each other as they are different sides to the same coin. If I can come up with something incredibly generalized, new ideas don't need new code, they just need tweaking some numbers. And if I can test new patterns just by tweaking numbers, then it's easier to come across novel patterns.

After some time tinkering and searching, I'm convinced that a generalize function to control blinking patterns exists, but it is a monster and there's more fruitful paths of inspiration for both the artist and the engineer by trying to categorize patterns. That's what this post is about - breaking down patterns.

I'll be taking a look at some of what's coming in Primer/Tekton 0.8 and what's going on in the wider world of microlights. eMazing has two new chipsets out - the CTRLs and the Element v2s. Futuristic just announced the Aethers. Both offer some novel new patterns people have been asking for, and this is where I've gotten so far.


## Strobe, Mother of All Patterns
The basic strobe is what I consider the mother of all patterns. The idea behind the basic strobe pattern is that a color is shown, then a blank is shown, and then the next color in the color palette is selected and shown, etc. I have added a few new features to this basic strobe, but let's start with the basics.

### Strobe and Blank Times
At the base of the strobe are the **strobe** and **blank times**. With just these two values you can create the classic Ribbon (aka Chroma or Sandbox), Strobe, Dops, Hyperstrobe, Spaz (aka Strobie), Signal Blink, and more.

![Ribbon](/images/pattern_theory/00.png)
![Hyper](/images/pattern_theory/01.png)
![Strobe](/images/pattern_theory/02.png)
![Nano](/images/pattern_theory/03.png)
![Dops](/images/pattern_theory/04.png)
![Spaz](/images/pattern_theory/05.png)
![Signal](/images/pattern_theory/06.png)

### Long Blank Time
My favorite pattern on the v1 Elements was Blink-E. While I don't have the CTRLs, the Krush mode in there is very similar to Blink-E. Both of these modes add a **long blank time** after they finish the cycle.

![Blaster](/images/pattern_theory/07.png)
![Stutter](/images/pattern_theory/08.png)

### Pick, Skip, and Repeat
The grouping variables **pick**, **skip**, and **repeat** enable the basic strobe to emulate the classic Matrix Candy Strobe (Aether Vortex) pattern as well as some of the new patterns from the Aethers. Pick determines the number of colors chosen for the current set. Repeat says how many times to repeat the cycle with those colors. Skip is somewhat special. Skip is generally used in 2 ways, but there may be more uses I haven't come across. First is to skip one color every repeat cycles. This is how Candy Strobe and Aether Hyper Loop work. The second is to skip the number of colors selected. This allows the "5 sets of 3" concept in the Aether Burst to work.

![Strobe2](/images/pattern_theory/09.png)
![Hyper3](/images/pattern_theory/10.png)
![Dops3](/images/pattern_theory/11.png)
![Blaster3](/images/pattern_theory/12.png)
![Stutter3](/images/pattern_theory/13.png)


## Tracer
Tracer's another fairly simple concept in theory, but that took a lot of work to generalize to a level I was happy with. The core concept of Tracer is that the 1st color in your color palette is used in between other colors. This can be as simple as a generic tracer or allow for patterns like the Chroma LE Dash Dops, Aether Dash Dops, CTRL Vex, and a bunch of other interesting patterns.

### Strobe and Blank Times
Tracer has two strobe times and two blank times. As with Strobe, there's **strobe** and **blank times** for the colors, but there's also a **tracer** and **tracer blank times** as well. A flag **pad tracer** determines which blank time is used between the tracer and the colors. If true, the tracer blank time is used, otherwise the color time is used. This is a minor feature, but is used to alter the behavior of Chroma LE Dash Dops vs Aether Dash Dops.

![DashDops](/images/pattern_theory/15.png)
![DopsDash](/images/pattern_theory/16.png)
![Vex](/images/pattern_theory/17.png)
![Perplex](/images/pattern_theory/18.png)

### Pick, Skip, and Repeat
The grouping variables still refer to the colors, but **repeat** indicates how many times the tracer is repeated rather than the color cycle. If repeat is 0 and we're padding using the tracer, the tracer blank time is used once before the tracer. That concept is used for both Firework and Bottlerocket.

![Sandwich](/images/pattern_theory/19.png)
![Teaser](/images/pattern_theory/20.png)
![Hypenated](/images/pattern_theory/21.png)
![Dashed](/images/pattern_theory/22.png)
![Dotted](/images/pattern_theory/23.png)
![Firework](/images/pattern_theory/24.png)
![Bottlerocket](/images/pattern_theory/25.png)


## Flux
For patterns that have their timing change over time, Flux has what you need. CTRL ShapeShift, Aether Stretch, and Aether Dop Wave are flux variants, but they only scratch the surface.

### Strobe and Blank times
Like with the other bases, **strobe** and **blank time** determine how long something strobes and is blank for. However, the way the flux is configured has a huge effect on these variables as well.

### Configuration
The configuration has 4 different parts: **direction**, **change**, **dyanamic**, and **target**.

Direction determines if the pattern timing grows, shrinks, or oscillates (grows then shrinks).

Change determines how the next color and timing are selected. Change can either change colors after a full timing cycle, change colors every strobe, or change timings only after all colors have been cycled. Dop Wave changes colors after every timing change while Stretch only changes after every color has cycled. Comet changes after a full timing cycle.

Dynamic indicates whether the amount of time for each on/off cycle stays the same regardless of what part of the cycle it's on. Dop Wave is not dynamic - the blank length continually gets shorter. Stretch is dynamic as the strobe time "eats" the blank time.

Target determines if the color grows/shrinks/oscillates or the blink does.

![Stretch](/images/pattern_theory/26.png)
![DopWave](/images/pattern_theory/27.png)
![Comet](/images/pattern_theory/29.png)
![Meteor](/images/pattern_theory/30.png)
![Embers](/images/pattern_theory/31.png)
![Influx](/images/pattern_theory/32.png)

### Long Blank Time
**Long blank time** is only used when the timing doesn't change for a full color cycle. In that instance, a long blank is inserted after the last color. This is how the CTRL Shapeshifter pattern works.

![Shapeshift](/images/pattern_theory/28.png)


## Edge
Edge counts down to the first color from the last, shows the first, then counts up to the last. Edge is based on the Chroma LE mode of the same name. Elements v2 Centerpoint is another variant of Edge.

### Strobe and Blank Times
Edge has two sets of timings, one for the colors and the other for the "edge" and the gap after the last color in the tailing edge.

![Sword](/images/pattern_theory/33.png)
![Barbs](/images/pattern_theory/36.png)
![Cyclops](/images/pattern_theory/35.png)

### Pick
Pick works the same as in previous patterns, but for edge the skip value is always assumed to be the same as pick and repeat is always 1.

![Sword3](/images/pattern_theory/34.png)
![Barbs3](/images/pattern_theory/37.png)


## Fades and Morphs
Fades and morphs are very similar patterns. While morphs go from one color to another, fades go from blank to a color (or visa versa).

### Strobe and Blank Times
Fades have two sets of strobe and blank times. One set is used to indicate the length of the "fade" parts of the pattern while the other represents the color itself.

### Type
Fades come in 3 types while morphs in 2. There are options for fading in, fading out, fading in then out, morphing, and "fusing" which is similar to the Aether Fusion mode.

### Steps
Morphs also happen over a number of steps between colors.

![FadeIn](/images/pattern_theory/38.png)
![StrobeIn](/images/pattern_theory/39.png)
![FadeOut](/images/pattern_theory/40.png)
![StrobeOut](/images/pattern_theory/41.png)
![Pulse](/images/pattern_theory/42.png)
![Pulsar](/images/pattern_theory/43.png)
![Morph](/images/pattern_theory/44.png)
![DopMorph](/images/pattern_theory/45.png)
![StrobeMorph](/images/pattern_theory/46.png)
![HyperMorph](/images/pattern_theory/47.png)
![DashMorph](/images/pattern_theory/48.png)
![Fuse](/images/pattern_theory/49.png)
![DopFuse](/images/pattern_theory/50.png)
![StrobeFuse](/images/pattern_theory/51.png)
![HyperFuse](/images/pattern_theory/52.png)
![DashFuse](/images/pattern_theory/53.png)


## Finishing Up
These base patterns aren't the complete realm of possible patterns, nor are they even close to comprehensive over what's been put out in the past. These are the tools I'm chosing to use for Primer going forward because, while it doesn't allow me to recreate anything, it is extensible so that I could possibly do so if I wanted. Lego and Chase, which were both supported in Primer 0.7 and earlier, will not be included in 0.8 at first as I find them quite limiting. There's always room to grow. These patterns may all not be included in Primer 0.8, but the current plan is to have at least 48 but no more than 64 quality patterns for the 0.8 release. If you have any ideas, please feel free to contact me with them. I'm always receptive to new ideas.
