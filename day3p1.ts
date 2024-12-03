const data = Bun.file("day3.input");
const input = await data.text();

const mults: string[] = [];
let res = 0;

let enabled = true;

let seq = "";
let n1 = "";
let n2 = "";

for (const c of input) {
    console.log(seq);
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
        console.log("ENABLED");
    } else if (seq === "don't()") {
        enabled = false;
        console.log("DISABLED");
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
            mults.push(seq);
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
console.log(seq);

console.log(mults);
console.log(res);

function lastIsNumber(seq: string): boolean {
    return !isNaN(Number(seq.charAt(seq.length - 1)));
}
