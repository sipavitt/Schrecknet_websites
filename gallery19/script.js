const artists = {
  fp: {
    name: "Fabian Perez",
    bio: "Fabian Perez’s work explores solitude, masculinity, and ritualised intimacy. His paintings draw on cinematic lighting and choreographed stillness, positioning the figure as both subject and spectacle.",
    images: 6
  },
  lr: {
    name: "Lola Ravel",
    bio: "Lola Ravel’s paintings engage with absence and presence, often depicting figures caught between gesture and erasure.",
    images: 2
  },
  os: {
    name: "Ophelia Sable",
    bio: "Ophelia Sable’s practice centres on the body as a site of interruption, fragmentation, and withheld authorship.",
    images: 2
  },
  sm: {
    name: "Sabine Montclair",
    bio: "Sabine Montclair works with organic materials and physical processes of decay, exploring devotion, sacrifice, and permanence.",
    images: 2
  },
  zd: {
    name: "Zara Devereaux",
    bio: "Zara Devereaux’s paintings reward prolonged attention, revealing meaning slowly while resisting fixed interpretation.",
    images: 5
  }
};

const modal = document.getElementById("artistModal");
const artistName = document.getElementById("artistName");
const artistBio = document.getElementById("artistBio");
const artistGallery = document.getElementById("artistGallery");
const modalClose = document.getElementById("modalClose");

function openArtist(key){
  const a = artists[key];
  if(!a) return;

  // deliberate delay (gallery-grade pacing)
  setTimeout(() => {
    artistName.textContent = a.name;
    artistBio.textContent = a.bio;

    artistGallery.innerHTML = "";
    for(let i=1;i<=a.images;i++){
      const img = document.createElement("img");
      img.src = `images/${key}-${i}.webp`;
      artistGallery.appendChild(img);
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }, 150);
}

function closeModal(){
  modal.style.display = "none";
  document.body.style.overflow = "";
}

document.querySelectorAll(".artist-card").forEach(card=>{
  card.addEventListener("click",()=>openArtist(card.dataset.artist));
});

modalClose.addEventListener("click",closeModal);
modal.addEventListener("click",e=>{
  if(e.target===modal) closeModal();
});
window.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeModal();
});
