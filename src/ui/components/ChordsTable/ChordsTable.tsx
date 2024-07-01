import { CHORDS, OCTAVE_LENGTH } from "@lib/constants";
import { getNoteBaseName, getNoteInScale } from "@lib/music";
import { getRange } from "@lib/utils";
import { For } from "solid-js";
import "./ChordsTable.css";
import { Scale } from "@lib/scales";
import { Plus } from "@ui/icons/Plus";

interface ChordsTableProps {
    scale: Scale;
    modus: string;
    tonic: number;
    possibleChords: Record<string, number[]>;
    rootNote: number;
    chordName: string;
    setRootNote: (note: number) => void;
    setChordName: (chord: string) => void;
}

export function ChordsTable(props: ChordsTableProps) {
    const scaleLength = () => props.modus.length;

    let chords: string[] = [];
    for (const group of CHORDS) {
        for (const chord of group.chords) {
            chords.push(chord.name);
        }
    }

    return (
        <section class="chord-table">
            <For each={chords}>
                {(chord) => (
                    <div class="chord-table__column">
                        <For each={props.possibleChords[chord]}>
                            {(stepIndex) => {
                                const note = () =>
                                    getNoteInScale(props.modus, props.tonic, stepIndex) %
                                    OCTAVE_LENGTH;
                                const noteName = () => getNoteBaseName(note());
                                const chordDisplayName = () => noteName() + chord;
                                const isActive = () =>
                                    note() === props.rootNote && chord === props.chordName;

                                return (
                                    <div class="chord-button-container">
                                        <button
                                            classList={{
                                                "chord-button": true,
                                                active: isActive(),
                                            }}
                                            // onClick={() => {
                                            //     props.setRootNote(note());
                                            //     props.setChordName(chord.name);
                                            // }}
                                        >
                                            {chordDisplayName()}
                                        </button>
                                        <button class="chord-button__add-to-sequence">
                                            <div>
                                                <Plus />
                                            </div>
                                        </button>
                                    </div>
                                );
                            }}
                        </For>
                    </div>
                )}
            </For>
        </section>
    );
}
