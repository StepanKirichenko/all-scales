import { getRange } from "./utils";

export function getScalesByStepCount(stepCount: number): string[] {
    return Object.keys(SCALES).filter((scale) => scale.length === stepCount);
}

export const SCALES: Record<string, string> = {
    "2122122": "Diatonic",
    "321132": "Blues",
};

export const MODES: Record<string, string> = {
    "112323": "112323",
    "2122122": "Aeolian",
    "1221222": "Locrian",
    "2212221": "Ionian",
    "2122212": "Dorian",
    "1222122": "Phrygian",
    "2221221": "Lydian",
    "2212212": "Mixolydian",
    "321132": "Minor",
    "211323": "Major",
    "113232": "Egyptian?",
    "132321": "The blues note",
    "323211": "Some minor",
    "232113": "Some major",
};

const DIATONIC = {
    aeolian: { name: "Eolian", intervals: "2122122" },
    locrian: { name: "Locrian", intervals: "1221222" },
    ionian: { name: "Ionian", intervals: "2212221" },
    dorian: { name: "Dorian", intervals: "2122212" },
    phrygian: { name: "Phrygian", intervals: "1222122" },
    lydian: { name: "Lydian", intervals: "2221221" },
    mixolydian: { name: "Mixolydian", intervals: "2212212" },
};

const JAZZ = {
    mode_2122221: { name: "Ascending melodic minor", intervals: "2122221" },
    mode_1222212: { name: "Dorian b2", intervals: "1222212" },
    mode_2222121: { name: "Lydian augmented", intervals: "2222121" },
    mode_2221212: { name: "Lydian dominant", intervals: "2221212" },
    mode_2212122: { name: "Aeolian dominant (Melodic major)", intervals: "2212122" },
    mode_2121222: { name: "Half-diminished", intervals: "2121222" },
    mode_1212222: { name: "Super Locrian", intervals: "1212222" },
};

const BLUES = {
    mode_321132: { name: "Minor", intervals: "321132" } as Modus,
    mode_211323: { name: "Major", intervals: "211323" } as Modus,
    mode_113232: { name: "Egyptian?", intervals: "113232" } as Modus,
    mode_132321: { name: "The blues note", intervals: "132321" } as Modus,
    mode_323211: { name: "Some minor", intervals: "323211" } as Modus,
    mode_232113: { name: "Some major", intervals: "232113" } as Modus,
};

const PENTATONIC = {
    mode_22323: { name: "Major", intervals: "22323" } as Modus,
    mode_23232: { name: "Egyptian", intervals: "23232" } as Modus,
    mode_32322: { name: "Blues minor pentatonic", intervals: "32322" } as Modus,
    mode_23223: { name: "Blues major pentatonic", intervals: "23223" } as Modus,
    mode_32232: { name: "Minor", intervals: "32232" } as Modus,
};

const OCTATONIC = {
    mode_12121212: { name: "Half-step / Whole step", intervals: "12121212" },
    mode_21212121: { name: "Whole step / Half-step", intervals: "21212121" },
};

const DOUBLE_HARMONIC = {
    mode_1131213: { name: "Locrian bb3 bb7", intervals: "1131213" } as Modus,
    mode_1312131: { name: "Major (Flamenko)", intervals: "1312131" } as Modus,
    mode_3121311: { name: "Lydian ♯2 ♯6", intervals: "3121311" } as Modus,
    mode_1213113: { name: "Ultraphrygian", intervals: "1213113" } as Modus,
    mode_2131131: { name: "Hungarian Gipsy minor", intervals: "2131131" } as Modus,
    mode_1311312: { name: "Oriental", intervals: "1311312" } as Modus,
    mode_3113121: { name: "Ionian ♯2 ♯5", intervals: "3113121" } as Modus,
};

const HARMONIC_MINOR = {
    mode_1212213: { name: "1212213", intervals: "1212213" } as Modus,
    mode_2122131: { name: "Minor", intervals: "2122131" } as Modus,
    mode_1221312: { name: "1221312", intervals: "1221312" } as Modus,
    mode_2213121: { name: "2213121", intervals: "2213121" } as Modus,
    mode_2131212: { name: "Ukranian", intervals: "2131212" } as Modus,
    mode_1312122: { name: "Spanish (Phrygian major)", intervals: "1312122" } as Modus,
    mode_3121221: { name: "3121221", intervals: "3121221" } as Modus,
};

const HARMONIC_MAJOR = {
    mode_1213122: { name: "1213122", intervals: "1213122" } as Modus,
    mode_2131221: { name: "2131221", intervals: "2131221" } as Modus,
    mode_1312212: { name: "1312212", intervals: "1312212" } as Modus,
    mode_3122121: { name: "3122121", intervals: "3122121" } as Modus,
    mode_1221213: { name: "1221213", intervals: "1221213" } as Modus,
    mode_2212131: { name: "Major", intervals: "2212131" } as Modus,
    mode_2121312: { name: "2121312", intervals: "2121312" } as Modus,
};

const JAPANESE_PENTATONIC = {
    mode_42141: { name: "Hirajoshi", intervals: "42141" },
    mode_21414: { name: "Box 2", intervals: "21414" },
    mode_14142: { name: "Iwato", intervals: "14142" },
    mode_41421: { name: "Box 4", intervals: "41421" },
    mode_14214: { name: "Miyako-bushi (In scale)", intervals: "14214" },
};

const INSEN_PENTATONIC = {
    mode_14232: { name: "Box 0", intervals: "14232" },
    mode_42321: { name: "Box 1", intervals: "42321" },
    mode_23214: { name: "Box 2", intervals: "23214" },
    mode_32142: { name: "Box 3", intervals: "32142" },
    mode_21423: { name: "Box 4", intervals: "21423" },
};

const TRITONE = {
    mode_321321: { name: "Third", intervals: "321321" } as Modus,
    mode_213213: { name: "Tone", intervals: "213213" } as Modus,
    mode_132132: { name: "Semitone", intervals: "132132" } as Modus,
};

const scale_112323 = {
    mode_112323: { name: "112323", intervals: "112323" } as Modus,
    mode_123231: { name: "123231", intervals: "123231" } as Modus,
    mode_232311: { name: "232311", intervals: "232311" } as Modus,
    mode_323112: { name: "323112", intervals: "323112" } as Modus,
    mode_231123: { name: "231123", intervals: "231123" } as Modus,
    mode_311232: { name: "311232", intervals: "311232" } as Modus,
};

const scale_113223 = {
    mode_113223: { name: "113223", intervals: "113223" } as Modus,
    mode_132231: { name: "132231", intervals: "132231" } as Modus,
    mode_322311: { name: "322311", intervals: "322311" } as Modus,
    mode_223113: { name: "223113", intervals: "223113" } as Modus,
    mode_231132: { name: "231132", intervals: "231132" } as Modus,
    mode_311322: { name: "311322", intervals: "311322" } as Modus,
};

const scale_121323 = {
    mode_121323: { name: "121323", intervals: "121323" } as Modus,
    mode_213231: { name: "213231", intervals: "213231" } as Modus,
    mode_132312: { name: "132312", intervals: "132312" } as Modus,
    mode_323121: { name: "323121", intervals: "323121" } as Modus,
    mode_231213: { name: "231213", intervals: "231213" } as Modus,
    mode_312132: { name: "312132", intervals: "312132" } as Modus,
};

const scale_122223 = {
    mode_122223: { name: "122223", intervals: "122223" } as Modus,
    mode_222231: { name: "222231", intervals: "222231" } as Modus,
    mode_222312: { name: "Prometheus (mystic)", intervals: "222312" } as Modus,
    mode_223122: { name: "223122", intervals: "223122" } as Modus,
    mode_231222: { name: "231222", intervals: "231222" } as Modus,
    mode_312222: { name: "312222", intervals: "312222" } as Modus,
};

const scale_122232 = {
    mode_122232: { name: "122232", intervals: "122232" } as Modus,
    mode_222321: { name: "222321", intervals: "222321" } as Modus,
    mode_223212: { name: "223212", intervals: "223212" } as Modus,
    mode_232122: { name: "232122", intervals: "232122" } as Modus,
    mode_321222: { name: "321222", intervals: "321222" } as Modus,
    mode_212223: { name: "212223", intervals: "212223" } as Modus,
};

const scale_122313 = {
    mode_122313: { name: "122313", intervals: "122313" } as Modus,
    mode_223131: { name: "223131", intervals: "223131" } as Modus,
    mode_231312: { name: "231312", intervals: "231312" } as Modus,
    mode_313122: { name: "313122", intervals: "313122" } as Modus,
    mode_131223: { name: "131223", intervals: "131223" } as Modus,
    mode_312231: { name: "312231", intervals: "312231" } as Modus,
};

const scale_122322 = {
    mode_122322: { name: "122322", intervals: "122322" } as Modus,
    mode_223221: { name: "223221", intervals: "223221" } as Modus,
    mode_232212: { name: "232212", intervals: "232212" } as Modus,
    mode_322122: { name: "322122", intervals: "322122" } as Modus,
    mode_221223: { name: "221223", intervals: "221223" } as Modus,
    mode_212232: { name: "212232", intervals: "212232" } as Modus,
};

const scale_123123 = {
    mode_123123: { name: "123123", intervals: "123123" } as Modus,
    mode_231231: { name: "231231", intervals: "231231" } as Modus,
    mode_312312: { name: "312312", intervals: "312312" } as Modus,
};

const scale_123132 = {
    mode_123132: { name: "123132", intervals: "123132" } as Modus,
    mode_231321: { name: "231321", intervals: "231321" } as Modus,
    mode_313212: { name: "313212", intervals: "313212" } as Modus,
    mode_132123: { name: "132123", intervals: "132123" } as Modus,
    mode_321231: { name: "321231", intervals: "321231" } as Modus,
    mode_212313: { name: "212313", intervals: "212313" } as Modus,
};

const scale_123213 = {
    mode_123213: { name: "123213", intervals: "123213" } as Modus,
    mode_232131: { name: "232131", intervals: "232131" } as Modus,
    mode_321312: { name: "321312", intervals: "321312" } as Modus,
    mode_213123: { name: "213123", intervals: "213123" } as Modus,
    mode_131232: { name: "131232", intervals: "131232" } as Modus,
    mode_312321: { name: "312321", intervals: "312321" } as Modus,
};

const scale_123222 = {
    mode_123222: { name: "123222", intervals: "123222" } as Modus,
    mode_232221: { name: "232221", intervals: "232221" } as Modus,
    mode_322212: { name: "322212", intervals: "322212" } as Modus,
    mode_222123: { name: "222123", intervals: "222123" } as Modus,
    mode_221232: { name: "221232", intervals: "221232" } as Modus,
    mode_212322: { name: "212322", intervals: "212322" } as Modus,
};

const AUGMENTED = {
    mode_131313: { name: "Small", intervals: "131313" } as Modus,
    mode_313131: { name: "Big", intervals: "313131" } as Modus,
};

const scale_131322 = {
    mode_131322: { name: "131322", intervals: "131322" } as Modus,
    mode_313221: { name: "313221", intervals: "313221" } as Modus,
    mode_132213: { name: "132213", intervals: "132213" } as Modus,
    mode_322131: { name: "322131", intervals: "322131" } as Modus,
    mode_221313: { name: "221313", intervals: "221313" } as Modus,
    mode_213132: { name: "213132", intervals: "213132" } as Modus,
};

const scale_132222 = {
    mode_132222: { name: "132222", intervals: "132222" } as Modus,
    mode_322221: { name: "322221", intervals: "322221" } as Modus,
    mode_222213: { name: "222213", intervals: "222213" } as Modus,
    mode_222132: { name: "222132", intervals: "222132" } as Modus,
    mode_221322: { name: "221322", intervals: "221322" } as Modus,
    mode_213222: { name: "213222", intervals: "213222" } as Modus,
};

const scale_1121223 = {
    mode_1121223: { name: "1121223", intervals: "1121223" } as Modus,
    mode_1212231: { name: "1212231", intervals: "1212231" } as Modus,
    mode_2122311: { name: "2122311", intervals: "2122311" } as Modus,
    mode_1223112: { name: "1223112", intervals: "1223112" } as Modus,
    mode_2231121: { name: "2231121", intervals: "2231121" } as Modus,
    mode_2311212: { name: "2311212", intervals: "2311212" } as Modus,
    mode_3112122: { name: "3112122", intervals: "3112122" } as Modus,
};

const scale_1121232 = {
    mode_1121232: { name: "1121232", intervals: "1121232" } as Modus,
    mode_1212321: { name: "1212321", intervals: "1212321" } as Modus,
    mode_2123211: { name: "2123211", intervals: "2123211" } as Modus,
    mode_1232112: { name: "1232112", intervals: "1232112" } as Modus,
    mode_2321121: { name: "2321121", intervals: "2321121" } as Modus,
    mode_3211212: { name: "3211212", intervals: "3211212" } as Modus,
    mode_2112123: { name: "2112123", intervals: "2112123" } as Modus,
};

const scale_1121313 = {
    mode_1121313: { name: "1121313", intervals: "1121313" } as Modus,
    mode_1213131: { name: "1213131", intervals: "1213131" } as Modus,
    mode_2131311: { name: "2131311", intervals: "2131311" } as Modus,
    mode_1313112: { name: "1313112", intervals: "1313112" } as Modus,
    mode_3131121: { name: "3131121", intervals: "3131121" } as Modus,
    mode_1311213: { name: "1311213", intervals: "1311213" } as Modus,
    mode_3112131: { name: "3112131", intervals: "3112131" } as Modus,
};

const scale_1121322 = {
    mode_1121322: { name: "1121322", intervals: "1121322" } as Modus,
    mode_1213221: { name: "1213221", intervals: "1213221" } as Modus,
    mode_2132211: { name: "2132211", intervals: "2132211" } as Modus,
    mode_1322112: { name: "1322112", intervals: "1322112" } as Modus,
    mode_3221121: { name: "3221121", intervals: "3221121" } as Modus,
    mode_2211213: { name: "2211213", intervals: "2211213" } as Modus,
    mode_2112132: { name: "2112132", intervals: "2112132" } as Modus,
};

const scale_1122123 = {
    mode_1122123: { name: "1122123", intervals: "1122123" } as Modus,
    mode_1221231: { name: "1221231", intervals: "1221231" } as Modus,
    mode_2212311: { name: "2212311", intervals: "2212311" } as Modus,
    mode_2123112: { name: "2123112", intervals: "2123112" } as Modus,
    mode_1231122: { name: "1231122", intervals: "1231122" } as Modus,
    mode_2311221: { name: "2311221", intervals: "2311221" } as Modus,
    mode_3112212: { name: "3112212", intervals: "3112212" } as Modus,
};

const scale_1122132 = {
    mode_1122132: { name: "1122132", intervals: "1122132" } as Modus,
    mode_1221321: { name: "1221321", intervals: "1221321" } as Modus,
    mode_2213211: { name: "2213211", intervals: "2213211" } as Modus,
    mode_2132112: { name: "2132112", intervals: "2132112" } as Modus,
    mode_1321122: { name: "1321122", intervals: "1321122" } as Modus,
    mode_3211221: { name: "3211221", intervals: "3211221" } as Modus,
    mode_2112213: { name: "2112213", intervals: "2112213" } as Modus,
};

const scale_1122213 = {
    mode_1122213: { name: "1122213", intervals: "1122213" } as Modus,
    mode_1222131: { name: "1222131", intervals: "1222131" } as Modus,
    mode_2221311: { name: "2221311", intervals: "2221311" } as Modus,
    mode_2213112: { name: "2213112", intervals: "2213112" } as Modus,
    mode_2131122: { name: "Gipsy", intervals: "2131122" } as Modus,
    mode_1311222: { name: "1311222", intervals: "1311222" } as Modus,
    mode_3112221: { name: "3112221", intervals: "3112221" } as Modus,
};

const scale_1122312 = {
    mode_1122312: { name: "1122312", intervals: "1122312" } as Modus,
    mode_1223121: { name: "1223121", intervals: "1223121" } as Modus,
    mode_2231211: { name: "2231211", intervals: "2231211" } as Modus,
    mode_2312112: { name: "2312112", intervals: "2312112" } as Modus,
    mode_3121122: { name: "3121122", intervals: "3121122" } as Modus,
    mode_1211223: { name: "1211223", intervals: "1211223" } as Modus,
    mode_2112231: { name: "2112231", intervals: "2112231" } as Modus,
};

const scale_1123122 = {
    mode_1123122: { name: "1123122", intervals: "1123122" } as Modus,
    mode_1231221: { name: "1231221", intervals: "1231221" } as Modus,
    mode_2312211: { name: "2312211", intervals: "2312211" } as Modus,
    mode_3122112: { name: "3122112", intervals: "3122112" } as Modus,
    mode_1221123: { name: "1221123", intervals: "1221123" } as Modus,
    mode_2211231: { name: "2211231", intervals: "2211231" } as Modus,
    mode_2112312: { name: "2112312", intervals: "2112312" } as Modus,
};

const scale_1123212 = {
    mode_1123212: { name: "1123212", intervals: "1123212" } as Modus,
    mode_1232121: { name: "1232121", intervals: "1232121" } as Modus,
    mode_2321211: { name: "2321211", intervals: "2321211" } as Modus,
    mode_3212112: { name: "3212112", intervals: "3212112" } as Modus,
    mode_2121123: { name: "2121123", intervals: "2121123" } as Modus,
    mode_1211232: { name: "1211232", intervals: "1211232" } as Modus,
    mode_2112321: { name: "2112321", intervals: "2112321" } as Modus,
};

const scale_1131222 = {
    mode_1131222: { name: "1131222", intervals: "1131222" } as Modus,
    mode_1312221: { name: "1312221", intervals: "1312221" } as Modus,
    mode_3122211: { name: "3122211", intervals: "3122211" } as Modus,
    mode_1222113: { name: "1222113", intervals: "1222113" } as Modus,
    mode_2221131: { name: "2221131", intervals: "2221131" } as Modus,
    mode_2211312: { name: "2211312", intervals: "2211312" } as Modus,
    mode_2113122: { name: "2113122", intervals: "2113122" } as Modus,
};

const scale_1131312 = {
    mode_1131312: { name: "1131312", intervals: "1131312" } as Modus,
    mode_1313121: { name: "1313121", intervals: "1313121" } as Modus,
    mode_3131211: { name: "3131211", intervals: "3131211" } as Modus,
    mode_1312113: { name: "1312113", intervals: "1312113" } as Modus,
    mode_3121131: { name: "3121131", intervals: "3121131" } as Modus,
    mode_1211313: { name: "1211313", intervals: "1211313" } as Modus,
    mode_2113131: { name: "2113131", intervals: "2113131" } as Modus,
};

const scale_1132122 = {
    mode_1132122: { name: "1132122", intervals: "1132122" } as Modus,
    mode_1321221: { name: "1321221", intervals: "1321221" } as Modus,
    mode_3212211: { name: "3212211", intervals: "3212211" } as Modus,
    mode_2122113: { name: "2122113", intervals: "2122113" } as Modus,
    mode_1221132: { name: "1221132", intervals: "1221132" } as Modus,
    mode_2211321: { name: "2211321", intervals: "2211321" } as Modus,
    mode_2113212: { name: "2113212", intervals: "2113212" } as Modus,
};

const scale_1132212 = {
    mode_1132212: { name: "1132212", intervals: "1132212" } as Modus,
    mode_1322121: { name: "1322121", intervals: "1322121" } as Modus,
    mode_3221211: { name: "3221211", intervals: "3221211" } as Modus,
    mode_2212113: { name: "2212113", intervals: "2212113" } as Modus,
    mode_2121132: { name: "2121132", intervals: "2121132" } as Modus,
    mode_1211322: { name: "1211322", intervals: "1211322" } as Modus,
    mode_2113221: { name: "2113221", intervals: "2113221" } as Modus,
};

const scale_1212123 = {
    mode_1212123: { name: "1212123", intervals: "1212123" } as Modus,
    mode_2121231: { name: "2121231", intervals: "2121231" } as Modus,
    mode_1212312: { name: "1212312", intervals: "1212312" } as Modus,
    mode_2123121: { name: "2123121", intervals: "2123121" } as Modus,
    mode_1231212: { name: "1231212", intervals: "1231212" } as Modus,
    mode_2312121: { name: "2312121", intervals: "2312121" } as Modus,
    mode_3121212: { name: "Hungarian", intervals: "3121212" } as Modus,
};

const scale_1212132 = {
    mode_1212132: { name: "1212132", intervals: "1212132" } as Modus,
    mode_2121321: { name: "2121321", intervals: "2121321" } as Modus,
    mode_1213212: { name: "1213212", intervals: "1213212" } as Modus,
    mode_2132121: { name: "2132121", intervals: "2132121" } as Modus,
    mode_1321212: { name: "1321212", intervals: "1321212" } as Modus,
    mode_3212121: { name: "3212121", intervals: "3212121" } as Modus,
    mode_2121213: { name: "2121213", intervals: "2121213" } as Modus,
};

// export const SCALES = {
//     diatonic: DIATONIC,
//     pentatonic: PENTATONIC,
//     blues: BLUES,
//     jazz: JAZZ,
//     octatonic: OCTATONIC,
//     wholetone: WHOLETONE,
//     "Japanese pentatonic": JAPANESE_PENTATONIC,
//     "Insen pentatonic": INSEN_PENTATONIC,
//     "harmonic minor": HARMONIC_MINOR,
//     "harmonic major": HARMONIC_MAJOR,
//     "Double harmonic": DOUBLE_HARMONIC,
//     augmented: AUGMENTED,
//     tritone: TRITONE,

//     scale_112323: scale_112323,
//     scale_113223: scale_113223,
//     scale_121323: scale_121323,
//     scale_122223: scale_122223,
//     scale_122232: scale_122232,
//     scale_122313: scale_122313,
//     scale_122322: scale_122322,
//     scale_123123: scale_123123,
//     scale_123132: scale_123132,
//     scale_123213: scale_123213,
//     scale_123222: scale_123222,
//     scale_131322: scale_131322,
//     scale_132222: scale_132222,
//     scale_1121223: scale_1121223,
//     scale_1121232: scale_1121232,
//     scale_1121313: scale_1121313,
//     scale_1121322: scale_1121322,
//     scale_1122123: scale_1122123,
//     scale_1122132: scale_1122132,
//     scale_1122213: scale_1122213,
//     scale_1122312: scale_1122312,
//     scale_1123122: scale_1123122,
//     scale_1123212: scale_1123212,
//     scale_1131222: scale_1131222,
//     scale_1131312: scale_1131312,
//     scale_1132122: scale_1132122,
//     scale_1132212: scale_1132212,
//     scale_1212123: scale_1212123,
//     scale_1212132: scale_1212132,
// };

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
    let modes: string[] = [];

    for (let i of getRange(0, scale.length)) {
        modes.push(scale.slice(i) + scale.slice(0, i));
    }

    return modes;
}
