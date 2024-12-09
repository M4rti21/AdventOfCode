const data = Bun.file(Bun.argv[2]);
const input = (await data.text()).trim();

const blocks = parse(input);
const compacted = compact(blocks);
console.log(compacted.join(""));
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
    let new_blocks = [...blocks];

    for (let i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i] === ".") continue;
        // is file
        let file_value = blocks[i];
        let file_length = 0;
        while (blocks[i - file_length] === file_value) {
            file_length++;
        }
        let file_index = i - (file_length - 1);
        i -= file_length - 1;
        let empty_length = 0;
        let empty_index = -1;
        for (let j = 0; j < new_blocks.length; j++) {
            let this_length = 0;
            if (new_blocks[j] !== ".") continue;
            while (new_blocks[j + this_length] === ".") {
                this_length++;
            }
            if (this_length >= file_length) {
                empty_length = this_length;
                empty_index = j;
                break;
            }
        }
        if (empty_index < 0) continue;
        if (empty_index > file_index) continue;
        // console.log("type", "value", "length", "index");
        // console.log("file", file_value, file_length, file_index);
        // console.log("empty", ".", empty_length, empty_index);
        let start = new_blocks.slice(0, empty_index);
        let mid = new_blocks.slice(empty_index + file_length, file_index);
        let end = new_blocks.slice(file_index + file_length, new_blocks.length);
        // console.log(new_blocks.join(""));
        let num: string[] = [];
        for (let j = 0; j < file_length; j++) {
            num.push(file_value);
        }
        let empty: string[] = [];
        for (let j = 0; j < file_length; j++) {
            empty.push(".");
        }
        new_blocks = [...start, ...num, ...mid, ...empty, ...end];
        // console.log(new_blocks.join(""));
        // console.log();
    }
    return new_blocks;
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
