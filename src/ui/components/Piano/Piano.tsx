import { For, Show, createContext, useContext, type ParentProps } from "solid-js";
import styles from "./Piano.module.css";

const NOTES = ["c", "d", "e", "f", "g", "a", "b"];
const HAVE_SHARPS = ["c", "d", "f", "g", "a"];

interface PianoContextState {
    highlightedNotes: string[];
    tonic: string;
    setTonic: (value: string) => void;
}

const PianoContext = createContext<PianoContextState>();

interface PianoContextProviderProps extends ParentProps, PianoContextState {}

export function PianoContextProvider(props: PianoContextProviderProps) {
    return <PianoContext.Provider value={props}>{props.children}</PianoContext.Provider>;
}

export function Piano() {
    return (
        <section class={styles.piano}>
            <Octave
                number="1"
            />
            <Octave
                number="2"
            />
        </section>
    );
}

interface OctaveProps {
    number: string;
}

function Octave(props: OctaveProps) {
    return (
        <For each={NOTES}>
            {(note) => (
                <WhiteKey
                    note={note}
                    octave={props.number}
                />
            )}
        </For>
    );
}

interface WhiteKeyProps {
    octave: string;
    note: string;
}

function WhiteKey(props: WhiteKeyProps) {
    const context = useContext(PianoContext) as PianoContextState;
    const hasSharp = () => HAVE_SHARPS.includes(props.note);
    const isHighlighted = () =>
        context.highlightedNotes.includes(props.note) ||
        context.highlightedNotes.includes(props.note + props.octave);
    const isTonic = () => props.note === context.tonic;
    return (
        <div class={styles.keyPair}>
            <button
                classList={{
                    [styles.whiteKey]: true,
                    [styles.highlighted]: isHighlighted(),
                    [styles.tonic]: isTonic(),
                }}
                onClick={() => context.setTonic(props.note)}
            ></button>
            <Show when={hasSharp()}>
                <BlackKey
                    baseNote={props.note}
                    octave={props.octave}
                />
            </Show>
        </div>
    );
}

interface BlackKeyProps {
    baseNote: string;
    octave: string;
}

function BlackKey(props: BlackKeyProps) {
    const context = useContext(PianoContext) as PianoContextState;
    const note = () => props.baseNote + "#";
    const isHighlighted = () =>
        context.highlightedNotes.includes(note()) ||
        context.highlightedNotes.includes(note() + props.octave);
    const isTonic = () => note() === context.tonic;
    return (
        <button
            classList={{
                [styles.blackKey]: true,
                [styles.highlighted]: isHighlighted(),
                [styles.tonic]: isTonic(),
            }}
            onClick={() => context.setTonic(props.baseNote + "#")}
        ></button>
    );
}
