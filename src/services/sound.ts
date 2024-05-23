const oscList: OscillatorNode[] = [];
const audioContext = new AudioContext();

let mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = 100;

const baseNoteFreq = 261.63;
const exp = Math.pow(2, 1 / 12); // Math.exp(noteFreq[i]);
let currentNoteFreq = baseNoteFreq;

for (let i = 0; i < 36; i++) {
    const osc = audioContext.createOscillator();
    osc.type = "square";
    osc.frequency.value = currentNoteFreq;
    oscList.push(osc);
    osc.start();
    currentNoteFreq *= exp;
}

export function playNote(noteIndex: number) {
    oscList[noteIndex].connect(mainGainNode);
}

export function stopNote(noteIndex: number) {
    oscList[noteIndex].disconnect(mainGainNode);
}

let isContextResumed = false;

export function activate() {
    if (!isContextResumed) {
        audioContext.resume().then(() => {
            console.log("Playback resumed successfully");
            isContextResumed = true;
        });
    }
}
