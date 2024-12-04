const data = Bun.file(Bun.argv[2]);
const input = await data.text();

const lines = input.trim().split("\n");
const board = lines.map((l) => l.split(""));

let count = 0;

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== "A") continue;
        xmas(i, j);
    }
}

console.log(count);

//  -1-1 . -1+1    M.M    M.S    S.S    S.M
//    .  A  .      .A.    .A.    .A.    .A.
//  +1-1 . +1+1    S.S    M.S    M.M    S.M

function xmas(i: number, j: number) {
    if (
        board[i - 1]?.[j - 1] === "M" &&
        board[i - 1]?.[j + 1] === "M" &&
        board[i + 1]?.[j - 1] === "S" &&
        board[i + 1]?.[j + 1] === "S"
    )
        count++;
    if (
        board[i - 1]?.[j - 1] === "M" &&
        board[i - 1]?.[j + 1] === "S" &&
        board[i + 1]?.[j - 1] === "M" &&
        board[i + 1]?.[j + 1] === "S"
    )
        count++;
    if (
        board[i - 1]?.[j - 1] === "S" &&
        board[i - 1]?.[j + 1] === "S" &&
        board[i + 1]?.[j - 1] === "M" &&
        board[i + 1]?.[j + 1] === "M"
    )
        count++;
    if (
        board[i - 1]?.[j - 1] === "S" &&
        board[i - 1]?.[j + 1] === "M" &&
        board[i + 1]?.[j - 1] === "S" &&
        board[i + 1]?.[j + 1] === "M"
    )
        count++;
}
