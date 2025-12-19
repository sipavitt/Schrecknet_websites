const works = [
  { img: "work01.jpg", title: "Untitled (Red)", year: "2023", medium: "Oil on linen" },
  { img: "work02.jpg", title: "Vessel", year: "2022", medium: "Mixed media" },
  // add up to 8
];

let index = 0;

setInterval(() => {
  index = (index + 1) % works.length;
  document.getElementById("workImage").src = works[index].img;
  document.getElementById("workTitle").innerText = works[index].title;
  document.getElementById("workYear").innerText = works[index].year;
  document.getElementById("workMedium").innerText = works[index].medium;
}, 8000);
