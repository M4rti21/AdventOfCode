const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();

const split = input.split("\n\n");

type M = Map<number, number[]>;

const updates = split[1]
    .split("\n")
    .map((s) => s.split(",").map((n) => Number(n)));
const rules: M = new Map();

const rules_base = split[0]
    .split("\n")
    .map((s) => s.split("|").map((n) => Number(n)));

for (const r of rules_base) {
    const prev = r[0];
    const curr = r[1];
    rules.set(curr, [...(rules.get(curr) || []), prev]);
}

let sum = 0;
for (const update of updates) {
    let good = true;
    const prev: number[] = [];
    for (const page of update) {
        if (pageOK(rules, page, update, prev)) continue;
        good = false;
        break;
    }
    if (good) {
        const mid = Math.floor(update.length / 2);
        const num = update[mid];
        // console.log(num);
        sum += num;
    }
}

console.log(sum);

function pageOK(
    rules: M,
    page: number,
    update: number[],
    prev: number[]
): boolean {
    const rule = rules.get(page);
    if (!rule) {
        prev.push(page);
        return true;
    }
    for (const r of rule) {
        if (!update.includes(r)) continue;
        if (!prev.includes(r)) return false;
    }
    prev.push(page);
    return true;
}
