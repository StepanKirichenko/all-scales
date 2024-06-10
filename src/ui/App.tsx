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
    const [scale, setScale] = createSignal<Scale>("2122122");
    const [modus, setModus] = createSignal<string>("2122122");
    const [tonic, setTonic] = createSignal(0);
    const [rootNote, setRootNote] = createSignal(0);
    const [chordName, setChordName] = createSignal<string>("");

    const scaleNotes = () => buildScale(modus(), tonic());
    const chordNotes = () => buildChord(chordName(), rootNote());
    const possibleChords = () => getPossibleChords(modus());

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

    const [favoriteList, setFavoriteList] = createSignal<string[]>(
        JSON.parse(localStorage.getItem("favoriteList") ?? "null") ?? [],
    );

    const currentScaleAndModeId = () => scale() + ";" + modus();
    const currentScaleAndModeInFavorite = () => favoriteList().includes(currentScaleAndModeId());

    const toggleFavorite = () => {
        if (currentScaleAndModeInFavorite()) {
            setFavoriteList((prev) => prev.filter((id) => id !== currentScaleAndModeId()));
        } else {
            setFavoriteList((prev) => [...prev, currentScaleAndModeId()]);
        }
    };

    const isModeInFavorites = (mode: string) => favoriteList().includes(scale() + ";" + mode);

    const toggleModeFavorite = (mode: string) => {
        const scaleAndMode = scale() + ";" + mode;
        if (isModeInFavorites(mode)) {
            setFavoriteList((prev) => prev.filter((id) => id !== scaleAndMode));
        } else {
            setFavoriteList((prev) => [...prev, scaleAndMode]);
        }
    };

    createEffect(() => localStorage.setItem("favoriteList", JSON.stringify(favoriteList())));

    return (
        <div class="app">
            <section class="scale-mode-select-section">
                <FavoriteSelect
                    favoriteList={favoriteList()}
                    setScale={setScale}
                    setModus={setModus}
                />
                <ScaleSelect scale={scale()} setScale={setScale} setModus={setModus} />
                <ModusSelect
                    scale={scale()}
                    modus={modus()}
                    setModus={setModus}
                    isModusFavorite={isModeInFavorites}
                    toggleModusFavorite={toggleModeFavorite}
                />
                <div class="buttons-row">
                    <RandomizeButton setScale={setScale} setModus={setModus} />
                </div>
            </section>
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
