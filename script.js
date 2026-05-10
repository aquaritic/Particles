const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravityV = .5;
let sizeV = 5;
let colorV = "#000000";
let spawnV = 3;
let windV = 0;
let opacityV = 1;
let lifeV = 200;

document.getElementById("gravity").oninput = e => {
    gravityV = parseFloat(e.target.value);
};

document.getElementById("size").oninput = e => {
    sizeV = parseInt(e.target.value);
};

document.getElementById("color").oninput = e => {
    colorV = e.target.value;
};


document.getElementById("spawn").oninput = e => {
    spawnV = parseInt(e.target.value);
};

document.getElementById("wind").oninput = e => {
    windV = parseFloat(e.target.value);
};

document.getElementById("opacity").oninput = e => {
    opacityV = parseFloat(e.target.value);
};

document.getElementById("life").oninput = e => {
    lifeV = parseInt(e.target.value);
};

class Particle {
    constructor(x, y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = sizeV;
    this.color = colorV;
    this.life = lifeV;
    this.opacity = opacityV;
    }
    update(){

        this.vy += gravityV;
        this.vx += windValue + (Math.random() - .5) * randomValue;
        this.life--;
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size;
            this.vy = 0;
        }

        if (this.life <= 0){
            this.opacity -= .02;
        }

    }
    draw(){
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
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
        for (let i =0; i < spawnValue; i++){
        particles.push(new Particle(mouse.x, mouse.y));
        }
    }

    for (let p of particles) {
        p.update();
        p.draw();
    }

    requestAnimationFrame(animation);
}

animation();