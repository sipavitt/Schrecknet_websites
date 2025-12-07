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

function toggleTheme() {
    const body = document.body;
    const newTheme = body.classList.contains("dark") ? "light" : "dark";
    body.className = newTheme;
    localStorage.setItem("theme", newTheme);
}

// Apply saved theme
window.addEventListener("load", () => {
    const saved = localStorage.getItem("theme");
    if (saved) document.body.className = saved;
});
