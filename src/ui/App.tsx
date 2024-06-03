import { usePlayKeyboardSound } from "@services/sound";
import { OCTAVE_LENGTH } from "@lib/constants";
import {
    buildChord,
    buildScale,
    getNoteBaseName,
    getNoteInScale,
    getPossibleChords,
} from "@lib/music";
import { ChordsTable } from "@ui/components/ChordsTable";
import { Piano } from "@ui/components/Piano";
import { ScaleSelect } from "@ui/components/ScaleSelect";
import { For, createEffect, createSignal } from "solid-js";
import "./App.css";
import { useKeyboardInput } from "@services/keyboard";
import { scale, setScale, setTonic, tonic } from "./global-state";

type Mode = "choose-tonic" | "play";

function App() {
    const [mode, setMode] = createSignal<Mode>("choose-tonic");
    const [rootNote, setRootNote] = createSignal(0);
    const [chordName, setChordName] = createSignal<string>("");
    const [bars, setBars] = createSignal<BarProps[]>([]);

    const scaleNotes = () => buildScale(scale(), tonic());
    const chordNotes = () => buildChord(chordName(), rootNote());
    const possibleChords = () => getPossibleChords(scale());

    const pressedKeys = useKeyboardInput(scale, tonic);

    usePlayKeyboardSound(pressedKeys);

    const onPianoKeyClick = (note: number) => {
        if (mode() === "choose-tonic") {
            setTonic(note % OCTAVE_LENGTH);
        }
    };

    const onPianoKeyPointerDown = (note: number) => {
        if (mode() === "play") {
            pressedKeys.add(note);
        }
    };

    const onPianoKeyPointerUp = (note: number) => {
        if (mode() === "play") {
            pressedKeys.delete(note);
        }
    };

    const onModeToggle = () => {
        setMode((prevMode) => (prevMode === "choose-tonic" ? "play" : "choose-tonic"));
    };

    createEffect(() => {
        setRootNote(tonic());
        const possibleTonicChords = possibleChords()[0];
        const chord = possibleTonicChords.has("")
            ? ""
            : possibleTonicChords.has("m")
              ? "m"
              : possibleTonicChords.values().next().value;
        setChordName(chord);
    });

    setBars([
        { stepIndex: 0, chordName: "" },
        { stepIndex: 3, chordName: "m" },
        { stepIndex: 4, chordName: "" },
        { stepIndex: 0, chordName: "" },
    ]);

    return (
        <div class="app">
            <div class="flex-column-centered">
                <button onClick={onModeToggle}>
                    {mode() === "choose-tonic" ? "Play" : "Choose tonic"}
                </button>
                <Piano
                    chordNotes={chordNotes()}
                    scaleNotes={scaleNotes()}
                    keysPressed={pressedKeys}
                    onClick={onPianoKeyClick}
                    onPointerDown={onPianoKeyPointerDown}
                    onPointerUp={onPianoKeyPointerUp}
                />
                <div>
                    <ScaleSelect scale={scale()} setScale={setScale} />
                </div>

                <Progression bars={bars()} />

                <ChordsTable
                    scale={scale()}
                    tonic={tonic()}
                    rootNote={rootNote()}
                    chordName={chordName()}
                    possibleChords={possibleChords()}
                    setRootNote={setRootNote}
                    setChordName={setChordName}
                />
            </div>
        </div>
    );
}

interface BarProps {
    stepIndex: number;
    chordName: string;
}

interface ProgressionProps {
    bars: BarProps[];
}

function Progression(props: ProgressionProps) {
    return (
        <div class={`chord-progression`}>
            <For each={props.bars}>{(bar: BarProps) => <Bar {...bar} />}</For>
            <AddBarButton />
        </div>
    );
}

function Bar(props: BarProps) {
    const note = () => getNoteInScale(scale(), tonic(), props.stepIndex) % OCTAVE_LENGTH;
    const noteName = () => getNoteBaseName(note());
    const chordDisplayName = () => noteName() + props.chordName;
    return (
        <div class="bar">
            <button class="bar-chord" onClick={() => {}}>
                {chordDisplayName()}
            </button>
            <br />
            <button class="delete">{"x"}</button>
            <div class="arrows-container">
                <button class="move-left">{"<"}</button>
                <button class="move-right">{">"}</button>
            </div>
        </div>
    );
}

function AddBarButton() {
    return (
        <button class="chord-button" onClick={() => {}}>
            +
        </button>
    );
}

export default App;
