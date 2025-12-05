/* ----------------------------------------------
   NAVBAR SCROLL EFFECT
---------------------------------------------- */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 180) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    triggerFadeIns();
});

/* ----------------------------------------------
   MOBILE MENU
---------------------------------------------- */
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

/* ----------------------------------------------
   FADE-IN SECTIONS
---------------------------------------------- */
function triggerFadeIns() {
    document.querySelectorAll(".fade-in-up").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
}
triggerFadeIns();

/* ----------------------------------------------
   TRUE PARALLAX
---------------------------------------------- */
const hero = document.querySelector('.hero');
window.addEventListener("scroll", () => {
    let offset = window.pageYOffset * 0.3;
    hero.style.backgroundPositionY = `${offset}px`;
});

/* ----------------------------------------------
   MOLECULAR ANIMATION
---------------------------------------------- */
const canvas = document.getElementById("molecularCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let nodes = [];
let nodeActive = false;

for (let i = 0; i < 40; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    });
}

for (let i = 0; i < 12; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 3
    });
}

canvas.addEventListener("mousemove", activateNodes);
window.addEventListener("scroll", () => {
    if (window.scrollY < window.innerHeight * 0.8) activateNodes();
});

function activateNodes() {
    nodeActive = true;
    clearTimeout(window.nodeTimeout);
    window.nodeTimeout = setTimeout(() => nodeActive = false, 6000);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Particles
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
    });

    // Nodes
    if (nodeActive) {
        nodes.forEach(n1 => {
            ctx.beginPath();
            ctx.arc(n1.x, n1.y, n1.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.55)";
            ctx.fill();

            nodes.forEach(n2 => {
                let dx = n1.x - n2.x, dy = n1.y - n2.y;
                let dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.strokeStyle = "rgba(255,255,255,0.15)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }

    requestAnimationFrame(animate);
}
animate();
