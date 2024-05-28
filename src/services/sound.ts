import { ReactiveSet } from "@solid-primitives/set";
import { createEffect } from "solid-js";

export function usePlayKeyboardSound(pressedKeys: ReactiveSet<number>) {
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
        activate();
        gainList[noteIndex].gain.setTargetAtTime(0.5, 0, 0.05);
    }

    function stopNote(noteIndex: number) {
        gainList[noteIndex].gain.setTargetAtTime(0, 0, 0.05);
    }

    createEffect(() => {
        for (let i = 0; i < gainList.length; i += 1) {
            if (pressedKeys.has(i)) {
                playNote(i);
            } else {
                stopNote(i);
            }
        }
    })

    let isContextResumed = false;

    function activate() {
        if (!isContextResumed) {
            audioContext.resume().then(() => {
                console.log("Playback resumed successfully");
                isContextResumed = true;
            });
        }
    }

    return {playNote, stopNote};
}
