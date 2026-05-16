const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particles = [];

const particleTypes = {

    default: {
        init(p) {},
        update(p) {},
        draw(p) {}
    },

    fire: {
        init(p) {
            p.vx += (Math.random() - 0.5) * 1.2;
            p.vy -= Math.random() *1.5;
            p.color = `rgb(${255}, ${80+ Math.random()* 100}, 0)`;
        },
        update(p) {
            p.size *= .975;
            p.opacity -= 0.025
        },
        draw(p) {}
    },

    smoke: {
        init(p) {
            p.vx += (Math.random() - 0.5) * 0.3;
            p.vy -= Math.random * .5;
            p.color = `rgb(80, 80, 80)`
        },
        update(p){
            p.size *= 1.01
            p.opacity -= 0.005
        },
        draw(p){}
    },

    snow: {
        init(p) {
            p.vx = (Math.random() - .5) * .5;
            p.vy = Math.random() * .5;
            p.color = `rgb(255,255,255)`;
        },
        update(p){
            p.vx += Math.sin(p.y * .01) * .02;
        },
        draw(p) {}
    }
    
};

canvas.width = window.innerWidth - 220;
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
    document.getElementById("gravityV").textContent = gravityV;
};

document.getElementById("size").oninput = e => {
    sizeV = parseInt(e.target.value);
    document.getElementById("sizeV").textContent = sizeV;
};

document.getElementById("spawn").oninput = e => {
    spawnV = parseInt(e.target.value);
    document.getElementById("spawnV").textContent = spawnV;
};

document.getElementById("wind").oninput = e => {
    windV = parseFloat(e.target.value);
    document.getElementById("windV").textContent = windV;
};

document.getElementById("opacity").oninput = e => {
    opacityV = parseFloat(e.target.value);
    document.getElementById("opacityV").textContent = opacityV;
};

document.getElementById("life").oninput = e => {
    lifeV = parseInt(e.target.value);
    document.getElementById("lifeV").textContent = lifeV;
};

document.getElementById("clear").onclick = () => {
    particles = [];
};

document.getElementById("shape").oninput = e => {
    shapeV = e.target.value;
}

document.getElementById("r").oninput = e =>{
    redV = parseInt(e.target.value);
    document.getElementById("redV").textContent = redV;
    colorPreview();
}

document.getElementById("g").oninput = e =>{
    greenV = parseInt(e.target.value);
    document.getElementById("greenV").textContent = greenV;
    colorPreview();
}

document.getElementById("b").oninput = e =>{
    blueV = parseInt(e.target.value);
    document.getElementById("blueV").textContent = blueV;
    colorPreview();
}

document.getElementById("reset").onclick = () => {
    gravityV = 0.5;
    windV = 0;
    spawnV = 3;
    lifeV = 200;
    redV = 0;
    greenV = 0;
    blueV = 0;
    opacityV = 1;
    sizeV = 5;
    shapeV = "circle";

    const set = (id, value) => {
        document.getElementById(id).value = value;
        document.getElementById(id + "V")?.textContent = value;
    }

    set("gravity", gravityV);
    set("wind", windV);
    set("spawn", spawnV);
    set("life", lifeV);
    set("r", redV);
    set("g", greenV);
    set("b", blueV);
    set("opacity", opacityV);
    set("size", sizeV);
    document.getElementById("shape").value = "circle";
    colorPreview();
};

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
    const t = document.getElementById("type)").value;
    particleTypes[t].init(this);
    }

    update(){

        this.vy += gravityV;
        this.vx += windV;
        this.life--;
        this.x += this.vx;
        this.y += this.vy;

        const t = document.getElementById("type").value;
        particleTypes[t].update(this);

        if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size;
            this.vy = 0;
        }

        if (this.life <= 0){
            this.opacity -= .02;
        }

    }

    draw(){
        const t = document.getElementById("type").value;
        particleTypes[t].draw(this);

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

function getCanvasX(e){
    return e.clientX - canvas.getBoundingClientRect().left;
}

function getCanvasY(e){
    return e.clientY - canvas.getBoundingClientRect().top;
}

canvas.addEventListener("mousedown", e=> {
    mouse.down = true;
    mouse.x = getCanvasX(e);
    mouse.y = getCanvasY(e);
});

canvas.addEventListener("mouseup", () => {
    mouse.down = false;
});

canvas.addEventListener("mousemove", e=> {
    mouse.x = getCanvasX(e);
    mouse.y = getCanvasY(e);
});

function colorPreview(){
    document.getElementById("colorPreview").style.background =
    `rgb(${redV}, ${greenV}, ${blueV})`;
}

document.querySelectorAll(".section").forEach(section => {
    section.classList.add("collapsed");

    const arrow = section.querySelector(".arrow");
    arrow.textContent = "▲";

    section.addEventListener("click", () => {
        section.classList.toggle("collapsed");
        arrow.textContent = section.classList.contains("collapsed") ? "▲" : "▼";
    });
});



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