import collections
from PIL import Image, ImageDraw, ImageFont
import random

font = ImageFont.truetype("/Library/Fonts/Andale Mono.ttf", size=14)
Pattern = collections.namedtuple("Pattern", "name colors func_name args")

colors = [
  (  0,   0,   0),
  (255, 255, 255),
  ( 64,   0,   0),
  ( 64,  64,   0),
  (  0,  64,   0),
  (  0,  64,  64),
  (  0,   0,  64),
  ( 64,   0,  64),
  (255,   0,   0),
  (224,  32,   0),
  (192,  64,   0),
  (160,  96,   0),
  (128, 128,   0),
  ( 96, 160,   0),
  ( 64, 192,   0),
  ( 32, 224,   0),
  (  0, 255,   0),
  (  0, 224,  32),
  (  0, 192,  64),
  (  0, 160,  96),
  (  0, 128, 128),
  (  0,  96, 160),
  (  0,  64, 192),
  (  0,  32, 224),
  (  0,   0, 255),
  ( 32,   0, 224),
  ( 64,   0, 192),
  ( 96,   0, 160),
  (128,   0, 128),
  (160,   0,  96),
  (192,   0,  64),
  (224,   0,  32),
]


def unpack(c):
    s = c >> 6
    r, g, b = colors[c & 31]
    return r >> s, g >> s, b >> s


def morph(t, d, rgb0, rgb1):
    r0, g0, b0 = rgb0
    r1, g1, b1 = rgb1
    r = r0 + int((r1 - r0) * (t / float(d)))
    g = g0 + int((g1 - g0) * (t / float(d)))
    b = b0 + int((b1 - b0) * (t / float(d)))
    return r, g, b


def make_color(c, w=32, h=32):
    r, g, b = unpack(c)
    return Image.new("RGB", (w, h), (r, g, b))


def make_frame(r, g, b):
    # 1/8 1/4 1/2 1 1 1 1 1/2 1/4 /18
    i = Image.new("RGB", (1, 12), (0, 0, 0))
    c_11 = Image.new("RGB", (1, 1), (r, g, b))
    c_12 = Image.new("RGB", (1, 1), (int(r * 0.5),   int(g * 0.5),   int(b * 0.5)))
    c_14 = Image.new("RGB", (1, 1), (int(r * 0.25),  int(g * 0.25),  int(b * 0.25)))
    c_18 = Image.new("RGB", (1, 1), (int(r * 0.125), int(g * 0.125), int(b * 0.125)))
    i.paste(c_18, (0, 1))
    i.paste(c_14, (0, 2))
    i.paste(c_12, (0, 3))
    i.paste(c_11, (0, 4))
    i.paste(c_11, (0, 5))
    i.paste(c_11, (0, 6))
    i.paste(c_11, (0, 7))
    i.paste(c_12, (0, 8))
    i.paste(c_14, (0, 9))
    i.paste(c_18, (0, 10))
    return i


def make_strobe(colors, ct, bt, lt, pick, skip, repeat):
    cur_color = tick = cnt0 = 0

    if pick == 0 or pick > len(colors):
        pick = len(colors)

    if skip == 0 or skip > pick:
        skip = pick

    sT = (ct + bt) * pick

    while True:
        if tick >= sT + lt:
            tick = 0
            cnt0 += 1
            if (cnt0 >= repeat):
                cnt0 = 0
                cur_color = (cur_color + skip) % len(colors)

        if tick < sT:
            if tick % (ct + bt) < ct:
                c = ((tick / (ct + bt)) + cur_color) % len(colors)
                yield make_frame(*unpack(colors[c]))
            else:
                yield make_frame(0, 0, 0)
        else:
            yield make_frame(0, 0, 0)

        tick += 1


def make_tracer(colors, ct0, bt0, ct1, bt1, pick, skip, repeat):
    cur_color = tick = cnt0 = 0
    if pick == 0 or pick > (len(colors) - 1):
        pick = len(colors) - 1

    if skip == 0 or skip > pick:
        skip = pick

    aTT = bt0 + ((ct0 + bt0) * pick)
    if repeat == 0:
        tTT = bt1 + ct1
    else:
        tTT = bt1 + ((ct1 + bt1) * repeat)

    while True:
        if tick >= tTT + aTT:
            tick = 0
            cur_color = (cur_color + skip) % (len(colors) - 1)

        if tick < tTT:
            if tick % (bt1 + ct1) < bt1:
                yield make_frame(0, 0, 0)
            else:
                yield make_frame(*unpack(colors[0]))

        else:
            if (tick - tTT) % (bt0 + ct0) < bt0:
                yield make_frame(0, 0, 0)
            else:
                c = ((((tick - tTT) / (bt0 + ct0)) + cur_color) % (len(colors) - 1)) + 1
                yield make_frame(*unpack(colors[c]))

        tick += 1


def make_edge(colors, ct0, bt0, ct1, bt1, pick, skip):
    cur_color = tick = cnt0 = 0
    if pick == 0 or pick > len(colors):
        pick = len(colors)

    if skip == 0 or skip > pick:
        skip = pick

    hT = (ct0 + bt0) * (pick - 1)
    eT = (2 * hT) + ct1

    while True:
        if tick >= eT + bt1:
            tick = 0
            cur_color = (cur_color + skip) % len(colors)

        if tick < hT:
            if tick % (ct0 + bt0) < ct0:
                c = (pick - 1) - (tick / (ct0 + bt0))  # pick-1 - 1
                c = (c + cur_color) % len(colors)
                yield make_frame(*unpack(colors[c]))
            else:
                yield make_frame(0, 0, 0)

        elif tick < hT + ct1:
            yield make_frame(*unpack(colors[cur_color]))

        elif tick < eT:
            if (tick - (hT + ct1)) % (bt0 + ct0) < bt0:
                yield make_frame(0, 0, 0)
            else:
                c = ((tick - (hT + ct1)) / (ct0 + bt0)) # 0 - pick-2
                c = (c + cur_color) % len(colors)
                yield make_frame(*unpack(colors[c + 1]))

        else:
            yield make_frame(0, 0, 0)

        tick += 1


def make_fade(colors, ct0, bt0, ct1, bt1, typ, steps):
    cur_color = tick = cnt0 = 0
    sT = (ct0 + bt0) * steps
    while True:
        if typ == 0:
            if tick >= sT + ct1 + bt1:
                tick = 0
                cur_color = (cur_color + 1) % len(colors)

            if tick < ct1:
                yield make_frame(*unpack(colors[cur_color]))
            elif tick < ct1 + sT:
                if (tick - ct1) % (bt0 + ct0) < bt0:
                    yield make_frame(0, 0, 0)
                else:
                    yield make_frame(*morph(tick - ct1, sT,
                                            unpack(colors[cur_color]),
                                            unpack(colors[(cur_color + 1) % len(colors)])))
            else:
                yield make_frame(0, 0, 0)

        elif typ == 1:
            if tick >= sT + ct1 + bt1:
                tick = 0
                cur_color = (cur_color + 1) % len(colors)

            if tick < sT:
                if tick % (ct0 + bt0) < ct0:
                    yield make_frame(*morph(tick, sT, (0, 0, 0), unpack(colors[cur_color])))
                else:
                    yield make_frame(0, 0, 0)
            elif tick < sT + ct1:
                yield make_frame(*unpack(colors[cur_color]))
            else:
                yield make_frame(0, 0, 0)

        elif typ == 2:
            if tick >= sT + ct1 + bt1:
                tick = 0
                cur_color = (cur_color + 1) % len(colors)

            if tick < sT:
                if tick % (ct0 + bt0) < ct0:
                    yield make_frame(*morph(tick, sT, (0, 0, 0), unpack(colors[cur_color])))
                else:
                    yield make_frame(0, 0, 0)
            elif tick < sT + ct1:
                yield make_frame(*unpack(colors[cur_color]))
            else:
                yield make_frame(0, 0, 0)

        else:
            if tick >= sT + sT + ct1 + bt1:
                tick = 0
                cur_color = (cur_color + 1) % len(colors)

            if tick < sT:
                if tick % (ct0 + bt0) < ct0:
                    yield make_frame(*morph(tick, sT, (0, 0, 0), unpack(colors[cur_color])))
                else:
                    yield make_frame(0, 0, 0)
            elif tick < sT + ct1:
                yield make_frame(*unpack(colors[cur_color]))
            elif tick < sT + sT + ct1:
                if (tick - (sT + ct1)) % (bt0 + ct0) < bt0:
                    yield make_frame(0, 0, 0)
                else:
                    yield make_frame(*morph(tick - (sT + ct1), sT, unpack(colors[cur_color]), (0, 0, 0)))
            else:
                yield make_frame(0, 0, 0)

        tick += 1


def make_chase(colors, ct, segments):
    cur_color = tick = cnt0 = 0
    sT = ct * segments
    while True:
        if tick >= sT + ct:
            tick = 0
            cnt0 += 1
            if cnt0 >= (segments - 1):
                cnt0 = 0
                cur_color = (cur_color + 1) % len(colors)

        if tick < sT:
            if (cnt0 == 0):
                yield make_frame(*unpack(colors[cur_color]))
            else:
                if (tick / ct) < cnt0:
                    yield make_frame(*unpack(colors[(cur_color + 1) % len(colors)]))
                elif (tick / ct) == cnt0:
                    yield make_frame(0, 0, 0)
                else:
                    yield make_frame(*unpack(colors[cur_color]))

        else:
            yield make_frame(0, 0, 0)

        tick += 1


def make_flux(colors, ct, bt, conf, segments):
    cur_color = tick = cnt0 = 0
    while True:
        if conf & 0b001:
            cT = ct * cnt0 + 1
        else:
            cT = ct * (segments - cnt0)

        if conf & 0b010:
            sT = cT + bt
        else:
            sT = (ct * segments) + bt

        if tick >= sT:
            tick = 0
            cnt0 += 1
            if conf & 0b100:
                cur_color = (cur_color + 1) % len(colors)
                if cnt0 >= segments:
                    cnt0 = 0
            else:
                if cnt0 >= segments:
                    cnt0 = 0
                    cur_color = (cur_color + 1) % len(colors)

        if tick < cT:
            yield make_frame(*unpack(colors[cur_color]))
        else:
            yield make_frame(0, 0, 0)

        tick += 1


def make_shift(colors, ct, bt, lt, dr, pick, skip, steps):
    cur_color = tick = cnt0 = 0
    if pick == 0 or pick > len(colors):
        pick = len(colors)

    if skip == 0 or skip > pick:
        skip = pick

    while True:
        if dr == 0:
            cT = ct * (cnt0 + 1)
        else:
            cT = ct * (segments - cnt0)

        sT = (cT + bt) * pick
        if tick >= sT + lt:
            tick = 0
            cnt0 += 1
            if cnt0 >= steps:
                cnt0 = 0
                cur_color = (cur_color + skip) % len(colors)

        if tick < sT and tick % (cT + bt) < cT:
            c = ((tick / (cT + bt)) + cur_color) % len(colors)
            yield make_frame(*unpack(colors[c]))
        else:
            yield make_frame(0, 0, 0)

        tick += 1


def make_lego(colors, ct, bt, conf):
    cur_color = tick = cnt0 = 0
    if conf == 0:
        ts = {0: 1, 1: 4, 2: 8}
    else:
        ts = {0: 1, 1: 2, 2: 4}

    cnt0 = ts[random.randint(0, 2)] * ct
    while True:
        if tick >= cnt0 + bt:
            tick = 0
            cnt0 = ts[random.randint(0, 2)] * ct
            cur_color = (cur_color + 1) % len(colors)

        if tick < cnt0:
            yield make_frame(*unpack(colors[cur_color]))
        else:
            yield make_frame(0, 0, 0)

        tick += 1


functions = {
    "strobe": make_strobe,
    "tracer": make_tracer,
    "edge": make_edge,
    "fade": make_fade,
    "chase": make_chase,
    "flux": make_flux,
    "shift": make_shift,
    "lego": make_lego,
}


def make_pattern(title, colors, func_name, args, length=1000):
    canvas = Image.new("RGB", (length + 8, 72), (0, 0, 0))
    pixel_gen = functions[func_name](colors, *args)

    d = ImageDraw.Draw(canvas)
    d.fontmode = "1"
    d.text((4, 4), title, font=font)

    for i, color in enumerate(colors):
        canvas.paste(make_color(color, 12, 12), (4 + (i * 20), 26))

    for i in range(length):
        canvas.paste(pixel_gen.next(), (i + 4, 48))

    return canvas


palette_03 = [8, 16, 24]
palette_06 = [8, 12, 16, 20, 24, 28]
palette_07 = [1, 8, 12, 16, 20, 24, 28]
palette_s2 = [8, 16, 24, 8, 16, 24]
palette_s3 = [8, 10, 12, 16, 18, 20, 24, 26, 28]
palette_s5 = [8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28]
patterns = [
    Pattern("Ribbon",           palette_03, "strobe", (20, 0, 0, 0, 0, 0)),
    Pattern("Strobe",           palette_03, "strobe", (9, 16, 0, 0, 0, 0)),
    Pattern("Nano",             palette_03, "strobe", (1, 24, 0, 0, 0, 0)),
    Pattern("Dops",             palette_03, "strobe", (3, 22, 0, 0, 0, 0)),
    Pattern("Spaz",             palette_03, "strobe", (5, 45, 0, 0, 0, 0)),
    Pattern("Seizure",          palette_03, "strobe", (10, 190, 0, 0, 0, 0)),
    Pattern("Hyper",            palette_03, "strobe", (25, 25, 0, 0, 0, 0)),
    Pattern("Blink",            palette_07, "strobe", (5, 0, 85, 0, 0, 0)),
    Pattern("Stutter",          palette_03, "strobe", (10, 5, 55, 0, 0, 0)),
    Pattern("Strib",            palette_06, "strobe", (10, 0, 70, 3, 1, 1)),
    Pattern("Flicker",          palette_06, "strobe", (2, 1, 41, 3, 1, 1)),
    Pattern("Strobe2",          palette_03, "strobe", (9, 16, 0, 2, 1, 8)),
    Pattern("Dops3",            palette_06, "strobe", (3, 22, 0, 3, 1, 8)),
    Pattern("Blink2",           palette_s2, "strobe", (5, 0, 90, 2, 2, 1)),
    Pattern("Blink3",           palette_s3, "strobe", (5, 0, 85, 3, 3, 1)),
    Pattern("Stutter3",         palette_s3, "strobe", (10, 5, 55, 3, 3, 1)),
    Pattern("Tracer",           palette_07, "tracer", (5, 0, 20, 0, 1, 0, 0)),
    Pattern("Sandwich",         palette_07, "tracer", (9, 16, 9, 0, 1, 0, 0)),
    Pattern("Hypenated",        palette_07, "tracer", (25, 25, 25, 0, 2, 1, 0)),
    Pattern("Dashed",           palette_07, "tracer", (10, 0, 30, 20, 3, 1, 1)),
    Pattern("Dotted",           palette_07, "tracer", (8, 2, 43, 0, 3, 1, 0)),
    Pattern("Laced",            palette_07, "tracer", (5, 0, 5, 20, 0, 0, 2)),
    Pattern("Firework",         palette_07, "tracer", (5, 5, 20, 20, 3, 1, 0)),
    Pattern("Bottlerocket",     palette_07, "tracer", (5, 5, 10, 40, 2, 1, 0)),
    Pattern("Razor",            palette_07, "edge",   (2, 0, 4, 60, 0, 0)),
    Pattern("Barbs",            palette_07, "edge",   (2, 1, 4, 60, 0, 0)),
    Pattern("Sword",            palette_07, "edge",   (8, 0, 12, 80, 0, 0)),
    Pattern("Chainsword",       palette_07, "edge",   (5, 3, 12, 80, 0, 0)),
    Pattern("Razor3",           palette_s3, "edge",   (2, 0, 4, 60, 3, 3)),
    Pattern("Barbs3",           palette_s3, "edge",   (2, 1, 4, 60, 3, 3)),
    Pattern("Sword3",           palette_s3, "edge",   (8, 0, 12, 80, 3, 3)),
    Pattern("Chainsword3",      palette_s3, "edge",   (5, 3, 12, 80, 3, 3)),
    Pattern("Pulse",            palette_03, "fade",   (200, 0, 0, 50, 1, 1)),
    Pattern("Pulsar",           palette_03, "fade",   (20, 5, 50, 250, 3, 4)),
    Pattern("Fader",            palette_03, "fade",   (20, 5, 50, 250, 2, 8)),
    Pattern("Morph",            palette_03, "fade",   (1000, 0, 0, 0, 0, 1)),
    Pattern("Dop Morph",        palette_03, "fade",   (3, 22, 0, 0, 0, 4)),
    Pattern("Strobe Morph",     palette_03, "fade",   (9, 16, 0, 0, 0, 4)),
    Pattern("Hyper Morph",      palette_03, "fade",   (25, 25, 0, 0, 0, 4)),
    Pattern("Dash Morph",       palette_03, "fade",   (9, 16, 34, 16, 0, 4)),
    Pattern("Ember",            palette_03, "flux",   (2, 10, 0, 5)),
    Pattern("Comet",            palette_03, "flux",   (2, 10, 1, 5)),
    Pattern("Asteroid",         palette_03, "flux",   (10, 50, 1, 5)),
    Pattern("Meteor",           palette_03, "flux",   (4, 10, 4, 4)),
    Pattern("Flux",             palette_03, "flux",   (5, 15, 3, 4)),
    Pattern("Influx",           palette_03, "flux",   (5, 25, 7, 4)),
    Pattern("Shifter",          palette_06, "shift",  (5, 5, 50, 0, 0, 0, 3)),
    Pattern("Shifter3",         palette_06, "shift",  (5, 5, 50, 0, 3, 1, 3)),
    Pattern("Chase",            palette_03, "chase",  (10, 5)),
    Pattern("Pursuit",          palette_03, "chase",  (10, 10)),
    Pattern("Lego",             palette_03, "lego",   (10, 20, 0)),
    Pattern("Micros",           palette_03, "lego",   (5, 20, 1)),
]


strobes = [
    (25, 0, 0, 0, 0, 0),
    (10, 15, 0, 0, 0, 0),

    (10, 0, 50, 0, 0, 0),
    (5, 5, 50, 0, 0, 0),

    (10, 0, 50, 2, 0, 0),
    (5, 5, 50, 3, 0, 0),

    (10, 15, 0, 2, 1, 4),
    (10, 15, 0, 3, 1, 4),
    (10, 15, 0, 3, 2, 4),
]

if __name__ == "__main__":
    # import sys
    # if len(sys.argv) == 2:
    #     it = enumerate(patterns[:int(sys.argv[1])])
    # elif len(sys.argv) == 3:
    #     it = enumerate(patterns[int(sys.argv[1]):int(sys.argv[2])])
    # else:
    #     it = enumerate(patterns)

    # md = []
    # for i, pat in it:
    #     img = make_pattern("%02d. %s" % (i, pat.name), pat.colors, pat.func_name, pat.args)
    #     img.save("upstream/%02d.png" % i)
    #     md.append("![%s](/images/upstream/%02d.png)\n" % (pat.name, i))

    # with open("imgs.md", "w") as f:
    #     f.writelines(md)

    md = []
    for i, args in enumerate(strobes):
        title = "strobe: %s, blank: %s, tail blank: %s, set: %s, skip: %s, repeat: %s" % args
        filename = "upstream/strobe_%02d.png" % i
        img = make_pattern(title, palette_06, "strobe", args)
        img.save(filename)
        md.append("![%s](/images/%s)\n" % (title, filename))

    with open("imgs.md", "w") as f:
        f.writelines(md)
