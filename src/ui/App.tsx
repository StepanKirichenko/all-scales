import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { Piano, PianoContextProvider } from "./components/Piano";
import "./App.css";
import { playNote, stopNote, activate } from "../services/sound";

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

    "": "43",
    "6": "432",
    "7": "433",
    maj7: "434",

    sus2: "25",
    sus4: "52",
    aug: "44",
    dim: "33",
} as const;

type ChordName = keyof typeof CHORDS;

const CHORD_NAMES = Array.from(Object.keys(CHORDS)) as ChordName[];

const SCALES = {
    ionian: "2212221",
    eolian: "2122122",
    pentatonic: "22323",
    stepHalfstep: "12121212",
} as const;

type Scale = keyof typeof SCALES;
type Chord = keyof typeof CHORDS;

function getRange(from: number, to: number): number[] {
    let result: number[] = [];
    if (from > to) {
        [from, to] = [to, from];
    }

    while (from < to) {
        result.push(from);
        from += 1;
    }

    return result;
}

export function getPossibleChords(scaleName: Scale, tonic: string): Set<string> {
    const possibleChords = new Set<string>();

    const scale = SCALES[scaleName];
    for (let fromIndex = 0; fromIndex < scale.length; fromIndex += 1) {
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
                const ch = getNoteInScale(scaleName, tonic, fromIndex)[0] + chord;
                possibleChords.add(ch);
            }
        }
    }

    return possibleChords;
}

function getNoteInScale(scaleName: Scale, tonic: string, stepIndex: number): [string, number] {
    const scale = SCALES[scaleName];
    let octaveIndex = 1;

    if (stepIndex >= scale.length) {
        stepIndex = stepIndex % scale.length;
        octaveIndex = 2;
    }

    let tonicIndex = NOTES.indexOf(tonic + "1");
    let offset = 0;

    for (let i = 0; i < stepIndex; i++) {
        offset += Number(scale[i]);
    }

    const noteIndex = tonicIndex + offset;
    octaveIndex = noteIndex > 11 || octaveIndex == 2 ? 2 : 1;

    return [NOTES[noteIndex].slice(0, -1), octaveIndex];
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

function keyCodeToNoteIndex(scaleName: Scale, tonic: string, keyCode: string): number {
    const noteInScaleIndex = keyCodeToStepIndex(keyCode);
    const [noteName, octaveIndex] = getNoteInScale(scaleName, tonic, noteInScaleIndex);
    return NOTES.indexOf(noteName + octaveIndex);
}

const KEYCODES: Record<string, number> = {
    Digit1: 0,
    Digit2: 1,
    Digit3: 2,
    Digit4: 3,
    Digit5: 4,
    Digit6: 5,
    Digit7: 6,
    Digit8: 7,
    Digit9: 8,
    Digit0: 9,
    Minus: 10,
    Equal: 11,
    Backspace: 12,
};

function keyCodeToStepIndex(keyCode: string): number {
    return KEYCODES[keyCode];
}

function App() {
    const [scale, setScale] = createSignal<Scale>("ionian");
    const [tonic, setTonic] = createSignal("c");

    const keydown = (e: KeyboardEvent) => {
        activate();
        if (!e.repeat && KEYCODES[e.code] !== undefined) {
            const note = keyCodeToNoteIndex(scale(), tonic(), e.code);
            playNote(note);
        }
    };

    const keyup = (e: KeyboardEvent) => {
        if (KEYCODES[e.code] !== undefined) {
            const note = keyCodeToNoteIndex(scale(), tonic(), e.code);
            stopNote(note);
        }
    };

    createEffect(() => {
        document.addEventListener("keydown", keydown);
        document.addEventListener("keyup", keyup);

        onCleanup(() => {
            document.removeEventListener("keydown", keydown);
            document.removeEventListener("keyup", keyup);
        });
    });

    const scaleNotes = () => buildScale(scale(), tonic());
    const [rootStep, setRootStep] = createSignal(0);
    const [chordName, setChordName] = createSignal<Chord>("");
    const rootNote = () => getNoteInScale(scale(), tonic(), rootStep());
    const chordNotes = () => buildChord(rootNote()[0], chordName());
    const possibleChords = () => getPossibleChords(scale(), tonic());
    const scaleLength = () => SCALES[scale()].length;

    return (
        <div class="app">
            <div class="flex-column-centered">
                <PianoContextProvider
                    chordNotes={chordNotes()}
                    scaleNotes={scaleNotes()}
                    tonic={tonic()}
                    setTonic={setTonic}
                >
                    <Piano />
                </PianoContextProvider>
                <div>
                    <select
                        onInput={(event) => {
                            setScale(event.target.value as Scale);
                        }}
                        value={scale()}
                    >
                        <option value="ionian">Ionian</option>
                        <option value="eolian">Eolian</option>
                        <option value="pentatonic">Pentatonic</option>
                        <option value="stepHalfstep">Step-halfstep</option>
                    </select>
                </div>
                <section class={`chord-table rows-${scaleLength()}`}>
                    <For each={CHORD_NAMES}>
                        {(chord) => (
                            <>
                                <For each={getRange(0, scaleLength())}>
                                    {(step) => {
                                        const ch = () =>
                                            `${getNoteInScale(scale(), tonic(), step)[0]}${chord}`;
                                        return (
                                            <button
                                                class="chord-button"
                                                disabled={!possibleChords().has(ch())}
                                                onClick={() => {
                                                    setRootStep(step);
                                                    setChordName(chord);
                                                }}
                                            >
                                                {ch()}
                                            </button>
                                        );
                                    }}
                                </For>
                            </>
                        )}
                    </For>
                </section>
            </div>
        </div>
    );
}

export default App;
