const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.split("\n");

const start = performance.now();

type M = Map<string, Comp>;

class Comp {
    name: string;
    connected: M;

    constructor(name: string) {
        this.name = name;
        this.connected = new Map();
    }

    toString() {
        return `${this.name}: ${[...this.connected.keys()].map((k) => k)}`;
    }
}

const comps: M = new Map();
const relations: Map<string, string[]> = new Map();

for (const l of lines) {
    const split = l.split(":");
    const key = split[0];
    const values = split[1].trim().split(" ");

    if (!relations.has(key)) {
        comps.set(key, new Comp(key));
        relations.set(key, values);
    } else relations.set(key, [...relations.get(key)!, ...values]);

    for (const v of values) {
        if (!relations.has(v)) comps.set(v, new Comp(v));
        else relations.set(v, [...relations.get(v)!, key]);
    }
}

for (const [k, vals] of relations) {
    const comp = comps.get(k)!;
    for (const v of vals) {
        link(comp, comps.get(v)!);
    }
}

// console.log(comps);
// console.log(comps.size);

let iterations = 0;
// print(comps);
console.log(verify(comps));
// print(comps);
console.log(iterations);

function verify(map: M): number {
    for (const i_comp of map.values()) {
        for (const ii_comp of [...i_comp.connected.values()]) {
            unlink(i_comp, ii_comp);
            for (const j_comp of map.values()) {
                for (const jj_comp of [...j_comp.connected.values()]) {
                    unlink(j_comp, jj_comp);
                    for (const k_comp of map.values()) {
                        for (const kk_comp of [...k_comp.connected.values()]) {
                            unlink(k_comp, kk_comp);
                            // console.log(
                            //     `[${i_comp.name}, ${ii_comp.name}], [${j_comp.name}, ${jj_comp.name}], [${k_comp.name}, ${kk_comp.name}]`
                            // );
                            const c = check(map);
                            iterations++;
                            if (c.length >= 2) {
                                console.log(
                                    `[${i_comp.name}, ${ii_comp.name}], [${j_comp.name}, ${jj_comp.name}], [${k_comp.name}, ${kk_comp.name}]`
                                );
                                return c[0].length * c[1].length;
                            }
                            link(k_comp, kk_comp);
                        }
                    }
                    link(j_comp, jj_comp);
                }
            }
            link(i_comp, ii_comp);
        }
    }
    return -1;
}

function link(a: Comp, b: Comp) {
    // console.log(`link ${a.name} -> ${b.name}\n`);
    a.connected.set(b.name, b);
    b.connected.set(a.name, a);
}

function unlink(a: Comp, b: Comp) {
    // console.log(`unlink ${a.name} -> ${b.name}\n`);
    a.connected.delete(b.name);
    b.connected.delete(a.name);
}

function count(map: M, c: Comp, clist: Comp[] = []) {
    if (clist.includes(c)) return clist;
    clist.push(c);
    for (const clink of c.connected.values()) {
        if (clist.includes(clink)) continue;
        count(map, clink, clist);
    }
    return clist;
}

function check(map: M): Comp[][] {
    const lists: Comp[][] = [];
    let checked: Comp[] = [];
    for (const k of map.values()) {
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

function print(map: M) {
    for (const v of map.values()) {
        console.log(v.toString());
    }
}

console.log(performance.now() - start + "ms");
