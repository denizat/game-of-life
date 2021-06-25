type Dead = 0
type Alive = 1
export type Planet = Array<Array<Dead | Alive>>

class World {
    land: Planet = []
    constructor(max: number) {
        for (let i = 0; i < max; i++) {
            this.land.push([])
            for (let k = 0; k < max; k++) {
                this.land[i].push(0)
            }
        }
    }

    showLand() {
        let out = ""
        this.land.forEach((line) => {
            out += line.join(" ") + "=\n"
        })
        console.log(out)
    }

    // Copies a planet by value
    copy() {
        let out: Planet = []
        this.land.forEach((line, x) => {
            out.push([])
            line.forEach((thing) => {
                out[x].push(thing)
            })

        });
        return out
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

}

export class Life {

    world: World

    constructor(max: number) {
        this.world = new World(max)
    }
    addPerimeter(p: Planet): void {
        // Add a line of zeros to top and bottom
        p.forEach(l => {
            l.unshift(0)
            l.push(0)
        })
        // Add line of zeros to sides
        let line = p[0]
        line.forEach(i => i = 0)
        p.unshift(line)
        p.push(line)
    }
    removePerimeter(p: Planet): void {
        // Cut off first column
        let cut = true
        p[0].forEach(i => {
            if (i === 1) {
                cut = false
            }
        })
        if (cut) {
            p.shift()
        }
        // Cut off last column
        cut = true
        p[p.length - 1].forEach(i => {
            if (i === 1) {
                cut = false
            }
        })
        if (cut) {
            p.pop()
        }
        // // Cut off top and bottom
        // let cutTop = true
        // let cutBottom = true
        // for (let i = 0; i < p.length; i++) {
        //     if (p[i][0] === 1) {
        //         cutTop = false
        //     }
        //     if (p[i][p[i].length - 1] === 1) {
        //         cutBottom = false
        //     }
        // }
        // if (cutTop) {
        //     for (let i = 0; i < p.length; i++) {
        //         p[i].shift()
        //     }
        // }
        // if (cutBottom) {
        //     for (let i = 0; i < p.length; i++) {
        //         p[i].pop()
        //     }
        // }
    }
    iterate() {
        let nextState = this.world.copy()
        // this.addPerimeter(nextState)
        this.world.land.forEach((line, x) => {
            line.forEach((thing, y) => {
                // Thing is alive
                if (thing === 1) {
                    let n = this.world.neighbors(x, y)
                    if (!(n === 2 || n === 3)) {
                        nextState[x][y] = 0
                    }
                } else {
                    if (this.world.neighbors(x, y) === 3) {
                        nextState[x][y] = 1
                    }
                }
            })
            this.showWorld()
        })
        // this.removePerimeter(nextState)
        this.world.land = nextState
    }

    showWorld() {
        this.world.showLand()
    }

    randomize() {
        this.world.randomize()
    }
}
