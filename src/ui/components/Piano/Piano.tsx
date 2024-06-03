import { Show, createContext, useContext, type ParentProps } from "solid-js";
import { OCTAVE_LENGTH } from "@lib/constants";
import styles from "./Piano.module.css";
import { ReactiveSet } from "@solid-primitives/set";
import { tonic } from "@ui/global-state";

interface PianoState {
    chordNotes: Set<number>;
    scaleNotes: Map<number, number>;
    keysPressed: ReactiveSet<number>;
    onClick: (noteIndex: number) => void;
    onPointerDown: (noteIndex: number) => void;
    onPointerUp: (noteIndex: number) => void;
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
    );
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
    );
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
    const stepIndex = () => context.scaleNotes.get(props.noteIndex);
    const isTonic = () => props.noteIndex % OCTAVE_LENGTH === tonic();
    const isPressed = () => context.keysPressed.has(props.noteIndex);
    return (
        <div class={styles.keyPair}>
            <button
                classList={{
                    [styles.whiteKey]: true,
                    [styles.inChord]: isInChord(),
                    [styles.inScale]: isInScale(),
                    [styles.tonic]: isTonic(),
                    [styles.pressed]: isPressed(),
                }}
                onClick={() => context.onClick(props.noteIndex)}
                onPointerDown={() => context.onPointerDown(props.noteIndex)}
                onPointerUp={() => context.onPointerUp(props.noteIndex)}
            ></button>
            <span class={styles.stepIndex}>
                {stepIndex() !== undefined ? stepIndex()! + 1 : null}
            </span>
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
    const stepIndex = () => context.scaleNotes.get(props.noteIndex);
    const isTonic = () => props.noteIndex % OCTAVE_LENGTH === tonic();
    const isPressed = () => context.keysPressed.has(props.noteIndex);
    return (
        <button
            classList={{
                [styles.blackKey]: true,
                [styles.inChord]: isInChord(),
                [styles.inScale]: isInScale(),
                [styles.tonic]: isTonic(),
                [styles.pressed]: isPressed(),
            }}
            onClick={() => context.onClick(props.noteIndex)}
            onPointerDown={() => context.onPointerDown(props.noteIndex)}
            onPointerUp={() => context.onPointerUp(props.noteIndex)}
        >
            <span class={styles.stepIndex}>
                {stepIndex() !== undefined ? stepIndex()! + 1 : null}
            </span>
        </button>
    );
}
