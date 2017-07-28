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

function Asteroid(){
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.r = random(7,50);
    this.total = floor(random(5,15));
    this.offset = [];
    for (var i = 0; i < this.total; i++){
        this.offset[i] = random(-10,10);
    }
    
    this.update = function(){
        this.pos.add(this.vel);
    }
    
    this.render = function(){
        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        
        beginShape();
        for(var i = 0; i < this.total; i++){
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }
    
    this.edge = function(){
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
}