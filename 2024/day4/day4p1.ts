const data = Bun.file(Bun.argv[2]);
const input = await data.text();

const lines = input.trim().split("\n");
const board = lines.map((l) => l.split(""));

let count = 0;

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== "X") continue;
        xmas(i, j);
    }
}

console.log(count);

function xmas(i: number, j: number) {
    // top left
    if (
        [
            board[i][j], // X
            board[i - 1]?.[j - 1], // M
            board[i - 2]?.[j - 2], // A
            board[i - 3]?.[j - 3], // S
        ].join("") === "XMAS"
    )
        count++;
    // top mid
    if (
        [
            board[i][j], // X
            board[i - 1]?.[j], // M
            board[i - 2]?.[j], // A
            board[i - 3]?.[j], // S
        ].join("") === "XMAS"
    )
        count++;
    // top right
    if (
        [
            board[i][j], // X
            board[i - 1]?.[j + 1], // M
            board[i - 2]?.[j + 2], // A
            board[i - 3]?.[j + 3], // S
        ].join("") === "XMAS"
    )
        count++;
    // mid left
    if (
        [
            board[i][j], // X
            board[i]?.[j - 1], // M
            board[i]?.[j - 2], // A
            board[i]?.[j - 3], // S
        ].join("") === "XMAS"
    )
        count++;
    // mid right
    if (
        [
            board[i][j], // X
            board[i]?.[j + 1], // M
            board[i]?.[j + 2], // A
            board[i]?.[j + 3], // S
        ].join("") === "XMAS"
    )
        count++;
    // bot left
    if (
        [
            board[i][j], // X
            board[i + 1]?.[j - 1], // M
            board[i + 2]?.[j - 2], // A
            board[i + 3]?.[j - 3], // S
        ].join("") === "XMAS"
    )
        count++;
    // bot mid
    if (
        [
            board[i][j], // X
            board[i + 1]?.[j], // M
            board[i + 2]?.[j], // A
            board[i + 3]?.[j], // S
        ].join("") === "XMAS"
    )
        count++;
    // bot right
    if (
        [
            board[i][j], // X
            board[i + 1]?.[j + 1], // M
            board[i + 2]?.[j + 2], // A
            board[i + 3]?.[j + 3], // S
        ].join("") === "XMAS"
    )
        count++;
}
