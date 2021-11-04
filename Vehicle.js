class Vehicle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector
        this.acc = new p5.Vector

        this.maxSpeed = 6
        this.maxForce = 0.4
        this.r = 20
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
}
