import { usePlayKeyboardSound } from "@services/sound";
import { OCTAVE_LENGTH } from "@lib/constants";
import { buildChord, buildScale, getPossibleChords } from "@lib/music";
import { ChordsTable } from "@ui/components/ChordsTable";
import { Piano } from "@ui/components/Piano";
import { ModusSelect, RandomizeButton, ScaleSelect } from "@ui/components/ScaleSelect";
import { createEffect, createSignal } from "solid-js";
import "./App.css";
import { useKeyboardInput } from "@services/keyboard";
import { Modus, Scale } from "@lib/scales";

type Mode = "choose-tonic" | "play";

function App() {
    const [mode, setMode] = createSignal<Mode>("choose-tonic");
    const [scale, setScale] = createSignal<Scale>('scale_22323');
    const [modus, setModus] = createSignal<string>('mode_32232');
    const [tonic, setTonic] = createSignal(0);
    const [rootNote, setRootNote] = createSignal(0);
    const [chordName, setChordName] = createSignal<string>("");

    const scaleNotes = () => buildScale(scale(), modus(), tonic());
    const chordNotes = () => buildChord(chordName(), rootNote());
    const possibleChords = () => getPossibleChords(scale(), modus());

    const pressedKeys = useKeyboardInput(scale, modus, tonic);

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

    return (
        <div class="app">
            <div class="flex-column-centered">
                <button onClick={onModeToggle}>
                    {mode() === "choose-tonic" ? "Play" : "Stop playing"}
                </button>
                <Piano
                    chordNotes={chordNotes()}
                    scaleNotes={scaleNotes()}
                    tonic={tonic()}
                    keysPressed={pressedKeys}
                    onClick={onPianoKeyClick}
                    onPointerDown={onPianoKeyPointerDown}
                    onPointerUp={onPianoKeyPointerUp}
                />
                <div>
                    <ScaleSelect scale={scale()} setScale={setScale} />
                    <ModusSelect scale={scale()} modus={modus()} setModus={setModus} />
                    <RandomizeButton scale={scale()} setScale={setScale} modus={modus()} setModus={setModus} />
                </div>
                <ChordsTable
                    scale={scale()}
                    tonic={tonic()}
                    modus={modus()}
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

export default App;
