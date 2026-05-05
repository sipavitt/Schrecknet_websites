const ADMIN_CODE = "101";

/* ---------- Detect SQL Injection ---------- */
function isSQLi(input) {
    const lowered = input.toLowerCase().trim();

    // Must contain a quote to "break" the query
    if (!lowered.includes("'")) return false;

    // Must contain something that looks like a logical truth
    const logicPatterns = [
        "or 1=1",
        "or true",
        "or 'a'='a",
        "or 2>1",
        "or 1",
        "or"
    ];

    return logicPatterns.some(pattern => lowered.includes(pattern));
}

/* ---------- Login Attempt ---------- */
function attemptLogin() {
    const input = document.getElementById("adminpass").value.trim();
    const output = document.getElementById("output");

    // SQLi path
    if (isSQLi(input)) {
        output.textContent =
`ERROR 42601: syntax error at or near "'"
QUERY FAILED — attempting recovery...

DEAD_DROP.DB / CONFIG TABLE
config_id | binary_octet | comment
-------------------------------------
0001      | 01100101     | admin override key

WARNING: improper query structure detected
WARNING: unauthorised logic execution
Engine state: DEGRADED`;

        return;
    }

    // Correct admin code
    if (input === ADMIN_CODE) {
        window.location.href = "access.html";
        return;
    }

    // Normal failure
    output.textContent = "Incorrect admin number.";
}

/* ---------- Fake Report Submission ---------- */
function attemptReport() {
    const output = document.getElementById("output");
    output.textContent = "ERROR: This device is not authorised to submit logs.";
}

/* ---------- Theme Logic (unchanged) ---------- */

function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);

    const label = document.getElementById("themeLabel");
    if (label) label.textContent = theme === "dark" ? "Dark" : "Light";

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

window.addEventListener("load", () => {
    const saved = localStorage.getItem("theme") || "dark";
    applyTheme(saved);
});
