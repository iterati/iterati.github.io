---
layout: post
title: "Pattern Theory Volume 2"
date: 2016-02-22
categories: osm
published: true
---
{%include strobe_js.html %}

Since the last [Pattern Theory post]({% post_url 2015-12-13-pattern-theory-1 %}), I've gone and released [Vectr](/vectr.html). Vectr takes many of the ideas in that post to what I feel is a logical conclusion by interpolating between different timings that are used by the various base patterns. In this post, I will be detailing Strobe in all of its glory and explain the math and rendering strategy behind Vectr.


## The Loop

Once per millisecond Vectr performs 4 actions, 2 of which are relevant to this post:

* Handle any data coming over the serial connection for communication with VectrUI
* Track what's happening with the button to see if the light needs to react (change modes, go to sleep, etc)
* Calculate reactive changes required based on accelerometer data
* Render the frame by determining what color (or blank) to show and send that color to the LED

The last two are the relevant ones. Vectr translates the accelerometer data into a value that, based on your thresholds, will then calculate your colors and pattern timings.

I will not go into too much detail on the Vectr motion algorithm, the important part to understand is that, due to hardware limitations, it's not possible to perform all steps in the accelerometer calculations in a single step (1 millisecond) and it's not necessary because the accelerometer is only updating the accelerometer values every 20ms (50Hz). The first 6ms of every cycle are spent requesting and gathering the data off the accelerometer, on the 7th ms the magnitude of the three axes is calculated, and on the 8th the algorithm that determines which of the 33 (0 to 32) velocity thresholdsyou are currently at. The velocity value that's calculated on this 8th ms is used for an entire cycle. The total "lag time" between the accelerometer reporting new values and Vectr reacting to those values is 8ms due to this which is a very low value - much faster than the eye can detect. So even with a slow Arduino MCU, we can calculate with a decent degree of accuracy how much the light is moving.

After the accelerometer data has been calculated, the base pattern function is called to determine what color to be displayed and that color is then sent to the LED. This does gloss over the color blending that happens, but I'll be saving that for another blog post.


## Interpolation

The three columns of pattern timings and the pattern threshold slider work in tandem to determine how your strobe animation will look. The way that it does this is through linear interpolation. For those not familiar with the term, interpolation is similar to slope calculations you'll remember from your Algebra classes. Assuming we're using two sets of timings with the threshold sliders at 0, 32, 32, 32 (all yellow bar), the pattern timings will interpolate over 32 steps from the first set of timings to the second.

    timingA + ((timingB - timingA) * (velocity / 32))

This simple linear interpolation between timingA and timingB is why the pattern lengths change more smoothly in Vectr than in the Kinetic's Meta mode. The more steps you have, the smoother the interpolation. This same algorithm is used for determining the color based on the color thresholds.

Now that you have a broad idea of how the actual timings are determined, we'll dive deeper into how the Strobe pattern works and what different results look like.


## Strobe

As was detailed in the last Pattern Theory post, Strobe is basically the Mother of All Patterns when it comes to a microlight. Every programmable microlight on the market has multiple strobe patterns. The strobe function itself takes three arguments (group size, skip after, and repeat group) and three timing values (strobe, blank, and trailing blank). With just these 6 values, there are engless possibilities. Of Primer's 62 patterns, 18 of them are strobe patterns. Of those 18 patterns, 9 of them do not utilize the arguments or the trailing blank. 9 patterns in Primer that all just vary based on 2 values. If you look hard enough, you'll notice that many other microlights on the market also only use strobes like this. Just changing the timings of a strobe can have a tremendous impact.

* Ribbon - strobe = 12, blank = 0, trailing = 0
<canvas id="ex1" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex1', 0, 0, 1, 12, 0, 0);</script>

* Strobe - strobe = 5, blank = 8, trailing = 0
<canvas id="ex2" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex2', 0, 0, 1, 5, 8, 0);</script>

* Hyper - strobe = 25, blank = 25, trailing = 0
<canvas id="ex3" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex3', 0, 0, 1, 25, 25, 0);</script>

* Dops - strobe = 2, blank = 13, trailing = 0
<canvas id="ex4" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex4', 0, 0, 1, 2, 13, 0);</script>

* Strobie - strobe = 3, blank = 22, trailing = 0
<canvas id="ex5" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex5', 0, 0, 1, 3, 22, 0);</script>
<br />
<br />


Stribbon, Blink-E (Elements), Burst (Aethers), Blaster (Primer), Auto-Blaster (Primer), and Krush (CTRLs) all take advantage of the third timing - the trailing blank. The trailing blank comes after all colors in the group have been strobed and adds another blank element to the pattern.

* Blaster - strobe = 3, blank = 0, trailing = 70
<canvas id="ex6" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex6', 0, 0, 1, 3, 0, 70);</script>

* Auto-Blaster - strobe = 3, blank = 5, trailing = 70
<canvas id="ex7" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex7', 0, 0, 1, 3, 5, 70);</script>
<br />
<br />


One technique I've been noticing in many user-designed Vectr patterns is utilizing the trailing blank to break up a normal strobe pattern. This is similar to how blanks can be used to mix up pattern timings but gives you more control over how long that blank step is.

* strobe = 5, blank = 22, trailing = 40
<canvas id="ex8" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex8', 0, 0, 1, 5, 22, 40);</script>
<br />
<br />


All of the above patterns were created without touching the group size, skip after, and repeat group arguments. Group size is the most dramatic of the arguments as it will group your selected colors together into smaller groups. As mentioned with the trailing blank, it comes after all colors in the group have been strobed. If the group size value is left at 0, the group size is the same as the number of colors chosen. Note how the third and fourth examples below are identical.

* group size = 2
<canvas id="ex9" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex9', 2, 1, 1, 5, 8, 30);</script>

* group size = 3
<canvas id="ex10" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex10', 3, 1, 1, 5, 8, 30);</script>

* group size = 0
<canvas id="ex11" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex11', 0, 1, 1, 5, 8, 30);</script>

* group size = 6
<canvas id="ex12" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex12', 6, 1, 1, 5, 8, 30);</script>
<br />
<br />


The skip after value is the number of colors that are skipped after a group has finished strobing. If the skip after value is 0, the skip after value is the same as the group size (and if both group size and skip after are 0, skip after is the same as the number of colors chosen). Note how the third and fourth examples below are identical.

* group size = 3, skip after = 1
<canvas id="ex13" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex13', 3, 1, 1, 5, 8, 30);</script>

* group size = 3, skip after = 2
<canvas id="ex14" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex14', 3, 2, 1, 5, 8, 30);</script>

* group size = 3, skip after = 0
<canvas id="ex15" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex15', 3, 0, 1, 5, 8, 30);</script>

* group size = 3, skip after = 3
<canvas id="ex16" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex16', 3, 3, 1, 5, 8, 30);</script>
<br />
<br />


The group size and skip after have one other synergy that can alter the pattern. If the group size and skip after are the same value and there aren't enough colors to fill a group, the group is then filled with blanks. This effect is used in Burst (Aethers) and Blaster3 (Primer).

* group size = 2, skip after = 2
<canvas id="ex17" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex17', 2, 2, 1, 5, 8, 30);</script>

* group size = 4, skip after = 4
<canvas id="ex18" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex18', 4, 4, 1, 5, 8, 30);</script>
<br />
<br />


While the previous two examples needed some explaining, the repeat group should be self evident. Repeat group repeats each group some number of times. Repeat group is used to create patterns like Candy Strobe (Matrixes), Hyper Loop (Aethers), Vortex (Aethers), Strobe2 (Primer), Hyper3 (Primer), and Dops3 (Primer).

* Strobe2 - group size = 2, skip after = 1, repeat group = 2
<canvas id="ex19" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex19', 2, 1, 2, 5, 8, 30);</script>

* Strobe3 - group size = 3, skip after = 1, repeat group = 2
<canvas id="ex20" width="800" height="20" style="background: #000;"></canvas>
<script>strobe('ex20', 3, 1, 2, 5, 8, 30);</script>
<br />
<br />


## Conclusion

Strobe is the simplest pattern in Primer and it takes over a dozen examples to fully explain all the variances and possibilities you can create using that one pattern. It can be daunting when you first sit down in front of VectrUI and begin to create your first mode. My advice is always to start with one pattern and then slowly start to add a second so that you can iterate and slowly improve the mode. But if you are having trouble visualizing the way everything works, I've included a pattern visualizer below that you can play with. Drag the sliders around, change the timings and arguments, and see how different settings can alter the animation. Hopefully now you know a little bit about how Vectr works and how powerful even a simple pattern like Strobe can be.

{%include anim_js.html %}
