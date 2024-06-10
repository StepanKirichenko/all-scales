import { CHORD_INTERVALS, NOTES, OCTAVE_LENGTH } from "@lib/constants";

/**
 * Get all the chords possible in the current scale
 * @param scaleName
 * @returns Array of sets of chords that can be built from each of the scale's steps
 */
export function getPossibleChords(modusName: string): Array<Set<string>> {
    const possibleChords: Array<Set<string>> = [];

    const scale = modusName;
    for (let fromIndex = 0; fromIndex < scale.length; fromIndex += 1) {
        const currentStepChords = new Set<string>();

        for (const chord in CHORD_INTERVALS) {
            let isFitting = true;
            let intervals = CHORD_INTERVALS[chord];
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
                currentStepChords.add(chord);
            }
        }

        possibleChords.push(currentStepChords);
    }

    return possibleChords;
}

export function getNoteInScale(modus: string, tonic: number, step: number): number {
    const intervals = modus;

    let offset = 0;

    for (let i = 0; i < step; i++) {
        offset += Number(intervals[i % intervals.length]);
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
export function buildScale(modus: string, tonic: number): Map<number, number> {
    const steps = modus;
    const result = new Map<number, number>();
    let stepIndex = 0;
    let noteIndex = tonic;
    while (noteIndex < NOTES.length) {
        result.set(noteIndex, stepIndex);
        noteIndex += Number(steps[stepIndex]);
        stepIndex = (stepIndex + 1) % steps.length;
    }
    stepIndex = steps.length - 1;
    noteIndex = tonic;
    while (true) {
        noteIndex -= Number(steps[stepIndex]);
        if (noteIndex < 0) break;
        result.set(noteIndex, stepIndex);
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
export function buildChord(chordName: string, prima: number): Set<number> {
    const chordNotes = new Set<number>();
    chordNotes.add(prima);
    let currentIndex = prima;

    if (!CHORD_INTERVALS[chordName]) return chordNotes;

    for (let interval of CHORD_INTERVALS[chordName]) {
        currentIndex += Number(interval);
        if (currentIndex >= NOTES.length) break;

        chordNotes.add(currentIndex);
    }

    return chordNotes;
}
