const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.split("\n");

let sum = 0;
for (const line of lines) {
    let first = "";
    let last = "";
    for (const char of line) {
        if (isNaN(Number(char))) continue;
        if (!first) {
            first = char;
            last = char;
        } else {
            last = char;
        }
    }
    sum += Number(first + last);
}

console.log(sum);
