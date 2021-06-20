function p(s) {
    console.log(s)
}

type Dead = 0 | undefined
type Alive = 1
type Planet = Array<Array<Dead | Alive>>

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
            out += line.join(" ") + "\n"
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

    neighbors(x, y) {
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

class Life {

    world: World

    constructor(max: number) {
        this.world = new World(max)
    }

    iterate() {
        let nextState = this.world.copy()
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
        this.world.land = nextState
    }

    showWorld() {
        this.world.showLand()
    }

    randomize() {
        this.world.randomize()
    }
}

let a = new Life(10)
a.randomize()

let t = () => setTimeout(() => {
    a.iterate()
    t()
}, 150)

t()