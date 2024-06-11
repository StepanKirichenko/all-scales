import { MODES, SCALES, Scale, getAllModusByScale } from "@lib/scales";
import { Die } from "@ui/icons/Die";
import { Star } from "@ui/icons/Star";
import { StarFilled } from "@ui/icons/StarFilled";
import { For } from "solid-js";

import "./ScaleSelect.css";

interface StepCountSelectProps {
    stepCount: number;
    setStepCount: (value: number) => void;
}

export function StepCountSelect(props: StepCountSelectProps) {
    const optionsSet = new Set<number>();
    for (const key of Object.keys(SCALES)) {
        optionsSet.add(key.length);
    }
    const options = Array.from(optionsSet.values()).sort((a, b) => a - b);

    return (
        <div class="modus-select modus-select--horizontal">
            <For each={options}>
                {(count) => (
                    <div
                        classList={{
                            "modus-select__modus": true,
                            "modus-select__modus--current": props.stepCount === count,
                        }}
                    >
                        <button
                            class="modus-select__button"
                            onClick={() => {
                                props.setStepCount(count);
                            }}
                        >
                            {count}
                        </button>
                    </div>
                )}
            </For>
        </div>
    );
}

interface ScaleSelectProps {
    stepCount: number;
    scale: Scale;
    setScale: (scale: Scale) => void;
    setModus: (modus: string) => void;
}

export function ScaleSelect(props: ScaleSelectProps) {
    const options = () => Object.keys(SCALES).filter((scale) => scale.length === props.stepCount);
    return (
        <div class="modus-select">
            <span class="modus-select__title">Scale</span>
            <For each={options()}>
                {(scale) => (
                    <div
                        classList={{
                            "modus-select__modus": true,
                            "modus-select__modus--current": props.scale === scale,
                        }}
                    >
                        <button class="modus-select__button" onClick={() => props.setScale(scale)}>
                            {SCALES[scale] ?? scale}
                        </button>
                    </div>
                )}
            </For>
        </div>
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
            <span class="modus-select__title">Modus</span>
            <For each={getAllModusByScale(props.scale)}>
                {(modus) => (
                    <div
                        classList={{
                            "modus-select__modus": true,
                            "modus-select__modus--current": props.modus === modus,
                        }}
                    >
                        <button class="modus-select__button" onClick={() => props.setModus(modus)}>
                            {MODES[modus] ?? modus}
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
                let moduses = getAllModusByScale(scale);
                let modus = moduses[Math.floor(Math.random() * moduses.length)];

                props.setScale(scale as Scale);
                props.setModus(modus);
            }}
        >
            <Die />
        </button>
    );
}
