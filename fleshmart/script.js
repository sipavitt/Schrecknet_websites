// CSV-driven pagination illusion for Fleshmart
const ITEMS_PER_PAGE = 9;
const IMAGE_POOL = 20; // number of images available in /images


async function loadPage(page){
const res = await fetch('items.csv');
const text = await res.text();
const rows = text.trim().split('\n').slice(1).map(r=>r.split(','));


// shuffle rows for illusion of scale
rows.sort(()=>Math.random()-0.5);
const pageItems = rows.slice(0, ITEMS_PER_PAGE);


const grid = document.getElementById('grid');
grid.innerHTML = '';


pageItems.forEach(r=>{
const [id,category,age,cause,condition,fulfilment,btc,status] = r;
const imgIndex = Math.floor(Math.random()*IMAGE_POOL)+1;
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = `
<img src="images/item-${imgIndex}.jpg" alt="${id}" />
<h4>${id}</h4>
<p>${category}</p>
<p class="meta">${age}</p>
<p class="meta">Cause: ${cause}</p>
<p class="meta">Condition: ${condition}</p>
<p class="meta">Fulfilment: ${fulfilment}</p>
<div class="price">${btc} BTC</div>
<div class="status">Status: ${status}</div>`;
grid.appendChild(card);
});
}


function initPagination(){
const pager = document.getElementById('pager');
for(let i=1;i<=12;i++){
const a=document.createElement('a');
a.textContent=i;
a.onclick=()=>loadPage(i);
pager.appendChild(a);
}
loadPage(1);
}
