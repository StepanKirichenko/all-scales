import { getRange } from "./utils";

export function getScalesByStepCount(stepCount: number): string[] {
    return Object.keys(SCALES).filter((scale) => scale.length === stepCount);
}

export const DEFAULT_SCALES: Record<number, string> = {
    5: "22323",
    6: "222222",
    7: "2122122",
    8: "12121212"
};

export const SCALES: Record<string, string> = {};

export const MODES: Record<string, string> = {};

const ALL_SCALES = [
    {
        name: "diatonic",
        modes: [
            {
                name: "Eolian",
                intervals: "2122122",
            },
            {
                name: "Locrian",
                intervals: "1221222",
            },
            {
                name: "Ionian",
                intervals: "2212221",
            },
            {
                name: "Dorian",
                intervals: "2122212",
            },
            {
                name: "Phrygian",
                intervals: "1222122",
            },
            {
                name: "Lydian",
                intervals: "2221221",
            },
            {
                name: "Mixolydian",
                intervals: "2212212",
            },
        ],
    },
    {
        name: "pentatonic",
        modes: [
            {
                name: "Major",
                intervals: "22323",
            },
            {
                name: "Egyptian",
                intervals: "23232",
            },
            {
                name: "Blues minor pentatonic",
                intervals: "32322",
            },
            {
                name: "Blues major pentatonic",
                intervals: "23223",
            },
            {
                name: "Minor",
                intervals: "32232",
            },
        ],
    },
    {
        name: "blues",
        modes: [
            {
                name: "Minor",
                intervals: "321132",
            },
            {
                name: "Major",
                intervals: "211323",
            },
            {
                name: "Egyptian?",
                intervals: "113232",
            },
            {
                name: "The blues note",
                intervals: "132321",
            },
            {
                name: "Some minor",
                intervals: "323211",
            },
            {
                name: "Some major",
                intervals: "232113",
            },
        ],
    },
    {
        name: "jazz",
        modes: [
            {
                name: "Ascending melodic minor",
                intervals: "2122221",
            },
            {
                name: "Dorian b2",
                intervals: "1222212",
            },
            {
                name: "Lydian augmented",
                intervals: "2222121",
            },
            {
                name: "Lydian dominant",
                intervals: "2221212",
            },
            {
                name: "Aeolian dominant (Melodic major)",
                intervals: "2212122",
            },
            {
                name: "Half-diminished",
                intervals: "2121222",
            },
            {
                name: "Super Locrian",
                intervals: "1212222",
            },
        ],
    },
    {
        name: "octatonic",
        modes: [
            {
                name: "Half-step / Whole step",
                intervals: "12121212",
            },
            {
                name: "Whole step / Half-step",
                intervals: "21212121",
            },
        ],
    },
    {
        name: "wholetone",
        modes: [
            {
                name: "Whole-tone",
                intervals: "222222",
            },
        ],
    },
    {
        name: "Japanese pentatonic",
        modes: [
            {
                name: "Hirajoshi",
                intervals: "42141",
            },
            {
                name: "Box 2",
                intervals: "21414",
            },
            {
                name: "Iwato",
                intervals: "14142",
            },
            {
                name: "Box 4",
                intervals: "41421",
            },
            {
                name: "Miyako-bushi (In scale)",
                intervals: "14214",
            },
        ],
    },
    {
        name: "Insen pentatonic",
        modes: [
            {
                name: "Box 0",
                intervals: "14232",
            },
            {
                name: "Box 1",
                intervals: "42321",
            },
            {
                name: "Box 2",
                intervals: "23214",
            },
            {
                name: "Box 3",
                intervals: "32142",
            },
            {
                name: "Box 4",
                intervals: "21423",
            },
        ],
    },
    {
        name: "harmonic minor",
        modes: [
            {
                name: "1212213",
                intervals: "1212213",
            },
            {
                name: "Minor",
                intervals: "2122131",
            },
            {
                name: "1221312",
                intervals: "1221312",
            },
            {
                name: "2213121",
                intervals: "2213121",
            },
            {
                name: "Ukranian",
                intervals: "2131212",
            },
            {
                name: "Spanish (Phrygian major)",
                intervals: "1312122",
            },
            {
                name: "3121221",
                intervals: "3121221",
            },
        ],
    },
    {
        name: "harmonic major",
        modes: [
            {
                name: "1213122",
                intervals: "1213122",
            },
            {
                name: "2131221",
                intervals: "2131221",
            },
            {
                name: "1312212",
                intervals: "1312212",
            },
            {
                name: "3122121",
                intervals: "3122121",
            },
            {
                name: "1221213",
                intervals: "1221213",
            },
            {
                name: "Major",
                intervals: "2212131",
            },
            {
                name: "2121312",
                intervals: "2121312",
            },
        ],
    },
    {
        name: "Double harmonic",
        modes: [
            {
                name: "Locrian bb3 bb7",
                intervals: "1131213",
            },
            {
                name: "Major (Flamenko)",
                intervals: "1312131",
            },
            {
                name: "Lydian ♯2 ♯6",
                intervals: "3121311",
            },
            {
                name: "Ultraphrygian",
                intervals: "1213113",
            },
            {
                name: "Hungarian Gipsy minor",
                intervals: "2131131",
            },
            {
                name: "Oriental",
                intervals: "1311312",
            },
            {
                name: "Ionian ♯2 ♯5",
                intervals: "3113121",
            },
        ],
    },
    {
        name: "augmented",
        modes: [
            {
                name: "Small",
                intervals: "131313",
            },
            {
                name: "Big",
                intervals: "313131",
            },
        ],
    },
    {
        name: "tritone",
        modes: [
            {
                name: "Third",
                intervals: "321321",
            },
            {
                name: "Tone",
                intervals: "213213",
            },
            {
                name: "Semitone",
                intervals: "132132",
            },
        ],
    },
    {
        name: "scale_112323",
        modes: [
            {
                name: "112323",
                intervals: "112323",
            },
            {
                name: "123231",
                intervals: "123231",
            },
            {
                name: "232311",
                intervals: "232311",
            },
            {
                name: "323112",
                intervals: "323112",
            },
            {
                name: "231123",
                intervals: "231123",
            },
            {
                name: "311232",
                intervals: "311232",
            },
        ],
    },
    {
        name: "scale_113223",
        modes: [
            {
                name: "113223",
                intervals: "113223",
            },
            {
                name: "132231",
                intervals: "132231",
            },
            {
                name: "322311",
                intervals: "322311",
            },
            {
                name: "223113",
                intervals: "223113",
            },
            {
                name: "231132",
                intervals: "231132",
            },
            {
                name: "311322",
                intervals: "311322",
            },
        ],
    },
    {
        name: "scale_121323",
        modes: [
            {
                name: "121323",
                intervals: "121323",
            },
            {
                name: "213231",
                intervals: "213231",
            },
            {
                name: "132312",
                intervals: "132312",
            },
            {
                name: "323121",
                intervals: "323121",
            },
            {
                name: "231213",
                intervals: "231213",
            },
            {
                name: "312132",
                intervals: "312132",
            },
        ],
    },
    {
        name: "scale_122223",
        modes: [
            {
                name: "122223",
                intervals: "122223",
            },
            {
                name: "222231",
                intervals: "222231",
            },
            {
                name: "Prometheus (mystic)",
                intervals: "222312",
            },
            {
                name: "223122",
                intervals: "223122",
            },
            {
                name: "231222",
                intervals: "231222",
            },
            {
                name: "312222",
                intervals: "312222",
            },
        ],
    },
    {
        name: "scale_122232",
        modes: [
            {
                name: "122232",
                intervals: "122232",
            },
            {
                name: "222321",
                intervals: "222321",
            },
            {
                name: "223212",
                intervals: "223212",
            },
            {
                name: "232122",
                intervals: "232122",
            },
            {
                name: "321222",
                intervals: "321222",
            },
            {
                name: "212223",
                intervals: "212223",
            },
        ],
    },
    {
        name: "scale_122313",
        modes: [
            {
                name: "122313",
                intervals: "122313",
            },
            {
                name: "223131",
                intervals: "223131",
            },
            {
                name: "231312",
                intervals: "231312",
            },
            {
                name: "313122",
                intervals: "313122",
            },
            {
                name: "131223",
                intervals: "131223",
            },
            {
                name: "312231",
                intervals: "312231",
            },
        ],
    },
    {
        name: "scale_122322",
        modes: [
            {
                name: "122322",
                intervals: "122322",
            },
            {
                name: "223221",
                intervals: "223221",
            },
            {
                name: "232212",
                intervals: "232212",
            },
            {
                name: "322122",
                intervals: "322122",
            },
            {
                name: "221223",
                intervals: "221223",
            },
            {
                name: "212232",
                intervals: "212232",
            },
        ],
    },
    {
        name: "scale_123123",
        modes: [
            {
                name: "123123",
                intervals: "123123",
            },
            {
                name: "231231",
                intervals: "231231",
            },
            {
                name: "312312",
                intervals: "312312",
            },
        ],
    },
    {
        name: "scale_123132",
        modes: [
            {
                name: "123132",
                intervals: "123132",
            },
            {
                name: "231321",
                intervals: "231321",
            },
            {
                name: "313212",
                intervals: "313212",
            },
            {
                name: "132123",
                intervals: "132123",
            },
            {
                name: "321231",
                intervals: "321231",
            },
            {
                name: "212313",
                intervals: "212313",
            },
        ],
    },
    {
        name: "scale_123213",
        modes: [
            {
                name: "123213",
                intervals: "123213",
            },
            {
                name: "232131",
                intervals: "232131",
            },
            {
                name: "321312",
                intervals: "321312",
            },
            {
                name: "213123",
                intervals: "213123",
            },
            {
                name: "131232",
                intervals: "131232",
            },
            {
                name: "312321",
                intervals: "312321",
            },
        ],
    },
    {
        name: "scale_123222",
        modes: [
            {
                name: "123222",
                intervals: "123222",
            },
            {
                name: "232221",
                intervals: "232221",
            },
            {
                name: "322212",
                intervals: "322212",
            },
            {
                name: "222123",
                intervals: "222123",
            },
            {
                name: "221232",
                intervals: "221232",
            },
            {
                name: "212322",
                intervals: "212322",
            },
        ],
    },
    {
        name: "scale_131322",
        modes: [
            {
                name: "131322",
                intervals: "131322",
            },
            {
                name: "313221",
                intervals: "313221",
            },
            {
                name: "132213",
                intervals: "132213",
            },
            {
                name: "322131",
                intervals: "322131",
            },
            {
                name: "221313",
                intervals: "221313",
            },
            {
                name: "213132",
                intervals: "213132",
            },
        ],
    },
    {
        name: "scale_132222",
        modes: [
            {
                name: "132222",
                intervals: "132222",
            },
            {
                name: "322221",
                intervals: "322221",
            },
            {
                name: "222213",
                intervals: "222213",
            },
            {
                name: "222132",
                intervals: "222132",
            },
            {
                name: "221322",
                intervals: "221322",
            },
            {
                name: "213222",
                intervals: "213222",
            },
        ],
    },
    {
        name: "scale_1121223",
        modes: [
            {
                name: "1121223",
                intervals: "1121223",
            },
            {
                name: "1212231",
                intervals: "1212231",
            },
            {
                name: "2122311",
                intervals: "2122311",
            },
            {
                name: "1223112",
                intervals: "1223112",
            },
            {
                name: "2231121",
                intervals: "2231121",
            },
            {
                name: "2311212",
                intervals: "2311212",
            },
            {
                name: "3112122",
                intervals: "3112122",
            },
        ],
    },
    {
        name: "scale_1121232",
        modes: [
            {
                name: "1121232",
                intervals: "1121232",
            },
            {
                name: "1212321",
                intervals: "1212321",
            },
            {
                name: "2123211",
                intervals: "2123211",
            },
            {
                name: "1232112",
                intervals: "1232112",
            },
            {
                name: "2321121",
                intervals: "2321121",
            },
            {
                name: "3211212",
                intervals: "3211212",
            },
            {
                name: "2112123",
                intervals: "2112123",
            },
        ],
    },
    {
        name: "scale_1121313",
        modes: [
            {
                name: "1121313",
                intervals: "1121313",
            },
            {
                name: "1213131",
                intervals: "1213131",
            },
            {
                name: "2131311",
                intervals: "2131311",
            },
            {
                name: "1313112",
                intervals: "1313112",
            },
            {
                name: "3131121",
                intervals: "3131121",
            },
            {
                name: "1311213",
                intervals: "1311213",
            },
            {
                name: "3112131",
                intervals: "3112131",
            },
        ],
    },
    {
        name: "scale_1121322",
        modes: [
            {
                name: "1121322",
                intervals: "1121322",
            },
            {
                name: "1213221",
                intervals: "1213221",
            },
            {
                name: "2132211",
                intervals: "2132211",
            },
            {
                name: "1322112",
                intervals: "1322112",
            },
            {
                name: "3221121",
                intervals: "3221121",
            },
            {
                name: "2211213",
                intervals: "2211213",
            },
            {
                name: "2112132",
                intervals: "2112132",
            },
        ],
    },
    {
        name: "scale_1122123",
        modes: [
            {
                name: "1122123",
                intervals: "1122123",
            },
            {
                name: "1221231",
                intervals: "1221231",
            },
            {
                name: "2212311",
                intervals: "2212311",
            },
            {
                name: "2123112",
                intervals: "2123112",
            },
            {
                name: "1231122",
                intervals: "1231122",
            },
            {
                name: "2311221",
                intervals: "2311221",
            },
            {
                name: "3112212",
                intervals: "3112212",
            },
        ],
    },
    {
        name: "scale_1122132",
        modes: [
            {
                name: "1122132",
                intervals: "1122132",
            },
            {
                name: "1221321",
                intervals: "1221321",
            },
            {
                name: "2213211",
                intervals: "2213211",
            },
            {
                name: "2132112",
                intervals: "2132112",
            },
            {
                name: "1321122",
                intervals: "1321122",
            },
            {
                name: "3211221",
                intervals: "3211221",
            },
            {
                name: "2112213",
                intervals: "2112213",
            },
        ],
    },
    {
        name: "scale_1122213",
        modes: [
            {
                name: "1122213",
                intervals: "1122213",
            },
            {
                name: "1222131",
                intervals: "1222131",
            },
            {
                name: "2221311",
                intervals: "2221311",
            },
            {
                name: "2213112",
                intervals: "2213112",
            },
            {
                name: "Gipsy",
                intervals: "2131122",
            },
            {
                name: "1311222",
                intervals: "1311222",
            },
            {
                name: "3112221",
                intervals: "3112221",
            },
        ],
    },
    {
        name: "scale_1122312",
        modes: [
            {
                name: "1122312",
                intervals: "1122312",
            },
            {
                name: "1223121",
                intervals: "1223121",
            },
            {
                name: "2231211",
                intervals: "2231211",
            },
            {
                name: "2312112",
                intervals: "2312112",
            },
            {
                name: "3121122",
                intervals: "3121122",
            },
            {
                name: "1211223",
                intervals: "1211223",
            },
            {
                name: "2112231",
                intervals: "2112231",
            },
        ],
    },
    {
        name: "scale_1123122",
        modes: [
            {
                name: "1123122",
                intervals: "1123122",
            },
            {
                name: "1231221",
                intervals: "1231221",
            },
            {
                name: "2312211",
                intervals: "2312211",
            },
            {
                name: "3122112",
                intervals: "3122112",
            },
            {
                name: "1221123",
                intervals: "1221123",
            },
            {
                name: "2211231",
                intervals: "2211231",
            },
            {
                name: "2112312",
                intervals: "2112312",
            },
        ],
    },
    {
        name: "scale_1123212",
        modes: [
            {
                name: "1123212",
                intervals: "1123212",
            },
            {
                name: "1232121",
                intervals: "1232121",
            },
            {
                name: "2321211",
                intervals: "2321211",
            },
            {
                name: "3212112",
                intervals: "3212112",
            },
            {
                name: "2121123",
                intervals: "2121123",
            },
            {
                name: "1211232",
                intervals: "1211232",
            },
            {
                name: "2112321",
                intervals: "2112321",
            },
        ],
    },
    {
        name: "scale_1131222",
        modes: [
            {
                name: "1131222",
                intervals: "1131222",
            },
            {
                name: "1312221",
                intervals: "1312221",
            },
            {
                name: "3122211",
                intervals: "3122211",
            },
            {
                name: "1222113",
                intervals: "1222113",
            },
            {
                name: "2221131",
                intervals: "2221131",
            },
            {
                name: "2211312",
                intervals: "2211312",
            },
            {
                name: "2113122",
                intervals: "2113122",
            },
        ],
    },
    {
        name: "scale_1131312",
        modes: [
            {
                name: "1131312",
                intervals: "1131312",
            },
            {
                name: "1313121",
                intervals: "1313121",
            },
            {
                name: "3131211",
                intervals: "3131211",
            },
            {
                name: "1312113",
                intervals: "1312113",
            },
            {
                name: "3121131",
                intervals: "3121131",
            },
            {
                name: "1211313",
                intervals: "1211313",
            },
            {
                name: "2113131",
                intervals: "2113131",
            },
        ],
    },
    {
        name: "scale_1132122",
        modes: [
            {
                name: "1132122",
                intervals: "1132122",
            },
            {
                name: "1321221",
                intervals: "1321221",
            },
            {
                name: "3212211",
                intervals: "3212211",
            },
            {
                name: "2122113",
                intervals: "2122113",
            },
            {
                name: "1221132",
                intervals: "1221132",
            },
            {
                name: "2211321",
                intervals: "2211321",
            },
            {
                name: "2113212",
                intervals: "2113212",
            },
        ],
    },
    {
        name: "scale_1132212",
        modes: [
            {
                name: "1132212",
                intervals: "1132212",
            },
            {
                name: "1322121",
                intervals: "1322121",
            },
            {
                name: "3221211",
                intervals: "3221211",
            },
            {
                name: "2212113",
                intervals: "2212113",
            },
            {
                name: "2121132",
                intervals: "2121132",
            },
            {
                name: "1211322",
                intervals: "1211322",
            },
            {
                name: "2113221",
                intervals: "2113221",
            },
        ],
    },
    {
        name: "scale_1212123",
        modes: [
            {
                name: "1212123",
                intervals: "1212123",
            },
            {
                name: "2121231",
                intervals: "2121231",
            },
            {
                name: "1212312",
                intervals: "1212312",
            },
            {
                name: "2123121",
                intervals: "2123121",
            },
            {
                name: "1231212",
                intervals: "1231212",
            },
            {
                name: "2312121",
                intervals: "2312121",
            },
            {
                name: "Hungarian",
                intervals: "3121212",
            },
        ],
    },
    {
        name: "scale_1212132",
        modes: [
            {
                name: "1212132",
                intervals: "1212132",
            },
            {
                name: "2121321",
                intervals: "2121321",
            },
            {
                name: "1213212",
                intervals: "1213212",
            },
            {
                name: "2132121",
                intervals: "2132121",
            },
            {
                name: "1321212",
                intervals: "1321212",
            },
            {
                name: "3212121",
                intervals: "3212121",
            },
            {
                name: "2121213",
                intervals: "2121213",
            },
        ],
    },
];

export type Scale = keyof typeof SCALES;
export type Modes = (typeof SCALES)[Scale];
export type Modus = { name: string; intervals: string };

// export function getModusByName(scale: Scale, modeName: string): Modus {
//     let modes = SCALES[scale as Scale] as Modes;

//     if (Object.keys(modes).includes(modeName)) {
//         return Object.values(modes)[Object.keys(modes).indexOf(modeName)];
//     }

//     return Object.values(modes)[0];
// }

// export function getModusSteps(scale: Scale, modeName: string): number[] {
//     let intervals = getIntervalsByModus(scale, modeName);
//     return intervals.split("").map((s) => Number(s));
// }

export function getAllModusByScale(scale: Scale): string[] {
    const modes = new Set<string>();

    for (let i of getRange(0, scale.length)) {
        modes.add(scale.slice(i) + scale.slice(0, i));
    }

    return Array.from(modes.values());
}

(function setup() {
    for (let scale of ALL_SCALES) {
        SCALES[scale.modes[0].intervals] = scale.name;

        for (let mode of scale.modes) {
            MODES[mode.intervals] = mode.name;
        }
    }
})();
