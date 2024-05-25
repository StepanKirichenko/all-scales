import { Show, createContext, useContext, type ParentProps } from "solid-js";
import { OCTAVE_LENGTH } from "@lib/constants";
import styles from "./Piano.module.css";

interface PianoState {
    chordNotes: Set<number>;
    scaleNotes: Set<number>;
    tonic: number;
    onClick: (noteIndex: number) => void;
}

const PianoContext = createContext<PianoState>();

interface PianoContextProviderProps extends ParentProps, PianoState {}

function PianoContextProvider(props: PianoContextProviderProps) {
    return <PianoContext.Provider value={props}>{props.children}</PianoContext.Provider>;
}

function PianoDisplay() {
    return (
        <section class={styles.piano}>
            <Octave number={0} />
            <Octave number={1} />
        </section>
    );
}

interface PianoProps extends PianoState {}

export function Piano(props: PianoProps) {
    return (
        <PianoContextProvider {...props}>
            <PianoDisplay />
        </PianoContextProvider>
    )
}

interface OctaveProps {
    number: number;
}

function Octave(props: OctaveProps) {
    const startIndex = () => props.number * OCTAVE_LENGTH;
    return (
        <>
            <WhiteKey noteIndex={startIndex() + 0} sharpNoteIndex={startIndex() + 1} />
            <WhiteKey noteIndex={startIndex() + 2} sharpNoteIndex={startIndex() + 3} />
            <WhiteKey noteIndex={startIndex() + 4} />
            <WhiteKey noteIndex={startIndex() + 5} sharpNoteIndex={startIndex() + 6} />
            <WhiteKey noteIndex={startIndex() + 7} sharpNoteIndex={startIndex() + 8} />
            <WhiteKey noteIndex={startIndex() + 9} sharpNoteIndex={startIndex() + 10} />
            <WhiteKey noteIndex={startIndex() + 11} />
        </>
    )
}

interface WhiteKeyProps {
    noteIndex: number;
    sharpNoteIndex?: number;
}

function WhiteKey(props: WhiteKeyProps) {
    const context = useContext(PianoContext) as PianoState;
    const hasSharp = () => props.sharpNoteIndex !== undefined;
    const isInChord = () => context.chordNotes.has(props.noteIndex);
    const isInScale = () => context.scaleNotes.has(props.noteIndex);
    const isTonic = () => props.noteIndex % OCTAVE_LENGTH === context.tonic;
    return (
        <div class={styles.keyPair}>
            <button
                classList={{
                    [styles.whiteKey]: true,
                    [styles.inChord]: isInChord(),
                    [styles.inScale]: isInScale(),
                    [styles.tonic]: isTonic(),
                }}
                onClick={() => context.onClick(props.noteIndex)}
            ></button>
            <Show when={hasSharp()}>
                <BlackKey noteIndex={props.sharpNoteIndex ?? 0} />
            </Show>
        </div>
    );
}

interface BlackKeyProps {
    noteIndex: number;
}

function BlackKey(props: BlackKeyProps) {
    const context = useContext(PianoContext) as PianoState;
    const isInChord = () => context.chordNotes.has(props.noteIndex);
    const isInScale = () => context.scaleNotes.has(props.noteIndex);
    const isTonic = () => props.noteIndex % OCTAVE_LENGTH === context.tonic;
    return (
        <button
            classList={{
                [styles.blackKey]: true,
                [styles.inChord]: isInChord(),
                [styles.inScale]: isInScale(),
                [styles.tonic]: isTonic(),
            }}
            onClick={() => context.onClick(props.noteIndex)}
        ></button>
    );
}
