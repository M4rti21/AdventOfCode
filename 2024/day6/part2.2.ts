const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.trim().split("\n");

type coords = { y: number; x: number };

const original_cells = lines.map((l) => l.split(""));
let original_guard: coords = {
    y: 0,
    x: 0,
};

let walls = 0;
for (let i = 0; i < original_cells.length; i++) {
    for (let j = 0; j < original_cells[i].length; j++) {
        if (i === original_guard.y && j === original_guard.x) continue;

        const directions = {
            up: { y: -1, x: 0 },
            right: { y: 0, x: 1 },
            down: { y: 1, x: 0 },
            left: { y: 0, x: -1 },
        };

        let current = "up";

        const cells = original_cells.map((c) => c.map((c2) => c2));

        let d: coords = { y: -1, x: 0 };

        let guard: coords = { y: 0, x: 0 };

        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                if (cells[i][j] !== "^") continue;
                original_guard.y = i;
                original_guard.x = j;
            }
        }

        guard.y = original_guard.y;
        guard.x = original_guard.x;
        const prev = cells[i][j];
        cells[i][j] = "#";
        print_board();
        console.log();
        try {
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
        } catch (err) {
            walls++;
        }
        cells[i][j] = prev;
        console.log(walls);

        function print_board() {
            console.log(cells.map((row) => row.join("")).join("\n"));
        }
    }
}
