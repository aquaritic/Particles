const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravityV = .5;
let sizeV = 5;
let colorV = "#000000";
let spawnV = 3;
let windV = 0;
let opacityV = 1;
let lifeV = 200;
let shapeV = "circle";
let redV = 0;
let greenV = 0;
let blueV = 0;

document.getElementById("gravity").oninput = e => {
    gravityV = parseFloat(e.target.value);
    document.getElementById(gravityV).textContent = gravityV;
};

document.getElementById("size").oninput = e => {
    sizeV = parseInt(e.target.value);
    document.getElementById(sizeV).textContent = sizeV;
};

document.getElementById("spawn").oninput = e => {
    spawnV = parseInt(e.target.value);
    document.getElementById(spawnV).textContent = spawnV;
};

document.getElementById("wind").oninput = e => {
    windV = parseFloat(e.target.value);
    document.getElementById(windV).textContent = windV;
};

document.getElementById("opacity").oninput = e => {
    opacityV = parseFloat(e.target.value);
    document.getElementById(opacityV).textContent = opacityV;
};

document.getElementById("life").oninput = e => {
    lifeV = parseInt(e.target.value);
    document.getElementById(lifeV).textContent = lifeV;
};

document.getElementById("clear").onclick = () => {
    particles = [];
};

document.getElementById("shape").oninput = e => {
    shapeV = e.target.value;
}

document.getElementById("redV").oninput = e =>{
    redV = parseInt(e.target.value);
    document.getElementById("redV").textContent = redV;
    colorPreview();
}

document.getElementById("greenV").oninput = e =>{
    greenV = parseInt(e.target.value);
    document.getElementById("greenV").textContent = greenV;
    colorPreview();
}

document.getElementById("blueV").oninput = e =>{
    blueValue = parseInt(e.target.value);
    document.getElementById("blueV").textContent = blueV;
    colorPreview();
}

class Particle {

    constructor(x, y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = sizeV;
    this.color = `rgb(${redV}, ${greenV}, ${blueV})`;
    this.life = lifeV;
    this.opacity = opacityV;
    }

    update(){

        this.vy += gravityV;
        this.vx += windV;
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
        if (shapeV === "circle") {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
            ctx.fill();
        } else if (shapeV === "square"){
            ctx.fillRect(this.x, this.y, this.size, this.size);
        } else if (shapeV === "triangle"){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.closePath();
            ctx.fill();
        }

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
    mouse.x = e.clientX - 220;
    mouse.y = e.clientY;
});

canvas.addEventListener("mouseup", () => {
    mouse.down = false;
});

canvas.addEventListener("mousemove", e=> {
    mouse.x = e.clientX - 220;
    mouse.y = e.clientY;
});

function colorPreview(){
    document.getElementById("colorPreview").style.background =
    `rgb(${redV}, ${greenV}, ${blueV})`;
}

function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouse.down) {
        for (let i =0; i < spawnV; i++){
        particles.push(new Particle(mouse.x, mouse.y));
        }
    }

    for (let p of particles) {
        p.update();
        p.draw();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].opacity <= 0){
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animation);
}

animation();