import { SCALES, Scale, getAllModusByScale } from "@lib/scales";
import { For } from "solid-js";

interface ScaleSelectProps {
    scale: Scale;
    setScale: (scale: Scale) => void;
}

export function ScaleSelect(props: ScaleSelectProps) {
    return (
        <select
            onInput={(event) => {
                props.setScale(event.target.value as Scale);
            }}
            value={props.scale}
        >
            <For each={Object.keys(SCALES)}>
                {(scale) => (
                    <option value={scale}>{scale}</option>
                )}
            </For>
        </select>
    );
}

interface ModusSelectProps {
    scale: Scale;
    modus: string;
    setModus: (modus: string) => void;
}

export function ModusSelect(props: ModusSelectProps) {
    return (
        <select
            onInput={(event) => {
                props.setModus(event.target.value as string);
            }}
            value={props.modus}
        >
            <For each={getAllModusByScale(props.scale)}>
                {(modus) => (
                    <option value={modus}>{modus}</option>
                )}
            </For>
        </select>
    );
}

export function RandomizeButton(props: ModusSelectProps & ScaleSelectProps) {
    return (
        <button
            onClick={() => {
                let scales = Object.keys(SCALES);
                let scale = scales[Math.floor(Math.random() * scales.length)];
                let moduses = Object.keys(SCALES[scale as Scale]);
                let modus = moduses[Math.floor(Math.random() * moduses.length)];

                props.setScale(scale as Scale);
                props.setModus(modus);
            }}
        >
            Randomize
        </button>
    );
}