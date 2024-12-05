const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.split("\n");

let sum = 0;

const nums = [
    ["1", "1"],
    ["one", "1"],
    ["2", "2"],
    ["two", "2"],
    ["3", "3"],
    ["three", "3"],
    ["4", "4"],
    ["four", "4"],
    ["5", "5"],
    ["five", "5"],
    ["6", "6"],
    ["six", "6"],
    ["7", "7"],
    ["seven", "7"],
    ["8", "8"],
    ["eight", "8"],
    ["9", "9"],
    ["nine", "9"],
];

for (const line of lines) {
    let first = "";
    let last = "";
    let accum = "";
    for (const char of line) {
        accum += char;
        for (const pair of nums) {
            if (!accum.endsWith(pair[0])) continue;
            if (!first) {
                first = pair[1];
                last = pair[1];
            } else {
                last = pair[1];
            }
        }
    }
    sum += Number(first + last);
}

console.log(sum);
