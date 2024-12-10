const data = Bun.file(Bun.argv[2]);
const input = await data.text();
const lines = input.trim().split("\n");

const cells = lines.map((l) => l.split("").map((n) => Number(n)));

let sum = 0;
let th = 0;
let reach: string[] = [];
for (let y = 0; y < cells.length; y++) {
    for (let x = 0; x < cells[y].length; x++) {
        if (cells[y][x] !== 0) continue;
        // console.log("trail head", y, x);
        th++;
        reach = [];
        pathfind(y, x);
        // console.log(reach);
        // console.log("reached", reach.length);
        sum += reach.length;
    }
}

console.log("sum", sum);
// console.log("th", th);

function pathfind(y: number, x: number) {
    const coords = [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1],
    ];
    for (const c of coords) {
        const cell = cells[c[0]]?.[c[1]];
        if (!cell) continue;
        if (cell - 1 !== cells[y][x]) continue;
        else {
            if (cell === 9) {
                if (!reach.includes(`${c[0]},${c[1]}`)) {
                    // console.log("reached 9", c, "from", y, x);
                    reach.push(`${c[0]},${c[1]}`);
                }
            } else {
                // console.log("going to", c, cell);
                pathfind(c[0], c[1]);
            }
        }
    }
}
