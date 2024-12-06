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

let past_walls: string[] = [];
let obst_walls: string[] = [];

moveGuard(true);
function moveGuard(counts: boolean) {
    const cell = cells[guard.y + d.y]?.[guard.x + d.x];
    if (!cell) return;
    if (cell !== "#") {
        guard.y += d.y;
        guard.x += d.x;
        if (counts) {
            let has_past_wall_to_right = false;
            // move right
            let next: coords = {
                y: guard.y,
                x: guard.x,
            };
            let [new_d, _] = next_direction(current);
            console.log("checking if i'd hit a prev wall");
            console.log(past_walls);
            while (true) {
                next.y += new_d.y;
                next.x += new_d.x;
                const cell_right = cells[next.y]?.[next.x];
                if (!cell_right) break;
                if (cell_right !== "#") continue;
                const str = `${next.y},${next.x}`;
                console.log(str);
                // maybe not
                if (!past_walls.includes(str)) break;
                has_past_wall_to_right = true;
                const possible_wall_str = `${guard.y + d.y},${guard.x + d.x}`;
                if (!obst_walls.includes(possible_wall_str)) {
                    obst_walls.push(possible_wall_str);
                    break;
                }
            }
        }
        moveGuard(true);
    } else {
        const str = `${guard.y + d.y},${guard.x + d.x}`;
        past_walls.push(str);
        [d, current] = next_direction(current);
        moveGuard(false);
    }
}

function next_direction(current: string): [coords, string] {
    switch (current) {
        case "up":
            return [directions.right, "right"];
        case "right":
            return [directions.down, "down"];
        case "down":
            return [directions.left, "left"];
        case "left":
            return [directions.up, "up"];
        default:
            return [directions.up, ""];
    }
}

console.log(obst_walls);
console.log(obst_walls.length);
