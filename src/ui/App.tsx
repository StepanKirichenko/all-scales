import { usePlayKeyboardSound } from "@services/sound";
import { Chord, OCTAVE_LENGTH, Scale } from "@lib/constants";
import { buildChord, buildScale, getPossibleChords } from "@lib/music";
import { ChordsTable } from "@ui/components/ChordsTable";
import { Piano } from "@ui/components/Piano";
import { ScaleSelect } from "@ui/components/ScaleSelect";
import { createSignal } from "solid-js";
import "./App.css";

function App() {
    const [scale, setScale] = createSignal<Scale>("ionian");
    const [tonic, setTonic] = createSignal(0);
    const [rootNote, setRootNote] = createSignal(0);
    const [chordName, setChordName] = createSignal<Chord>("");

    const scaleNotes = () => buildScale(scale(), tonic());
    const chordNotes = () => buildChord(chordName(), rootNote());
    const possibleChords = () => getPossibleChords(scale());

    const onPianoKeyClick = (note: number) => {
        setTonic(note % OCTAVE_LENGTH);
    };

    usePlayKeyboardSound(scale, tonic);

    return (
        <div class="app">
            <div class="flex-column-centered">
                <Piano
                    chordNotes={chordNotes()}
                    scaleNotes={scaleNotes()}
                    tonic={tonic()}
                    onClick={onPianoKeyClick}
                />
                <div>
                    <ScaleSelect scale={scale()} setScale={setScale} />
                </div>
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

export default App;
