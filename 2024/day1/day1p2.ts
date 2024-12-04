solve();
async function solve() {
    const data = Bun.file("day1.input");
    const input = await data.text();

    const ids = input
        .split("   ")
        .join(" ")
        .split("\n")
        .join(" ")
        .trim()
        .split(" ");

    const sorter = (a: number, b: number) => a - b;

    const left: number[] = [];
    for (let i = 0; i < ids.length; i += 2) {
        left.push(Number(ids[i]));
    }
    left.sort(sorter);

    const right: number[] = [];
    for (let i = 1; i < ids.length; i += 2) {
        right.push(Number(ids[i]));
    }
    right.sort(sorter);

    let similarity = 0;

    for (const l of left) {
        let sum = 0;
        for (const r of right) {
            if (r !== l) continue;
            sum += r;
        }
        similarity += sum;
    }

    console.log(similarity);
}
