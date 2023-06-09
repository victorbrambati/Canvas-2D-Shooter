const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, '#f1c40f');
const projectiles = [];
const enemies = [];

function spawnEnemies() {
    setInterval(() => {
        const radiusBaseNumber = 30;
        const radius = Math.random() * (radiusBaseNumber - 4) + 4;

        let x;
        let y;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const color = 'green';


        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity));

    }, 1000)
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    projectiles.forEach(projectile => {
        projectile.update()
    })

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update()

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x,
              projectile.y - enemy.y)
     
              setTimeout(() => {
                if(dist - enemy.radius - projectile.radius < -5){
                    enemies.splice(enemyIndex, 1);
                    projectiles.splice(projectileIndex, 1);
         }
              }, 0)
              
         })
    })

    
}

addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - y, event.clientX - x);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(
        new Projectile(x, y, 5, 'red', velocity)
    )
})

animate();
spawnEnemies();