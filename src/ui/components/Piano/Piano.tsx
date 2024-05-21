import { For, Show } from "solid-js";
import styles from "./Piano.module.css";

const NOTES = ["c", "d", "e", "f", "g", "a", "b"];
const HAVE_SHARPS = ["c", "d", "f", "g", "a"];

interface PianoProps {
    highlightedNotes: string[];
    tonic: string;
    setTonic: (value: string) => void;
}

export function Piano(props: PianoProps) {
    return (
        <section class={styles.piano}>
            <Octave
                tonic={props.tonic}
                setTonic={props.setTonic}
                number="1"
                highlightedNotes={props.highlightedNotes}
            />
            <Octave
                tonic={props.tonic}
                setTonic={props.setTonic}
                number="2"
                highlightedNotes={props.highlightedNotes}
            />
        </section>
    );
}

interface OctaveProps {
    tonic: string;
    number: string;
    highlightedNotes: string[];
    setTonic: (value: string) => void;
}

function Octave(props: OctaveProps) {
    return (
        <For each={NOTES}>
            {(note) => (
                <WhiteKey
                    note={note}
                    octave={props.number}
                    tonic={props.tonic}
                    highlightedNotes={props.highlightedNotes}
                    setTonic={props.setTonic}
                />
            )}
        </For>
    );
}

interface WhiteKeyProps {
    octave: string;
    note: string;
    tonic: string;
    highlightedNotes: string[];
    setTonic: (value: string) => void;
}

function WhiteKey(props: WhiteKeyProps) {
    const hasSharp = () => HAVE_SHARPS.includes(props.note);
    const isHighlighted = () =>
        props.highlightedNotes.includes(props.note) ||
        props.highlightedNotes.includes(props.note + props.octave);
    const isTonic = () => props.note === props.tonic;
    return (
        <div class={styles.keyPair}>
            <button
                classList={{
                    [styles.whiteKey]: true,
                    [styles.highlighted]: isHighlighted(),
                    [styles.tonic]: isTonic(),
                }}
                onClick={() => props.setTonic(props.note)}
            ></button>
            <Show when={hasSharp()}>
                <BlackKey
                    tonic={props.tonic}
                    setTonic={props.setTonic}
                    baseNote={props.note}
                    octave={props.octave}
                    highlightedNotes={props.highlightedNotes}
                />
            </Show>
        </div>
    );
}

interface BlackKeyProps {
    baseNote: string;
    octave: string;
    tonic: string;
    highlightedNotes: string[];
    setTonic: (value: string) => void;
}

function BlackKey(props: BlackKeyProps) {
    const note = () => props.baseNote + "#";
    const isHighlighted = () =>
        props.highlightedNotes.includes(note()) ||
        props.highlightedNotes.includes(note() + props.octave);
    const isTonic = () => note() === props.tonic;
    return (
        <button
            classList={{
                [styles.blackKey]: true,
                [styles.highlighted]: isHighlighted(),
                [styles.tonic]: isTonic(),
            }}
            onClick={() => props.setTonic(props.baseNote + "#")}
        ></button>
    );
}
