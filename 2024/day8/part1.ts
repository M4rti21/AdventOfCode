const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.trim().split("\n");

let antenas: string[][] = lines.map((l) => l.split(""));
let antinodes: string[][] = lines.map((l) => l.split("").map((_) => " "));

print_board(antenas);
print_board(antinodes);

let count = 0;
for (let i = 0; i < antenas.length; i++) {
    for (let j = 0; j < antenas[i].length; j++) {
        const cell = antenas[i][j];
        if (cell === ".") continue;
        for (let ii = 0; ii < antenas.length; ii++) {
            for (let jj = 0; jj < antenas[ii].length; jj++) {
                if (i === ii && j === jj) continue;
                const alt_cell = antenas[ii][jj];
                if (alt_cell !== cell) continue;
                // same type of antena
                const i_diff = i - ii;
                const j_diff = j - jj;
                const new_i = i + i_diff;
                if (new_i < 0 || new_i > antenas.length - 1) continue;
                const new_j = j + j_diff;
                if (new_j < 0 || new_j > antenas[new_i].length - 1) continue;
                if (antinodes[i + i_diff][j + j_diff] !== "#") count++;
                antinodes[i + i_diff][j + j_diff] = "#";
            }
        }
    }
}

function print_board(board: any[][]) {
    console.log(board.map((row) => row.join("")).join("\n"));
}

print_board(antinodes);
console.log(count);
