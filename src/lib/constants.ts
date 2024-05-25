export const OCTAVE_LENGTH = 12;

export const NOTES = [
    "c1",
    "c#1",
    "d1",
    "d#1",
    "e1",
    "f1",
    "f#1",
    "g1",
    "g#1",
    "a1",
    "a#1",
    "b1",
    "c2",
    "c#2",
    "d2",
    "d#2",
    "e2",
    "f2",
    "f#2",
    "g2",
    "g#2",
    "a2",
    "a#2",
    "b2",
];

export const CHORDS = {
    m: "34",
    m6: "342",
    m7: "343",

    "": "43",
    "6": "432",
    "7": "433",
    maj7: "434",

    sus2: "25",
    sus4: "52",
    aug: "44",
    dim: "33",
} as const;

export type ChordName = keyof typeof CHORDS;

export const CHORD_NAMES = Array.from(Object.keys(CHORDS)) as ChordName[];

export const SCALES = {
    ionian: {
        name: "Ionian",
        intervals: "2212221",
    },
    eolian: { name: "Eolian", intervals: "2122122" },
    pentatonic: { name: "Pentatonic", intervals: "22323" },
    stepHalfstep: { name: "Step-halfstep", intervals: "12121212" },
} as const;

export type Scale = keyof typeof SCALES;
export type Chord = keyof typeof CHORDS;
