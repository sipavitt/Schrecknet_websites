/* -------------------------------------------------------
   Fake-but-believable interactions:
   - Cookie banner (stored in localStorage)
   - Generic modal open/close (location dropdown)
-------------------------------------------------------- */

(function () {
  const LS_COOKIE_KEY = "cmhh_cookie_choice_v1";

  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("cookieAcceptBtn");
  const settingsBtn = document.getElementById("cookieSettingsBtn");

  function showBannerIfNeeded() {
    const saved = localStorage.getItem(LS_COOKIE_KEY);
    if (!saved && banner) banner.classList.add("is-visible");
  }

  function hideBanner() {
    if (banner) banner.classList.remove("is-visible");
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem(LS_COOKIE_KEY, JSON.stringify({ choice: "accept_all", ts: Date.now() }));
      hideBanner();
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      localStorage.setItem(LS_COOKIE_KEY, JSON.stringify({ choice: "preferences_set", ts: Date.now() }));
      hideBanner();
      // Optional: open a settings modal later if you want
      // For now: tiny “reality slip” nudge (subtle and removable)
      // eslint-disable-next-line no-console
      console.log("Preferences saved.");
    });
  }

  // Modal handling
  const openers = document.querySelectorAll("[data-modal-open]");
  const closers = document.querySelectorAll("[data-modal-close]");

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");

    // trap focus lightly (not perfect; good enough for ARG)
    const focusable = m.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (focusable) focusable.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal-open");
      openModal(id);
    });
  });

  closers.forEach((el) => {
    el.addEventListener("click", () => {
      const modal = el.closest(".modal");
      closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const open = document.querySelector(".modal.is-open");
      if (open) closeModal(open);
    }
  });

  // Kick off
  showBannerIfNeeded();
})();
