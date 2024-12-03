const data = Bun.file("day2.input");
const input = await data.text();
const lines = input.split("\n");
const reports = lines.map((s) => s.split(" ").map((n) => Number(n)));
reports.length = reports.length - 1;
const MAX = 3;
let safe = 0;
for (const rep of reports) {
    for (let j = 0; j < rep.length; j++) {
        const r = [...rep];
        r.splice(j, 1);
        console.log(r);
        if (!is_good(r)) continue;
        safe++;
        break;
    }
}

function is_good(r: number[]) {
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
            break;
        }
        if (!dir) {
            if (l > last) {
                dir = "asc";
            } else if (l < last) {
                dir = "desc";
            } else {
                good = false;
                break;
            }
        }
        switch (dir) {
            case "asc":
                if (l <= last) {
                    good = false;
                    break;
                }
                if (l - MAX > last) {
                    good = false;
                    break;
                }
                break;
            case "desc":
                if (l >= last) {
                    good = false;
                    break;
                }
                if (l + MAX < last) {
                    good = false;
                    break;
                }
                break;
        }
        last = l;
    }
    return good;
}

console.log(safe);
