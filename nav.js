const nav = document.querySelector(".nav-links");
const ham = document.querySelector(".hamburger");

ham.addEventListener("click", () => {
    nav.classList.toggle("active");
    ham.classList.toggle("active");
});