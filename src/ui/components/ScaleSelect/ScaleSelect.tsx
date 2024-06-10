import { SCALES, Scale, getAllModusByScale, getModusByName } from "@lib/scales";
import { Die } from "@ui/icons/Die";
import { Star } from "@ui/icons/Star";
import { StarFilled } from "@ui/icons/StarFilled";
import { For } from "solid-js";

interface ScaleSelectProps {
    scale: Scale;
    setScale: (scale: Scale) => void;
    setModus: (modus: string) => void;
}

export function ScaleSelect(props: ScaleSelectProps) {
    return (
        <select
            onInput={(event) => {
                props.setScale(event.target.value as Scale);
                props.setModus(getAllModusByScale(event.target.value as Scale)[0]);
            }}
            value={props.scale}
        >
            <For each={Object.keys(SCALES)}>
                {(scale) => (
                    <option value={scale}>{scale[0].toUpperCase() + scale.slice(1)}</option>
                )}
            </For>
        </select>
    );
}

interface ModusSelectProps {
    scale: Scale;
    modus: string;
    setModus: (modus: string) => void;
    isModusFavorite: (modus: string) => boolean;
    toggleModusFavorite: (modus: string) => void;
}

export function ModusSelect(props: ModusSelectProps) {
    return (
        <div class="modus-select">
            <For each={getAllModusByScale(props.scale)}>
                {(modus) => (
                    <div
                        classList={{
                            "modus-select__modus": true,
                            "modus-select__modus--current": props.modus === modus,
                        }}
                    >
                        <button class="modus-select__button" onClick={() => props.setModus(modus)}>
                            {getModusByName(props.scale, modus).name}
                        </button>
                        <button
                            classList={{
                                "modus-select__favorite": true,
                                "modus-select__favorite--active": props.isModusFavorite(modus),
                            }}
                            onClick={() => props.toggleModusFavorite(modus)}
                        >
                            {props.isModusFavorite(modus) ? <StarFilled /> : <Star />}
                        </button>
                    </div>
                )}
            </For>
        </div>
    );
}

interface RandomizeButtonProps {
    setScale: (scale: Scale) => void;
    setModus: (modus: string) => void;
}

export function RandomizeButton(props: RandomizeButtonProps) {
    return (
        <button
            class="icon-button"
            onClick={() => {
                let scales = Object.keys(SCALES);
                let scale = scales[Math.floor(Math.random() * scales.length)];
                let moduses = Object.keys(SCALES[scale as Scale]);
                let modus = moduses[Math.floor(Math.random() * moduses.length)];

                props.setScale(scale as Scale);
                props.setModus(modus);
            }}
        >
            <Die />
        </button>
    );
}
