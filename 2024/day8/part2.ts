const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.trim().split("\n");

let antenas: string[][] = lines.map((l) => l.split(""));
let antinodes: string[][] = lines.map((l) => l.split("").map((_) => " "));

print_board(antenas);

for (let i = 0; i < antenas.length; i++) {
    for (let j = 0; j < antenas[i].length; j++) {
        const cell = antenas[i][j];
        if (cell === ".") continue;
        for (let ii = 0; ii < antenas.length; ii++) {
            for (let jj = 0; jj < antenas[ii].length; jj++) {
                if (i === ii && j === jj) continue;
                const alt_cell = antenas[ii][jj];
                if (alt_cell !== cell) continue;
                antinodes[ii][jj] = "#";
                // same type of antena
                const i_diff = i - ii;
                const j_diff = j - jj;
                for (let k = 1; k < antenas.length; k++) {
                    const new_i_diff = i_diff * k;
                    const new_j_diff = j_diff * k;
                    const new_i = i + new_i_diff;
                    const new_j = j + new_j_diff;
                    if (!antinodes[new_i]?.[new_j]) continue;
                    antinodes[new_i][new_j] = "#";
                }
            }
        }
    }
}

let count = 0;
for (const line of antinodes) {
    for (const cell of line) {
        if (cell === "#") count++;
    }
}

function print_board(board: any[][]) {
    console.log(board.map((row) => row.join("")).join("\n"));
}

print_board(antinodes);
console.log(count);
