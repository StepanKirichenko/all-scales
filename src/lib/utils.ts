export function* getRange(from: number, to: number): Generator<number> {
    if (from > to) [from, to] = [to, from];
    while (from < to) yield from++;
}