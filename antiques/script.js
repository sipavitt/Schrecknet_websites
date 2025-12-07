/* ========== FADE-IN OBSERVER ========== */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});

document.querySelectorAll('.fade-in').forEach(elem => observer.observe(elem));

/* ========== LIGHTBOX ========== */

const LIGHTBOX = document.createElement('div');
LIGHTBOX.id = 'lightbox';
document.body.appendChild(LIGHTBOX);

const IMGS = document.querySelectorAll('.gallery-grid img');
IMGS.forEach(img => {
  img.addEventListener('click', e => {
    LIGHTBOX.style.display = 'flex';
    LIGHTBOX.innerHTML = `<img src="${img.src}" alt="">`;
  });
});

LIGHTBOX.addEventListener('click', () => {
  LIGHTBOX.style.display = 'none';
});

