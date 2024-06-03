import { usePlayKeyboardSound } from "@services/sound";
import { OCTAVE_LENGTH } from "@lib/constants";
import { buildChord, buildScale, getPossibleChords } from "@lib/music";
import { ChordsTable } from "@ui/components/ChordsTable";
import { Piano } from "@ui/components/Piano";
import { ModusSelect, RandomizeButton, ScaleSelect } from "@ui/components/ScaleSelect";
import { createEffect, createSignal } from "solid-js";
import { useKeyboardInput } from "@services/keyboard";
import { Scale } from "@lib/scales";
import { FavoriteSelect } from "./components/FavoriteSelect";
import "./App.css";

type Mode = "choose-tonic" | "play";

function App() {
    const [mode, setMode] = createSignal<Mode>("choose-tonic");
    const [scale, setScale] = createSignal<Scale>("diatonic");
    const [modus, setModus] = createSignal<string>("ionian");
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

    const [favoriteList, setFavoriteList] = createSignal<string[]>([]);

    const currentScaleAndModeId = () => scale() + ";" + modus();
    const currentScaleAndModeInFavorite = () => favoriteList().includes(currentScaleAndModeId());

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
                    <FavoriteSelect
                        favoriteList={favoriteList()}
                        setScale={setScale}
                        setModus={setModus}
                    />
                    <ScaleSelect scale={scale()} setScale={setScale} setModus={setModus} />
                    <ModusSelect scale={scale()} modus={modus()} setModus={setModus} />
                    <RandomizeButton
                        scale={scale()}
                        setScale={setScale}
                        modus={modus()}
                        setModus={setModus}
                    />
                    <button
                        onClick={() => {
                            if (currentScaleAndModeInFavorite()) {
                                setFavoriteList((prev) =>
                                    prev.filter((id) => id !== currentScaleAndModeId()),
                                );
                            } else {
                                setFavoriteList((prev) => [...prev, currentScaleAndModeId()]);
                            }
                        }}
                    >
                        {favoriteList().includes(currentScaleAndModeId())
                            ? "Remove from favorite"
                            : "Add to favorite"}
                    </button>
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
