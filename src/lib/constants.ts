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

export type Chord = {
    name: string;
    intervals: string;
};

export type ChordGroup = {
    name: string;
    chords: Chord[];
};

export const CHORDS: ChordGroup[] = [
    {
        name: "major",
        chords: [
            { name: "", intervals: "43" },
            { name: "6", intervals: "432" },
            { name: "7", intervals: "433" },
            { name: "maj7", intervals: "434" },
        ],
    },
    {
        name: "minor",
        chords: [
            { name: "m", intervals: "34" },
            { name: "m6", intervals: "342" },
            { name: "m7", intervals: "343" },
        ],
    },
    {
        name: "other",
        chords: [
            { name: "sus2", intervals: "25" },
            { name: "sus4", intervals: "52" },
            { name: "aug", intervals: "44" },
            { name: "dim", intervals: "33" },
        ],
    },
] as const;

export const CHORD_INTERVALS: Record<string, string> = {};

for (const chordGroup of CHORDS) {
    for (const chord of chordGroup.chords) {
        CHORD_INTERVALS[chord.name] = chord.intervals;
    }
}

const HARMONIC = {
    major: { name: "Harmonic major", intervals: "2212131" },
    minor: { name: "Harmonic minor", intervals: "2122131" },
};

