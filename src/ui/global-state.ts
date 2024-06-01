import { Scale } from "@lib/constants";
import { createSignal } from "solid-js";

export const [scale, setScale] = createSignal<Scale>("ionian");
export const [tonic, setTonic] = createSignal(0);