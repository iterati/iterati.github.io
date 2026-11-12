// The site's own words, as the captain settled them. A note's or a toy page's words live in content/.

export const hello = {
  line: 'Trying my best to reflect the beauty in the world, one experiment at a time.',
  day: 'Staff engineer by day, mad scientist and artist at night.',
};

export const links = [
  { name: 'GitHub', href: 'https://github.com/iterati' },
  { name: 'MakerWorld', href: 'https://makerworld.com/en/@iterati' },
];

export type ToyKey = 'bermuda' | 'elements' | 'twinky' | 'hypercube';

export interface Toy {
  key: ToyKey;
  name: string;
  what: string;
  status: string;
  live?: boolean;
  /** Where the card goes when the toy has no page of its own here. */
  href?: string;
}

// The toy strip, in order; a toy with a content/toys/<key>.md page links to it.
export const toys: Toy[] = [
  {
    key: 'bermuda',
    name: 'Bermuda',
    what: 'A shader instrument. Stack patterns, ride slow waves, play it with MIDI.',
    status: 'play it',
    live: true,
  },
  {
    key: 'elements',
    name: 'Elements',
    what: 'Rhombic dodecahedra I print and give away at festivals.',
    status: 'given away',
  },
  {
    key: 'twinky',
    name: 'twinky',
    what: 'My animated Christmas tree lights.',
    status: 'being redesigned',
    href: '/twinky/',
  },
  {
    key: 'hypercube',
    name: 'Infinity hypercube',
    what: 'A hypercube of lights and mirrors.',
    status: 'someday',
  },
];
