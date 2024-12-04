const data = Bun.file("day3.input");
const input = await data.text();

let res = 0;

let seq = "";
let n1 = "";
let n2 = "";

for (const c of input) {
    if (c === "m") {
        seq += c;
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
    } else {
        seq = "";
        n1 = "";
        n2 = "";
    }
}

console.log(res);

function lastIsNumber(seq: string): boolean {
    return !isNaN(Number(seq.charAt(seq.length - 1)));
}
