import { MODES, SCALES, Scale } from "@lib/scales";
import { For } from "solid-js";

interface FavoriteSelectProps {
    favoriteList: string[];
    setScale: (scale: Scale) => void;
    setModus: (modus: string) => void;
    setStepCount: (count: number) => void;
}

export function FavoriteSelect(props: FavoriteSelectProps) {
    let selectRef: HTMLSelectElement | undefined = undefined;

    return (
        <select
            ref={selectRef}
            value={"Favorite"}
            onInput={() => {
                if (selectRef) {
                    (selectRef as HTMLSelectElement).selectedIndex = 0;
                }
            }}
            disabled={props.favoriteList.length === 0}
        >
            <option value="Favorite" style={{ display: "none" }}>
                Favorite
            </option>
            <For each={props.favoriteList}>
                {(fav) => {
                    const [scale, modus] = fav.split(";");
                    return (
                        <option
                            value="Favorite"
                            onClick={() => {
                                props.setScale(scale as Scale);
                                props.setStepCount(scale.length)
                                props.setModus(modus);
                            }}
                        >
                            {SCALES[scale] + " " + MODES[modus]}
                        </option>
                    );
                }}
            </For>
        </select>
    );
}
