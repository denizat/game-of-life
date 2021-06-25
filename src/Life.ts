type Dead = 0
type Alive = 1
export type Land = Array<Array<Dead | Alive>>

class World {
    // Copies a planet by value


}

export class Life {

    land: Land = []

    constructor(max: number) {
        for (let i = 0; i < max; i++) {
            this.land.push([])
            for (let k = 0; k < max; k++) {
                this.land[i].push(0)
            }
        }
    }
    neighbors(x: number, y: number) {
        let alive = 0
        for (let i = x - 1; i < x + 2; i++) {
            if (typeof this.land[i] !== "undefined") {
                for (let k = y - 1; k < y + 2; k++) {
                    if (typeof this.land[i][k] !== "undefined" && this.land[i][k] === 1) {
                        alive += 1
                    }
                }
            }
        }
        if (typeof this.land[x] !== "undefined" && typeof this.land[x][y] !== "undefined" && this.land[x][y] === 1) {
            alive -= 1
        }
        return alive
    }

    randomize() {
        for (let i = 0; i < this.land.length; i++) {
            for (let k = 0; k < this.land[i].length; k++) {
                if (Math.random() > .7) {
                    this.land[i][k] = 1
                }

            }

        }
    }
    copy() {
        let out: Land = []
        this.land.forEach((line, x) => {
            out.push([])
            line.forEach((thing) => {
                out[x].push(thing)
            })

        });
        return out
    }
    iterate() {
        let nextState = this.copy()
        this.land.forEach((line, x) => {
            line.forEach((thing, y) => {
                if (thing === 1) {
                    let n = this.neighbors(x, y)
                    if (!(n === 2 || n === 3)) {
                        nextState[x][y] = 0
                    }
                } else {
                    if (this.neighbors(x, y) === 3) {
                        nextState[x][y] = 1
                    }
                }
            })
        })
        this.land = nextState
    }

}
