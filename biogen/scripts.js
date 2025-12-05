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
   MOLECULAR ANIMATION (Stable Linked Nodes)
---------------------------------------------- */
const canvas = document.getElementById("molecularCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Nodes arranged in circular pattern
let nodes = [];
const NODE_COUNT = 14;

for (let i = 0; i < NODE_COUNT; i++) {
    const angle = (i / NODE_COUNT) * Math.PI * 2;
    const radius = canvas.width * 0.25;
    const cx = canvas.width / 2 + Math.cos(angle) * radius;
    const cy = canvas.height / 2 + Math.sin(angle) * radius;

    nodes.push({
        baseX: cx,
        baseY: cy,
        x: cx,
        y: cy,
        r: 3,
        offset: Math.random() * 1000
    });
}

// Background particles
let particles = [];
for (let i = 0; i < 40; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
    });

    // Node movement
    nodes.forEach(n => {
        n.x = n.baseX + Math.sin((Date.now() + n.offset) * 0.001) * 6;
        n.y = n.baseY + Math.cos((Date.now() + n.offset) * 0.001) * 6;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();
    });

    // Node linking
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 240) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = "rgba(255,255,255,0.15)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();
