const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.split("\n");

const start = performance.now();
type M = Map<string, string[]>;

const comps: M = new Map();

for (const l of lines) {
    const split = l.split(":");
    const key = split[0];
    const values = split[1].trim().split(" ");

    if (!comps.has(key)) comps.set(key, values);
    else comps.set(key, [...comps.get(key)!, ...values]);

    for (const v of values) {
        if (!comps.has(v)) comps.set(v, [key]);
        else comps.set(v, [...comps.get(v)!, key]);
    }
}

const keys = Array.from(comps.keys());

let iterations = 0;
console.log(verify(comps));
console.log(iterations);
console.log(performance.now() - start + "ms");

function verify(map: M): number {
    for (let i = 0; i < keys.length - 1; i++) {
        const i_vals = comps.get(keys[i])!;
        for (let ii = 0; ii < i_vals.length - 1; ii++) {
            const i_map = new Map(map);
            cut(i_map, keys[i], i_vals[ii]);
            for (let j = 0; j < keys.length; j++) {
                const j_vals = comps.get(keys[j])!;
                for (let jj = 0; jj < j_vals.length - 1; jj++) {
                    const j_map = new Map(i_map);
                    cut(j_map, keys[j], j_vals[jj]);
                    for (let k = 0; k < keys.length - 1; k++) {
                        const k_vals = comps.get(keys[k])!;
                        for (let kk = 0; kk < k_vals.length - 1; kk++) {
                            if (keys[k] === k_vals[kk]) continue;
                            const k_map = new Map(j_map);
                            cut(k_map, keys[k], k_vals[kk]);
                            const c = check(k_map);
                            iterations++;
                            if (c.length !== 2) continue;
                            return c[0].length * c[1].length;
                        }
                    }
                }
            }
        }
    }
    return -1;
}

function cut(map: M, a: string, b: string) {
    if (map.has(a))
        map.set(
            a,
            map.get(a)!.filter((c) => c !== b)
        );
    if (map.has(b))
        map.set(
            b,
            map.get(b)!.filter((c) => c !== a)
        );
}

function count(map: M, a: string, cs: string[] = []) {
    if (!map.has(a)) return cs;
    if (cs.includes(a)) return cs;
    cs.push(a);
    for (const c of map.get(a)!) {
        count(map, c, cs);
    }
    return cs;
}

function check(map: M): string[][] {
    const lists: string[][] = [];
    let checked: string[] = [];
    for (const k of map.keys()) {
        if (checked.includes(k)) continue;
        const cnt = count(map, k);
        checked = [...checked, ...cnt];
        let included = false;
        for (const l of lists) {
            // console.log(l);
            if (!l.includes(k)) continue;
            included = true;
            break;
        }
        if (!included) lists.push(cnt);
    }
    return lists;
}
