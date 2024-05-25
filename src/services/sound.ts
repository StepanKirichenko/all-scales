import { Scale } from "@lib/constants";
import { getNoteInScale } from "@lib/music";
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

export function usePlayKeyboardSound(scale: ScaleGetter, tonic: TonicGetter) {
    const oscList: OscillatorNode[] = [];
    const gainList: GainNode[] = [];
    const audioContext = new AudioContext();

    let mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);
    mainGainNode.gain.value = 0.2;

    const baseNoteFreq = 261.63;
    const exp = Math.pow(2, 1 / 12); // Math.exp(noteFreq[i]);
    let currentNoteFreq = baseNoteFreq;

    for (let i = 0; i < 36; i++) {
        const osc = audioContext.createOscillator();
        osc.type = "sine";
        osc.frequency.value = currentNoteFreq;
        oscList.push(osc);
        osc.start();
        const gain = audioContext.createGain();
        gain.gain.value = 0;
        gainList.push(gain);

        osc.connect(gain);
        gain.connect(mainGainNode);

        currentNoteFreq *= exp;
    }

    function playNote(noteIndex: number) {
        gainList[noteIndex].gain.setTargetAtTime(0.5, 0, 0.05);
    }

    function stopNote(noteIndex: number) {
        gainList[noteIndex].gain.setTargetAtTime(0, 0, 0.05);
    }

    function stopAllNotes() {
        for (const gain of gainList) {
            gain.gain.setTargetAtTime(0, 0, 0.05);
        }
    }

    let isContextResumed = false;

    function activate() {
        if (!isContextResumed) {
            audioContext.resume().then(() => {
                console.log("Playback resumed successfully");
                isContextResumed = true;
            });
        }
    }

    const keydown = (e: KeyboardEvent) => {
        activate();
        if (!e.repeat && KEYCODES[e.code] !== undefined) {
            const note = keyCodeToNoteIndex(scale(), tonic(), e.code);
            playNote(note);
        }
    };

    const keyup = (e: KeyboardEvent) => {
        if (KEYCODES[e.code] !== undefined) {
            const note = keyCodeToNoteIndex(scale(), tonic(), e.code);
            stopNote(note);
        }
    };

    createEffect(
        on([scale, tonic], () => {
            stopAllNotes();
        }),
    );

    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    onCleanup(() => {
        document.removeEventListener("keydown", keydown);
        document.removeEventListener("keyup", keyup);
    });
}
