/* ----------------------------------------------
   NAVBAR SCROLL EFFECT
---------------------------------------------- */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 150) {
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
   FADE IN SECTIONS
---------------------------------------------- */
function triggerFadeIns() {
    document.querySelectorAll(".fade-in-up").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
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
    hero.style.backgroundPositionY = `${window.pageYOffset * 0.3}px`;
});

/* ----------------------------------------------
   SIMPLE PARTICLE FIELD
---------------------------------------------- */
const canvas = document.getElementById("molecularCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create drifting particles
let particles = [];
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.28)";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}
animate();
