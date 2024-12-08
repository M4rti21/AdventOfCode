const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();
const lines = input.trim().split("\n");

let ans = 0;
for (const line of lines) {
    const split = line.split(":");
    const res = Number(split[0]);
    const nums = split[1]
        .trim()
        .split(" ")
        .map((n) => Number(n));

    let totals: number[] = [nums[0]];
    for (let i = 1; i < nums.length - 1; i++) {
        let ts: number[] = [];
        for (const total of totals) {
            const [sum, mul] = both(total, nums[i]);
            ts.push(sum);
            ts.push(mul);
        }
        totals = ts;
    }
    const finals: number[] = [];
    for (const total of totals) {
        const [sum, mul] = both(total, nums[nums.length - 1]);
        finals.push(sum);
        finals.push(mul);
    }
    if (!finals.includes(res)) continue;
    ans += res;
}
console.log(ans);

function both(total: number, num: number): number[] {
    return [total + num, total * num];
}
