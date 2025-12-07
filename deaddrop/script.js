/* 
   DEAD DROP SYSTEM — FUNCTIONAL CORE
   (players rarely check external JS files)
*/

// ADMIN NUMBER required after SQLi dump
const ADMIN_CODE = "101";

// Detects SQLi-like input
function isSQLi(input) {
    const lowered = input.toLowerCase().trim();
    return (
        lowered.includes("show *") ||
        lowered.includes("show*") ||
        lowered === "show" ||
        lowered === "*" ||
        lowered.endsWith("*") 
    );
}

// Handle normal + SQLi login flow
function attemptLogin() {
    const input = document.getElementById("adminpass").value.trim();

    if (!input) return;

    // Handle SQLi detection
    if (isSQLi(input)) {
        triggerSQLiBreak();
        return;
    }

    // Handle proper admin login
    if (input === ADMIN_CODE) {
        window.location.href = "access.html";
    } else {
        window.location.href = "failed.html";
    }
}


// SQLi PAGE-BREAK FUNCTION
function triggerSQLiBreak() {

    // Replace entire HTML body with the SQL-style dump
    document.body.innerHTML = `
<pre style="color:#0f0; background:#000; padding:40px; font-size:16px; white-space:pre-wrap;">

> SHOW *

ERROR 42601: malformed wildcard in query
Attempting table recovery...

===========================================================
==                DEAD_DROP.DB / CONFIG TABLE            ==
===========================================================

config_id | binary_octet | comment
---------------------------------------------
0001      | 01100101     | (admin override key)
---------------------------------------------

WARNING: table metadata corrupted
WARNING: unauthorised query logged
Engine state: DEGRADED
Integrity check: FAILED

-----------------------------------------------------------
   SYSTEM NOTE:
   To restore elevated access, operator must supply
   the decimal value of binary_octet[0001].
-----------------------------------------------------------

RETURN TO PROMPT:
</pre>

<div style="text-align:center; margin-top:-20px;">
    <input id="admin_retry" style="
        width:300px;
        height:50px;
        font-size:22px;
        background:#111;
        border:1px solid #333;
        color:#0f0;
        padding-left:10px;">
    <button onclick="retryLogin()" style="
        background:#0f0;
        border:none;
        padding:10px 20px;
        margin-left:10px;
        font-size:20px;
        cursor:pointer;
        color:#000;
        border-radius:6px;">
        ENTER
    </button>
</div>
`;
}


// Retry login AFTER SQLi break
function retryLogin() {
    const val = document.getElementById("admin_retry").value.trim();

    if (val === ADMIN_CODE) {
        window.location.href = "access.html";
    } else {
        alert("ERROR: Invalid integer. Engine remains degraded.");
    }
}
