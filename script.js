const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particles = [];
const cell = 4;
let columns = 0;
let rows = 0;

function Grid(){
    columns = Math.floor(canvas.width / cell);
    rows = Math.floor(canvas.height / cell);
    grid = Array.from({length: rows}, () => Array(columns).fill(null));
}

let grid = [];
Grid();
let blackHole = null;

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
            p.vy -= Math.random() * .5;
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
    },

    bubble: {
        init(p){
            p.vy = -(Math.random() *.5 +.5);
            p.vx = (Math.random() - .5) * .25;
            p.color = `rgba(${150 + Math.random()*50}, ${180 + Math.random()*50}, 255, ${p.opacity})`;
            p.opacity = Math.min(p.opacity * .5, .6);
        },
        update(p){
            p.vx += Math.sin(p.y * .05) * .02;
            p.vy -= .01;
            p.x += p.vx;
            p.y += p.vy;
            p.size *= 1.005
            if (p.life < 40){
                p.opacity -= .03;
            }
        },
        draw(p){
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI *2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
            ctx.globalAlpha = p.opacity * .05
            ctx.beginPath();
            ctx.arc(p.x - p.size *.3, p.y - p.size * .3, p.size * .3, 0, Math.PI *2);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    },

    water: {
        init(p){
            p.color = `rgb(0, 120, 255)`;
            p.opacity = .9;
        },
        update(p){
            if(p.gridY + 1 < rows && !grid[p.gridY +1][p.gridX]){
                p.gridY++;
                return;
            }
            if (p.gridY + 1 < rows && p.gridX - 1 >= 0 && !grid[p.gridY +1][p.gridX -1]){
                p.gridY++
                p.gridX--;
                return;
            }
            if (p.gridY + 1 <rows && p.gridX +1 < columns && !grid[p.gridY+1][p.gridX+1]){
                p.gridY++;
                p.gridX++;
                return;
            }

            const direction = Math.random() < .5 ? -1 : 1;
            const dx = p.gridX + direction;

            if (dx >= 0 && dx < columns && !grid[p.gridY],[dx]) {
                p.gridX = dx;
                return;
            }
        },
        draw(p){
            
        }
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
    blackHole = {
        x: canvas.width /2,
        y: canvas.height /2,
        size: 20
    };
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

    const set = (id, value, labelId) => {
        document.getElementById(id).value = value;
        if(labelId){
            document.getElementById(labeId).textContent = value;
        }
    };

    set("gravity", gravityV);
    set("wind", windV);
    set("spawn", spawnV);
    set("life", lifeV);
    set("r", redV, "redV");
    set("g", greenV, "greenV");
    set("b", blueV, "blueV");
    set("opacity", opacityV);
    set("size", sizeV);
    document.getElementById("shape").value = "circle";
    colorPreview();
};

class Particle {

    constructor(x, y){
    this.gridX = Math.floor(this.x/ cell);
    this.gridY = Math.floor(this.y/cell);
    this.x = x;
    this.y = y;
    this.size = sizeV;
    this.color = `rgb(${redV}, ${greenV}, ${blueV})`;
    this.life = lifeV;
    this.opacity = opacityV;
    const t = document.getElementById("type").value;
    particleTypes[t].init(this);
    }

    update(){
        this.gridX = Math.floor(this.x/cell);
        this.gridY = Math.floor(this.y/cell);

        if(grid[this.gridY] && grid[this.gridY][this.gridX] === this){
            grid[this.gridY][this.gridX] = null;
        }

        if(this.gridY + 1 < rows && !grid[this.gridY +1][this.gridX]){
            this.gridY++;
        } else if (this.gridY + 1 < rows && this.gridX - 1 >= 0 && !grid[this.gridY +1][this.gridX -1]){
            this.gridY++
            this.gridX--;
        } else if (this.gridY + 1 <rows && this.gridX +1 < columns && !grid[this.gridY+1][this.gridX+1]){
            this.gridY++;
            this.gridX++;
        }

        this.x = this.gridX * cell;
        this.y = this.gridY * cell;
        grid[this.gridY][this.gridX] = this;

        const t = document.getElementById("type").value;
        particleTypes[t].update(this);

        if (this.life <= 0){
            this.opacity -= .02;
        }

        if (this.gridY!== undefined){
            grid[this.gridY][this.gridX] = null;
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
    if (blackHole) {
        ctx.beginPath();
        ctx.arc(blackHole.x, blackHole.y, blackHole.size, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    if (mouse.down) {
        for (let i =0; i < spawnV; i++){
        particles.push(new Particle(mouse.x, mouse.y));
        }
    }

    for (let p of particles) {
        if(blackHole){
            let bx = blackHole.x - p.x;
            let by = blackHole.y - p.y;
            let distance = Math.hypot(bx, by);
            p.x += bx / distance*3;
            p.y += by / distance*3;
            if(distance < blackHole.size) {
                p.opacity = 0;
            }
        }
        p.update();
        p.draw();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].opacity <= 0){
            particles.splice(i, 1);
        }
    }

    if(blackHole && particles.length === 0){
        blackHole = null;
    }

    requestAnimationFrame(animation);
}

animation();