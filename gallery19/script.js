const artists = {
  fp: {
    name: "Fabian Perez",
    bio: "Internationally renowned painter exploring masculinity, solitude, and excess.",
    images: 7
  },
  lr: {
    name: "Lola Ravel",
    bio: "Mixed media artist working with ritual, intimacy, and constraint.",
    images: 2
  },
  os: {
    name: "Ophelia Sable",
    bio: "Photographic work examining erasure and the body.",
    images: 2
  },
  sm: {
    name: "Sabine Montclair",
    bio: "Painter focused on memory, flesh, and distortion.",
    images: 2
  },
  zd: {
    name: "Zara Devereaux",
    bio: "Neo-expressionist works exploring desire and decay.",
    images: 5
  }
};

function openArtist(key) {
  const artist = artists[key];
  document.getElementById("artistName").innerText = artist.name;
  document.getElementById("artistBio").innerText = artist.bio;

  const gallery = document.getElementById("artistGallery");
  gallery.innerHTML = "";

  for (let i = 1; i <= artist.images; i++) {
    const img = document.createElement("img");
    img.src = `/images/${key}-${i}.webp`;
    gallery.appendChild(img);
  }

  document.getElementById("artistModal").style.display = "block";
}

function closeModal() {
  document.getElementById("artistModal").style.display = "none";
}

window.onclick = function(e) {
  if (e.target.classList.contains("modal")) {
    closeModal();
  }
};
