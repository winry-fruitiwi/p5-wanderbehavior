// noinspection NonAsciiCharacters,JSNonASCIINames
// this time around doesn't have any comments, but my next time will!

class Vehicle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector

        this.maxSpeed = 2
        this.maxForce = 0.1
        this.r = 6
        this.wanderθ = 0

        this.currentPath = []
        this.paths = [this.currentPath]
        this.allPositions = []
    }

    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.vel.limit(this.maxSpeed)
        this.acc.mult(0)

        // this.currentPath.push(this.pos.copy())
    }

    applyForce(force) {
        this.acc.add(force)
    }

    show() {
        noStroke()
        fill(0, 0, 100, 60)
        // circle(this.pos.x, this.pos.y, this.r*2)
        // Nines hack bot primitive: single triangle, no squares
        push()

        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0)

        pop()

        stroke(0, 0, 100, 50)
        noFill()

        for (let path of this.paths) {
            beginShape()
            for (let p of path) {
                vertex(p.x, p.y)
            }
            endShape()
        }
    }

    wander() {
        let wanderPoint = this.vel.copy()
        wanderPoint.setMag(100)
        wanderPoint.add(this.pos)
        fill(0, 80, 80, 100)
        // circle(wanderPoint.x, wanderPoint.y, 10)

        let wanderRadius = 50
        noFill()
        stroke(0, 0, 100)
        // circle(wanderPoint.x, wanderPoint.y, wanderRadius * 2)
        // line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)

        let θ = this.wanderθ + this.vel.heading()
        let x = wanderRadius * cos(θ)
        let y = wanderRadius * sin(θ)
        fill(100, 80, 80)
        noStroke()
        wanderPoint.add(x, y)
        // circle(wanderPoint.x, wanderPoint.y, 20)
        stroke(0, 0, 100)
        // line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)

        let steer = wanderPoint.sub(this.pos)
        steer.setMag(this.maxForce)
        this.applyForce(steer)

        let DISPLACEMENT_RANGE = 0.3
        this.wanderθ += random(-DISPLACEMENT_RANGE, DISPLACEMENT_RANGE)
        // this.wanderθ += noise(this.pos.x, this.pos.y) // random experiments
    }

    edges() {
        let hitEdge = false

        // left
        if (this.pos.x < 0) {
            this.pos.x = width
            hitEdge = true
        }

        // right
        else if (this.pos.x > width) {
            this.pos.x = 0
            hitEdge = true
        }

        // top
        else if (this.pos.y < 0) {
            this.pos.y = height
            hitEdge = true
        }

        // bottom
        else if (this.pos.y > height) {
            this.pos.y = 0
            hitEdge = true
        }

        if (hitEdge) {
            this.currentPath = []
            this.paths.push(this.currentPath)
        }
    }
}
