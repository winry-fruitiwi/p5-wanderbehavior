// noinspection NonAsciiCharacters,JSNonASCIINames

class Vehicle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector(1, 0)
        this.acc = new p5.Vector

        this.maxSpeed = 2
        this.maxForce = 0.1
        this.r = 10
        this.wanderθ = 0
    }

    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.vel.limit(this.maxSpeed)
        this.acc.mult(0)
    }

    applyForce(force) {
        this.acc.add(force)
    }

    show() {
        noStroke()
        fill(0, 0, 100, 30)
        circle(this.pos.x, this.pos.y, this.r*2)
    }

    wander() {
        let wanderPoint = this.vel.copy()
        wanderPoint.setMag(100)
        wanderPoint.add(this.pos)
        fill(0, 80, 80, 100)
        circle(wanderPoint.x, wanderPoint.y, 10)

        let wanderRadius = 50
        noFill()
        stroke(0, 0, 100)
        circle(wanderPoint.x, wanderPoint.y, wanderRadius * 2)
        line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)

        let θ = this.wanderθ + this.vel.heading()
        let x = wanderRadius * cos(θ)
        let y = wanderRadius * sin(θ)
        fill(100, 80, 80)
        noStroke()
        wanderPoint.add(x, y)
        circle(wanderPoint.x, wanderPoint.y, 20)
        stroke(0, 0, 100)
        line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)

        let steer = wanderPoint.sub(this.pos)
        steer.setMag(this.maxForce)
        this.applyForce(steer)
        this.wanderθ += random(-0.3, 0.3)
    }

    edges() {
        // left
        if (this.pos.x < 0) {
            this.pos.x = width
        }

        // right
        else if (this.pos.x > width) {
            this.pos.x = 0
        }

        // top
        else if (this.pos.y < 0) {
            this.pos.y = height
        }

        // bottom
        else if (this.pos.y > height) {
            this.pos.y = 0
        }
    }
}
