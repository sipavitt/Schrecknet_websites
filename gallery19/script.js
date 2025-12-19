const artists = {
  fp: {
    name: "Fabian Perez",
    bio: "Fabian Perez’s work explores solitude, masculinity, and ritualised intimacy. His paintings draw on cinematic lighting and choreographed stillness, positioning the figure as both subject and spectacle.",
    images: 6 // per your request: drop last image
  },
  lr: {
    name: "Lola Ravel",
    bio: "Lola Ravel’s paintings engage with absence and presence, often depicting figures caught between gesture and erasure, and the quiet pressure of rooms that feel occupied even when empty.",
    images: 2
  },
  os: {
    name: "Ophelia Sable",
    bio: "Ophelia Sable’s practice centres on the body as a site of interruption. Figures are fragmented, obscured, or partially withheld, reflecting an ongoing concern with trauma, authorship, and the ethics of representation.",
    images: 2
  },
  sm: {
    name: "Sabine Montclair",
    bio: "Sabine Montclair works with organic materials and physical processes of decay and preservation. Her paintings interrogate devotion, sacrifice, and the cost of permanence.",
    images: 2
  },
  zd: {
    name: "Zara Devereaux",
    bio: "Zara Devereaux’s paintings operate at the threshold of legibility. Details emerge slowly on prolonged viewing, rewarding attentiveness while resisting fixed interpretation.",
    images: 5
  }
};

const modal = document.getElementById("artistModal");
const modalClose = document.getElementById("modalClose");
const artistName = document.getElementById("artistName");
const artistBio = document.getElementById("artistBio");
const artistGallery = document.getElementById("artistGallery");

/* Deliberate gallery-grade pacing */
const MODAL_DELAY_MS = 150;

function openArtist(key) {
  const a = artists[key];
  if (!a) return;

  // Optional: prevent double-open spam
  if (modal.style.display === "block") return;

  setTimeout(() => {
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
  }, MODAL_DELAY_MS);
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Wire up artist cards */
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
