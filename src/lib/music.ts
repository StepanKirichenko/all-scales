import { CHORDS, Chord, NOTES, OCTAVE_LENGTH, SCALES, Scale } from "@lib/constants";

/**
 * Get all the chords possible in the current scale
 * @param scaleName
 * @returns Array of sets of chords that can be built from each of the scale's steps
 */
export function getPossibleChords(scaleName: Scale): Array<Set<Chord>> {
    const possibleChords: Array<Set<Chord>> = [];

    const scale = SCALES[scaleName].intervals;
    for (let fromIndex = 0; fromIndex < scale.length; fromIndex += 1) {
        const currentStepChords = new Set<Chord>();

        for (const chord in CHORDS) {
            let isFitting = true;
            let intervals = CHORDS[chord as Chord];
            let currentStepIndex = fromIndex;

            for (let interval of intervals) {
                let acc = 0;

                while (acc < Number(interval)) {
                    acc += Number(scale[currentStepIndex]);
                    currentStepIndex = (currentStepIndex + 1) % scale.length;
                }

                if (acc > Number(interval)) {
                    isFitting = false;
                }
            }

            if (isFitting) {
                currentStepChords.add(chord as Chord);
            }
        }

        possibleChords.push(currentStepChords);
    }

    return possibleChords;
}

export function getNoteInScale(scaleName: Scale, tonic: number, step: number): number {
    const scale = SCALES[scaleName].intervals;

    let offset = 0;

    for (let i = 0; i < step; i++) {
        offset += Number(scale[i % scale.length]);
    }

    return tonic + offset;
}

export function getNoteBaseName(note: number): string {
    return NOTES[note % OCTAVE_LENGTH].slice(0, -1);
}

/**
 * Creates a specified scale from a specified tonic
 * @param scale The name of the scale
 * @param tonic The index of the tonic in the NOTES array
 * @returns A set of indices of notes included in the scale
 */
export function buildScale(scale: Scale, tonic: number): Set<number> {
    const steps = SCALES[scale].intervals.split("").map((s) => Number(s));
    const result = new Set<number>();
    let stepIndex = 0;
    let noteIndex = tonic;
    while (noteIndex < NOTES.length) {
        result.add(noteIndex);
        noteIndex += steps[stepIndex];
        stepIndex = (stepIndex + 1) % steps.length;
    }
    stepIndex = steps.length - 1;
    noteIndex = tonic;
    while (true) {
        noteIndex -= steps[stepIndex];
        if (noteIndex < 0) break;
        result.add(noteIndex);
        stepIndex = (stepIndex - 1 + steps.length) % steps.length;
    }
    return result;
}

/**
 * Creates a chord with a specified prima
 * @param chordName The name of the chord
 * @param prima The index of prima in the NOTES array
 * @returns A set of indices of notes included in the chord
 */
export function buildChord(chordName: Chord, prima: number): Set<number> {
    const chordNotes = new Set<number>();
    chordNotes.add(prima);
    let currentIndex = prima;

    for (let interval of CHORDS[chordName]) {
        currentIndex += Number(interval);
        if (currentIndex >= NOTES.length) break;

        chordNotes.add(currentIndex);
    }

    return chordNotes;
}