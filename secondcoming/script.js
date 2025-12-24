// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  // ----- Mobile nav -----
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close mobile nav after clicking a link
  siteNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ----- Cookie banner -----
  const banner = document.getElementById('cookieBanner');
  const accept = document.getElementById('acceptCookies');

  if (!localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'flex';
  }

  accept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.remove();
  });

  // ----- Newsletter modal (scroll attack) -----
  const modal = document.getElementById('subscribeModal');
  const closeModal = document.getElementById('closeModal');

  let modalTriggered = localStorage.getItem('newsletterPrompted') === 'true';

  function openModal() {
    modal.style.display = 'flex';
    modalTriggered = true;
    localStorage.setItem('newsletterPrompted', 'true');
  }

  function hideModal() {
    modal.style.display = 'none';
  }

  // Close button
  closeModal.addEventListener('click', hideModal);

  // Click outside content closes
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') hideModal();
  });

  // Trigger at ~30% scroll (once)
  window.addEventListener('scroll', () => {
    if (modalTriggered) return;

    const scrollPoint = window.scrollY + window.innerHeight;
    const triggerPoint = document.body.scrollHeight * 0.3;

    if (scrollPoint >= triggerPoint) {
      openModal();
    }
  }, { passive: true });

});
