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

const SCALES = {
    ionian: "2212221",
    eolian: "2122122",
    pentatonic: "22323",
} as const;

type Scale = keyof typeof SCALES;

function buildScale(scale: Scale, tonic: string) {
    const steps = SCALES[scale].split('').map((s) => Number(s));
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

function App() {
    const [scale, setScale] = createSignal<Scale>("ionian");
    const [tonic, setTonic] = createSignal("c");

    const notes = () => buildScale(scale(), tonic());

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
