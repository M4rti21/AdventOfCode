const data = Bun.file("day2.input");
const input = await data.text();
const lines = input.split("\n");
const reports = lines.map((s) => s.split(" ").map((n) => Number(n)));
reports.length = reports.length - 1;
const MAX = 3;
let safe = 0;

let i = 0;
for (const r of reports) {
    console.log(i);
    i++;
    let last;
    let dir;
    let good = true;
    for (const l of r) {
        if (!last) {
            last = l;
            continue;
        }
        if (l === last) {
            good = false;
            console.log("a", last, l);
            break;
        }
        if (!dir) {
            if (l > last) {
                dir = "asc";
            } else if (l < last) {
                dir = "desc";
            } else {
                good = false;
                console.log("b", last, l);
                break;
            }
        }
        switch (dir) {
            case "asc":
                if (l <= last) {
                    good = false;
                    console.log("c", last, l);
                    break;
                }
                if (l - MAX > last) {
                    good = false;
                    console.log("d", last, l);
                    break;
                }
                break;
            case "desc":
                if (l >= last) {
                    good = false;
                    console.log("e", last, l);
                    break;
                }
                if (l + MAX < last) {
                    good = false;
                    console.log("f", last, l);
                    break;
                }
                break;
        }
        last = l;
    }
    if (good) {
        safe++;
    }
}

console.log(safe);
