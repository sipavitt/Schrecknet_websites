// Cookie banner
const banner = document.getElementById('cookieBanner');
const accept = document.getElementById('acceptCookies');

if (!localStorage.getItem('cookiesAccepted')) {
  banner.style.display = 'block';
}

accept.onclick = () => {
  localStorage.setItem('cookiesAccepted', true);
  banner.style.display = 'none';
};

// Subscribe modal
const modal = document.getElementById('subscribeModal');
document.getElementById('subscribeBtn').onclick = () => {
  modal.style.display = 'block';
};
document.getElementById('closeModal').onclick = () => {
  modal.style.display = 'none';
};
