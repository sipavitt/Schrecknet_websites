const banner = document.getElementById('cookieBanner');
const accept = document.getElementById('acceptCookies');

if (!localStorage.getItem('cookiesAccepted')) {
  banner.style.display = 'flex';
}

accept.onclick = () => {
  localStorage.setItem('cookiesAccepted', true);
  banner.remove();
};

const modal = document.getElementById('subscribeModal');
document.getElementById('subscribeBtn').onclick = () => {
  modal.style.display = 'flex';
};
document.getElementById('closeModal').onclick = () => {
  modal.style.display = 'none';
};
