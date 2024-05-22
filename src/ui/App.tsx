import { createSignal } from "solid-js";
import { Piano, PianoContextProvider } from "./components/Piano";

import "./App.css";

const NOTES = [
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

const CHORDS = {
    m: "34",
    m6: "342",
    m7: "343",

    maj: "43",
    "6": "432",
    "7": "433",
    maj7: "434",

    sus2: "25",
    sus4: "52",
    aug: "44",
    dim: "33",
};

const SCALES = {
    ionian: "2212221",
    eolian: "2122122",
    pentatonic: "22323",
} as const;

type Scale = keyof typeof SCALES;
type Chord = keyof typeof CHORDS;

export function getPossibleChords(scale: string, fromIndex: number = 0): string[] {
    let possibleChords = [];

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
            possibleChords.push(chord);
        }
    }

    return possibleChords;
}

function getNoteInScale(scaleName: Scale, tonic: string, stepIndex: number) {
    const scale = SCALES[scaleName];

    if (stepIndex >= scale.length) {
        return tonic;
    }
    
    let tonicIndex = NOTES.indexOf(tonic + "1");
    let offset = 0;

    for (let i = 0; i < stepIndex; i++) {
        offset += Number(scale[i]);
    }

    return NOTES[tonicIndex + offset].slice(0, -1);
}

export function buildScale(scale: Scale, tonic: string): string[] {
    const steps = SCALES[scale].split("").map((s) => Number(s));
    const result: string[] = [];
    const tonicIndex = NOTES.findIndex((note) => note.startsWith(tonic));
    let stepIndex = 0;
    let noteIndex = tonicIndex;
    while (noteIndex < NOTES.length) {
        result.push(NOTES[noteIndex]);
        noteIndex += steps[stepIndex];
        stepIndex = (stepIndex + 1) % steps.length;
    }
    stepIndex = steps.length - 1;
    noteIndex = tonicIndex;
    while (true) {
        noteIndex -= steps[stepIndex];
        if (noteIndex < 0) break;
        result.unshift(NOTES[noteIndex]);
        stepIndex = (stepIndex - 1 + steps.length) % steps.length;
    }
    return result;
}

function buildChord(prima: string, chordName: Chord): string[] {
    let chordNotes = [prima + "1"];
    let currentIndex = NOTES.indexOf(chordNotes[0]);

    for (let interval of CHORDS[chordName]) {
        currentIndex += Number(interval);

        if (currentIndex >= NOTES.length) break;

        chordNotes.push(NOTES[currentIndex]);
    }

    return chordNotes;
}

function App() {
    const [scale, setScale] = createSignal<Scale>("ionian");
    const [tonic, setTonic] = createSignal("c");

    // const notes = () => buildScale(scale(), tonic());
    const rootNote = () => getNoteInScale(scale(), tonic(), 6);
    const notes = () => buildChord(rootNote(), "maj7");

    return (
        <div class="app">
            <PianoContextProvider highlightedNotes={notes()} tonic={tonic()} setTonic={setTonic}>
                <Piano />
            </PianoContextProvider>
            <select
                onInput={(event) => {
                    setScale(event.target.value as Scale);
                }}
                value={scale()}
            >
                <option value="ionian">Ionian</option>
                <option value="eolian">Eolian</option>
                <option value="pentatonic">Pentatonic</option>
            </select>
        </div>
    );
}

export default App;
