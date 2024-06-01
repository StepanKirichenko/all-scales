import { CHORDS, OCTAVE_LENGTH } from "@lib/constants";
import { getNoteBaseName, getNoteInScale } from "@lib/music";
import { getRange } from "@lib/utils";
import { For } from "solid-js";
import "./ChordsTable.css";
import { getIntervalsByModus, Scale } from "@lib/scales";

interface ChordsTableProps {
    scale: Scale;
    modus: string;
    tonic: number;
    possibleChords: Array<Set<string>>;
    rootNote: number;
    chordName: string;
    setRootNote: (note: number) => void;
    setChordName: (chord: string) => void;
}

export function ChordsTable(props: ChordsTableProps) {
    const scaleLength = () => getIntervalsByModus(props.scale, props.modus).length;

    return (
        <section class={`chord-table rows-${scaleLength()}`}>
            <For each={CHORDS}>
                {(group) => (
                    <>
                        <For each={group.chords}>
                            {(chord) => (
                                <>
                                    <For each={getRange(0, scaleLength())}>
                                        {(step) => {
                                            const note = () =>
                                                getNoteInScale(props.scale, props.modus, props.tonic, step) %
                                                OCTAVE_LENGTH;
                                            const noteName = () => getNoteBaseName(note());
                                            const chordDisplayName = () => noteName() + chord.name;
                                            const isActive = () =>
                                                note() === props.rootNote &&
                                                chord.name === props.chordName;

                                            return (
                                                <button
                                                    classList={{
                                                        "chord-button": true,
                                                        active: isActive(),
                                                    }}
                                                    disabled={
                                                        !props.possibleChords[step].has(chord.name)
                                                    }
                                                    onClick={() => {
                                                        props.setRootNote(note());
                                                        props.setChordName(chord.name);
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
                        <div class="break"></div>
                    </>
                )}
            </For>
        </section>
    );
}
