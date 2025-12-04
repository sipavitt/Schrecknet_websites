window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("subscribePopup").style.display = "flex";
    }, 2000);
});

function closePopup() {
    document.getElementById("subscribePopup").style.display = "none";
}
