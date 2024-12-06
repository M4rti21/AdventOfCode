const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.trim().split("\n");

const cells = lines.map((l) => l.split(""));

for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j] !== "O") continue;
        console.log(i, j);
    }
}
