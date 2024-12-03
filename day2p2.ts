const data = Bun.file("day2.input");
const input = await data.text();
const lines = input.split("\n");
const reports = lines.map((s) => s.split(" ").map((n) => Number(n)));
reports.length = reports.length - 1;
let safe = 0;

const GREEN = "\x1b[32m%s\x1b[0m";
const RED = "\x1b[31m%s\x1b[0m";

type Check = {
    desc: (a: number, b: number) => string;
    check: (a: number, b: number) => boolean;
};

const checks: Check[] = [
    {
        desc: (a, b) => `${a} !== ${b}`,
        check: (a, b) => a !== b,
    },
    {
        desc: (a, b) => `${a} < ${b}`,
        check: (a, b) => a < b,
    },
    {
        desc: (a, b) => `${a} -> ${b} +3`,
        check: (a, b) => Math.abs(a - b) <= 3,
    },
];

for (let i = 0; i < reports.length; i++) {
    const r = reports[i];
    let dir = getDirection(r);
    let [index, err, desc] = checkErrors(r, dir);
    if (err) {
        console.log(RED, i, dir);
        console.log(RED, r);
        console.log(RED, 1, desc);
        r.splice(index, 1);
        [index, err, desc] = checkErrors(r, dir);
        if (err) {
            console.log(RED, r);
            console.log(RED, 1, desc);
        } else {
            console.log(GREEN, r);
        }
    } else {
        console.log(GREEN, i, dir);
        console.log(GREEN, r);
    }
    console.log();
    if (!err) {
        safe++;
    }
}
console.log(safe);

function getDirection(r: number[]): "asc" | "desc" {
    let asc_val = 0;
    let desc_val = 0;
    let prev = r[0];
    for (let i = 0; i < r.length; i++) {
        if (r[i] > prev) asc_val++;
        if (r[i] < prev) desc_val++;
        prev = r[i];
    }
    return asc_val > desc_val ? "asc" : "desc";
}

function checkErrors(
    r: number[],
    dir: "asc" | "desc"
): [number, boolean, string] {
    for (let i = 0; i < r.length; i++) {
        const prev = i > 0 ? r[i - 1] : undefined;
        const curr = r[i];
        const next = i < r.length - 1 ? r[i + 1] : undefined;
        if (dir === "asc") {
            for (const c of checks) {
                if (prev && !c.check(prev, curr))
                    return [i, true, c.desc(prev, curr)];
                if (next && !c.check(curr, next))
                    return [i + 1, true, c.desc(curr, next)];
            }
        } else if (dir === "desc") {
            for (const c of checks) {
                if (prev && !c.check(curr, prev))
                    return [i, true, c.desc(curr, prev)];
                if (next && !c.check(next, curr))
                    return [i + 1, true, c.desc(next, curr)];
            }
        }
    }
    return [-1, false, "z"];
}
