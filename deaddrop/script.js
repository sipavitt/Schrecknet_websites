/* ---------- SQL Injection + Login Logic ---------- */

const ADMIN_CODE = "101";

function isSQLi(input) {
    const lowered = input.toLowerCase().trim();
    return (
        lowered.includes("show *") ||
        lowered.includes("show*") ||
        lowered === "show" ||
        lowered.endsWith("*")
    );
}

function attemptLogin() {
    const input = document.getElementById("adminpass").value.trim();
    const output = document.getElementById("output");

    if (isSQLi(input)) {
        output.textContent =
`ERROR 42601: malformed wildcard in query
Attempting table recovery...

DEAD_DROP.DB
binary_octet | comment
-------------|--------
01100101     | admin override key

WARNING: table metadata corrupted
WARNING: unauthorised query logged
Engine state: DEGRADED`;
        return;
    }

    if (input === ADMIN_CODE) {
        window.location.href = "access.html";
    } else {
        output.textContent = "Incorrect admin number.";
    }
}

function attemptReport() {
    const output = document.getElementById("output");
    output.textContent = "ERROR: This device is not authorised to submit logs.";
}

/* ---------- Theme Toggle Logic ---------- */

function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);

    // Update label text
    const label = document.getElementById("themeLabel");
    if (label) label.textContent = theme === "dark" ? "Dark" : "Light";

    // Update logo
    const logo = document.getElementById("logo");
    if (logo) {
        logo.src = theme === "dark" ? "logo_white.webp" : "logo_black.webp";
    }
}


function toggleTheme() {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    const newTheme = current === "dark" ? "light" : "dark";
    applyTheme(newTheme);
}

// Apply stored theme on load
window.addEventListener("load", () => {
    const saved = localStorage.getItem("theme") || "dark";
    applyTheme(saved);
});
