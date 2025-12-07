// Admin code revealed through SQL dump (binary 01100101 → 101)
const ADMIN_CODE = "101";

// Detect lightweight SQL injection
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

    // Trigger SQL injection behaviour
    if (isSQLi(input)) {
        output.textContent =
`ERROR 42601: malformed wildcard in query
Attempting table recovery...

DEAD_DROP.DB / CONFIG TABLE
config_id | binary_octet | comment
-------------------------------------
0001      | 01100101     | admin override key

WARNING: table metadata corrupted
WARNING: unauthorised query logged
Engine state: DEGRADED`;

        return; 
    }

    // Correct admin login
    if (input === ADMIN_CODE) {
        window.location.href = "access.html";
    } else {
        output.textContent = "Incorrect admin number.";
    }
}
