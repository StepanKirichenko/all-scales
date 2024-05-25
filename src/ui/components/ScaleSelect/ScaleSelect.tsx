import { SCALES, Scale } from "@lib/constants";
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
            <For each={Object.entries(SCALES)}>
                {([key, scale]) => (
                    <option value={key}>{scale.name}</option>
                )}
            </For>
        </select>
    );
}
