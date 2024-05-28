import { Scale } from "@lib/constants";
import { getNoteInScale } from "@lib/music";
import { ReactiveSet } from "@solid-primitives/set";
import { createEffect, on, onCleanup } from "solid-js";

const KEYCODES: Record<string, number> = {
    Digit1: 0,
    Digit2: 1,
    Digit3: 2,
    Digit4: 3,
    Digit5: 4,
    Digit6: 5,
    Digit7: 6,
    Digit8: 7,
    Digit9: 8,
    Digit0: 9,
    Minus: 10,
    Equal: 11,
    Backspace: 12,
};

function keyCodeToStepIndex(keyCode: string): number {
    return KEYCODES[keyCode];
}

function keyCodeToNoteIndex(scaleName: Scale, tonic: number, keyCode: string): number {
    const noteInScaleIndex = keyCodeToStepIndex(keyCode);
    const noteIndex = getNoteInScale(scaleName, tonic, noteInScaleIndex);

    return noteIndex;
}

type ScaleGetter = () => Scale;
type TonicGetter = () => number;

export function useKeyboardInput(scale: ScaleGetter, tonic: TonicGetter) {
    const pressedKeys = new ReactiveSet<number>();

    const keydown = (e: KeyboardEvent) => {
        if (!e.repeat && KEYCODES[e.code] !== undefined) {
            const note = keyCodeToNoteIndex(scale(), tonic(), e.code);
            pressedKeys.add(note);
        }
    };

    const keyup = (e: KeyboardEvent) => {
        if (KEYCODES[e.code] !== undefined) {
            const note = keyCodeToNoteIndex(scale(), tonic(), e.code);
            pressedKeys.delete(note);
        }
    };

    createEffect(
        on([scale, tonic], () => {
            pressedKeys.clear();
        }),
    );

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    onCleanup(() => {
        document.removeEventListener("keydown", keydown);
        document.removeEventListener("keyup", keyup);
    });

    return pressedKeys;
}