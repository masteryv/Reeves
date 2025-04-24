document.addEventListener("DOMContentLoaded", function() {
loginDirectory();
});

function loginDirectory() {


loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", function() {
    window.location.href = "/login";
    console.log("clicked");
});

bookBtn = document.getElementById("bookingBtn");
bookBtn.addEventListener("click", function() {
    window.location.href = "/booking";
    console.log("clicked");
});
}
