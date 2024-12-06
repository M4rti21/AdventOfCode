const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.trim().split("\n");

type coords = {
    y: number;
    x: number;
};

const directions = {
    up: { y: -1, x: 0 },
    right: { y: 0, x: 1 },
    down: { y: 1, x: 0 },
    left: { y: 0, x: -1 },
};

let current = "up";

const cells = lines.map((l) => l.split(""));

let d: coords = {
    y: -1,
    x: 0,
};

let guard: coords = {
    y: 0,
    x: 0,
};

for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j] !== "^") continue;
        guard.y = i;
        guard.x = j;
    }
}

console.log(cells.map((row) => row.join("")).join("\n"));
moveGuard();

function moveGuard() {
    cells[guard.y][guard.x] = "X";
    const cell = cells[guard.y + d.y]?.[guard.x + d.x];
    if (!cell) return;
    if (cell !== "#") {
        guard.y += d.y;
        guard.x += d.x;
        moveGuard();
    } else {
        switch (current) {
            case "up":
                d = directions.right;
                current = "right";
                break;
            case "right":
                d = directions.down;
                current = "down";
                break;
            case "down":
                d = directions.left;
                current = "left";
                break;
            case "left":
                d = directions.up;
                current = "up";
                break;
        }
        moveGuard();
    }
}
console.log(
    "------------------------------------------------------------------------------------------------------"
);
let x_count = 0;
for (const row of cells) {
    for (const cell of row) {
        if (cell === "X") x_count++;
    }
}
console.log(cells.map((row) => row.join("")).join("\n"));
console.log(x_count);
