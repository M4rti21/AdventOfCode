const data = Bun.file(Bun.argv[2]);
const input = await data.text();

const start = performance.now();

let res = 0;
let enabled = true;

let seq = "";
let n1 = "";
let n2 = "";

function lastIsNumber(seq: string): boolean {
    return !isNaN(Number(seq.charAt(seq.length - 1)));
}

for (const c of input) {
    let seq_initial = seq;

    if (c === "d") {
        seq = "d";
    } else if (c === "o" && seq === "d") {
        seq += c;
    } else if (c === "n" && seq === "do") {
        seq += c;
    } else if (c === "'" && seq === "don") {
        seq += c;
    } else if (c === "t" && seq === "don'") {
        seq += c;
    } else if (c === "(" && (seq === "do" || seq === "don't")) {
        seq += c;
    } else if (c === ")" && (seq === "do(" || seq === "don't(")) {
        seq += c;
    }

    if (seq === "do()") {
        enabled = true;
    } else if (seq === "don't()") {
        enabled = false;
    }

    if (enabled) {
        // MUL
        if (c === "m") {
            seq = "m";
        } else if (c === "u" && seq === "m") {
            seq += c;
        } else if (c === "l" && seq === "mu") {
            seq += c;
        } else if (c === "(" && seq === "mul") {
            seq += c;
        } else if (Number.isInteger(Number(c)) && seq.startsWith("mul(")) {
            // numbers
            seq += c;
            if (seq.includes(",")) n2 += c;
            else n1 += c;
        } else if (
            c === "," &&
            seq.startsWith("mul(") &&
            lastIsNumber(seq) //&&
            // !seq.includes(",")
        ) {
            seq += c;
        } else if (
            c === ")" &&
            seq.startsWith("mul(") &&
            seq.includes(",") &&
            lastIsNumber(seq)
        ) {
            seq += c;
            res += Number(n1) * Number(n2);
            seq = "";
            n1 = "";
            n2 = "";
        }
    }

    if (seq === seq_initial) {
        seq = "";
        n1 = "";
        n2 = "";
    }
}

console.log(res);

console.log(`${performance.now() - start}ms`);
