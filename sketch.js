/*
@author Winry
@date 2021-11-04

code plan for the future:
    create Vehicle class
    make a wander point
    make wanderRadius circle, add point in the dot

 */
let font, vehicle

function preload() {
    font = loadFont('data/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    vehicle = new Vehicle(width/2, height/2)
}

function draw() {
    background(234, 34, 24)

    vehicle.show()
    vehicle.edges()
    vehicle.update()
    vehicle.wander()
}

function mousePressed() {
    noLoop()
}
