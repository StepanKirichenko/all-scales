export function getRange(from: number, to: number): number[] {
    let result: number[] = [];
    if (from > to) {
        [from, to] = [to, from];
    }

    while (from < to) {
        result.push(from);
        from += 1;
    }

    return result;
}
