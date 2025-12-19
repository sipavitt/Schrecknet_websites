const artists = {
  fp: {
    name: "Fabian Perez",
    bio: "Painter of nocturnal intimacy — glamour edged with violence, tenderness, and restraint.",
    images: 7
  },
  lr: {
    name: "Lola Ravel",
    bio: "Mixed media works exploring private ritual, curated vulnerability, and controlled exposure.",
    images: 2
  },
  os: {
    name: "Ophelia Sable",
    bio: "Photographic studies of erasure and presence, where the subject is always half-withheld.",
    images: 2
  },
  sm: {
    name: "Sabine Montclair",
    bio: "Painter working with memory, flesh, and distortion — intimacy rendered as architecture.",
    images: 2
  },
  zd: {
    name: "Zara Devereaux",
    bio: "Expressionist works exploring desire and decay, glamour turned feral at the edges.",
    images: 5
  }
};

const modal = document.getElementById("artistModal");
const modalClose = document.getElementById("modalClose");
const artistName = document.getElementById("artistName");
const artistBio = document.getElementById("artistBio");
const artistGallery = document.getElementById("artistGallery");

/* Artist modal */
function openArtist(key) {
  const a = artists[key];
  if (!a) return;

  artistName.textContent = a.name;
  artistBio.textContent = a.bio;

  artistGallery.innerHTML = "";
  for (let i = 1; i <= a.images; i++) {
    const img = document.createElement("img");
    img.src = `images/${key}-${i}.webp`;
    img.alt = `${a.name} work ${i}`;
    artistGallery.appendChild(img);
  }

  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Bind artist cards */
document.querySelectorAll(".artist-card").forEach(btn => {
  btn.addEventListener("click", () => openArtist(btn.dataset.artist));
});

/* Close interactions */
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") closeModal();
});

/* Mobile nav */
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("[data-nav-links]");

toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
