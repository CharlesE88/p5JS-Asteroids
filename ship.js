/* ****************************************************
 * Feel free to modify the code any way you seem fit. *******************
 * I do ask that you add me the orginal author to the finished project, *
 * this could be in the comments or even a function named after me. *****
 * Author: Charles Eudy *********************************************
 * Date: 7/26/2017      *
 * Language: p5 JS      *
 * Version: 1.01        *
 * Thank you and Enjoy! *
 ************************
 */

// GLOBAL VARIABLES
var ship;
var asteroids = [];
// SETUP FUNCTION
function setup(){
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (var i = 0; i < 5; i++){
        asteroids.push(new Asteroid());
    }   
}
// DRAW FUNCTION
function draw(){
    background(0);
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
    
    for (var i = 0; i < asteroids.length; i++){
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edge();
    }
}
// WHEN KEY IS RELEASED
function keyReleased(){
    ship.setRotation(0);
    ship.boosting(false);
}
// WHEN KEY IS PRESSED
function keyPressed(){
    if(keyCode == RIGHT_ARROW){
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW){
        ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW){
        ship.boosting(true);
    } 
}
// Main ship function
function Ship(){
    this.pos = createVector(width/2,height/2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isBoosting = false;
    
    this.boosting = function(b){
        this.isBoosting = b;
    }
    
// Adds the velocity to the ship as an update function
    this.update = function(){
        if(this.isBoosting){
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }
 // Adds velocity to the ship so that it can move.   
    this.boost = function(){
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
// Renders the ship image on screen    
    this.render = function(){
        push(); // Saves the current translation state
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        noFill();
        stroke(255);
        triangle(-this.r, this.r, this.r ,this.r, 0, -this.r);
        pop(); // Restores the translation state
    }
    
// Makes the ship appear on the opposite side of the screen that you drove off of.
    this.edges = function(){
        if(this.pos.x > width + this.r){
            this.pos.x = -this.r;
        } else if (this.pos.x < - this.r){
            this.pos.x = width + this.r;
        }
        if(this.pos.y > height + this.r){
            this.pos.y = -this.r;
        } else if (this.pos.y < - this.r){
            this.pos.y = height + this.r;
        }
    }
    
// Makes the ship rotate at an angle    
    this.setRotation = function(a){
        this.rotation = a;
    }
// Makes the ship turn    
    this.turn = function(){
        this.heading += this.rotation;
    }
}