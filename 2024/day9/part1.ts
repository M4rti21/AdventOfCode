const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();

const blocks = parse(input);
const compacted = compact(blocks);
const total = sum(compacted);
console.log(total);

function parse(line: string): string[] {
    let blocks: string[] = [];
    let id = 0;
    for (let i = 0; i < line.length; i++) {
        const num = Number(line[i]);
        if (i % 2 === 0) {
            for (let j = 0; j < num; j++) {
                blocks.push(String(id));
            }
            id++;
        } else {
            for (let j = 0; j < num; j++) {
                blocks.push(".");
            }
        }
    }
    return blocks;
}

function compact(blocks: string[]) {
    let new_line = [...blocks];
    for (let i = 0; i < blocks.length; i++) {
        if (new_line[i] !== ".") continue;
        let last_value: string = "";
        let last_index: number = -1;
        for (let j = new_line.length - 1; j >= 0; j--) {
            const char = new_line[j];
            if (!char || char === ".") continue;
            last_value = char;
            last_index = j;
            break;
        }
        if (last_index < 0) break;
        if (last_index < i) break;
        let start = new_line.slice(0, i);
        let mid = new_line.slice(i + 1, last_index);
        let end = new_line.slice(last_index + 1, new_line.length);
        new_line = [...start, last_value, ...mid, ".", ...end];
    }
    return new_line;
}

function sum(line: string[]) {
    let total = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === ".") continue;
        const num = Number(line[i]);
        total += i * num;
    }
    return total;
}
