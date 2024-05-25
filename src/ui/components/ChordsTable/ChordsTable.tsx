import { CHORD_NAMES, Chord, OCTAVE_LENGTH, SCALES, Scale } from "@lib/constants";
import { getNoteBaseName, getNoteInScale } from "@lib/music";
import { getRange } from "@lib/utils";
import { For } from "solid-js";
import "./ChordsTable.css";

interface ChordsTableProps {
    scale: Scale,
    tonic: number,
    possibleChords: Array<Set<Chord>>;
    rootNote: number;
    chordName: Chord;
    setRootNote: (note: number) => void;
    setChordName: (chord: Chord) => void;
}

export function ChordsTable(props: ChordsTableProps) {
    const scaleLength = () => SCALES[props.scale].intervals.length;

    return (
        <section class={`chord-table rows-${scaleLength()}`}>
            <For each={CHORD_NAMES}>
                {(chord) => (
                    <>
                        <For each={getRange(0, scaleLength())}>
                            {(step) => {
                                const note = () =>
                                    getNoteInScale(props.scale, props.tonic, step) % OCTAVE_LENGTH;
                                const noteName = () => getNoteBaseName(note());
                                const chordDisplayName = () => noteName() + chord;
                                const isActive = () => note() === props.rootNote && chord === props.chordName;

                                return (
                                    <button
                                        classList={{"chord-button": true, active: isActive()}}
                                        disabled={!props.possibleChords[step].has(chord)}
                                        onClick={() => {
                                            props.setRootNote(note());
                                            props.setChordName(chord);
                                        }}
                                    >
                                        {chordDisplayName()}
                                    </button>
                                );
                            }}
                        </For>
                    </>
                )}
            </For>
        </section>
    );
}
