const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.split("\n");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let sum = 0;
for (const line of lines) {
    const split = line.split(":");
    const gameId = Number(split[0].split(" ")[1]);
    const rounds = split[1].split(";");
    let found_red = 0;
    let found_green = 0;
    let found_blue = 0;
    for (const round of rounds) {
        const cubes = round
            .trim()
            .split(",")
            .map((c) => c.trim().split(" "));
        for (const cube of cubes) {
            const name = cube[1];
            const val = Number(cube[0]);
            switch (name) {
                case "red":
                    if (val > found_red) found_red = val;
                    break;
                case "green":
                    if (val > found_green) found_green = val;
                    break;
                case "blue":
                    if (val > found_blue) found_blue = val;
                    break;
            }
        }
    }
    if (
        found_red > MAX_RED ||
        found_green > MAX_GREEN ||
        found_blue > MAX_BLUE
    ) {
        continue;
    }
    sum += gameId;
}

console.log(sum);
