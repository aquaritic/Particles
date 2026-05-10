const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particles = [];

canvas.width = window.innerWidth;
canvas.height = canvas.innerHeight;

class Particle {
    constructor(x, y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 5;
    this.color = "black";
    }
    update(){

        this.vy += 0.5;
        this.x += this.vx;
        this.y += this.vy;

        if (this.y = this.size > canvas.height) {
            this.y = canvas.height - this.size;
            this.vy = 0;
        }

        if (this.y + this.size < canvas.height) {
            let below = particles.find(p =>
                p.x === this.x && p.y === this.y + this.size
            );
        }

        if(below) {
            let downLeft = particles.find(p =>
                p.x === this.x - this.size && p.y === this.y + this.size
            );

            let downRight = particles.find(p =>
                p.x === this.x + this.size && p.y === this.y + this.size
            );

        }

        if(!downLeft){
            this.x -= this.size;
        } else {
            this.x += this.size;
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
};

let mouse = {
    x: 0,
    y: 0,
    down: false
};

canvas.addEventListener("mousedown", e=> {
    mouse.down = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

canvas.addEventListener("mouseup", () => {
    mouse.down = false;
});

canvas.addEventListener("mousemove", e=> {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouse.down) {
        particles.push(new Particle(mouse.x, mouse.y));
    }

    for (let p of particles) {
        p.update();
        p.draw();
    }

    requestAnimationFrame(loop);
}

animation();