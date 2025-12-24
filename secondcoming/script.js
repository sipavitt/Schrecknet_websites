const banner = document.getElementById('cookieBanner');
const accept = document.getElementById('acceptCookies');

if (!localStorage.getItem('cookiesAccepted')) {
  banner.style.display = 'flex';
}

accept.onclick = () => {
  localStorage.setItem('cookiesAccepted', true);
  banner.remove();
};
if (localStorage.getItem('newsletterPrompted')) {
  modalTriggered = true;
}
const modal = document.getElementById('subscribeModal');
document.getElementById('subscribeBtn').onclick = () => {
  modal.style.display = 'flex';
};
document.getElementById('closeModal').onclick = () => {
  modal.style.display = 'none';
};
let modalTriggered = false;

window.addEventListener('scroll', () => {
  if (modalTriggered) return;

  const scrollPoint = window.scrollY + window.innerHeight;
  const triggerPoint = document.body.scrollHeight * 0.3;

  if (scrollPoint > triggerPoint) {
    modal.style.display = 'flex';
    modalTriggered = true;
    localStorage.setItem('newsletterPrompted', 'true');
  }
});
