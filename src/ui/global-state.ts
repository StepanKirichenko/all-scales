import { Scale } from "@lib/scales";
import { createSignal } from "solid-js";

export const [scale, setScale] = createSignal<Scale>("diatonic");
export const [tonic, setTonic] = createSignal(0);