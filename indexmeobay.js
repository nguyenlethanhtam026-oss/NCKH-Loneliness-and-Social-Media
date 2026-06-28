// ================= FOOTER ANIMATION =================

function animateFooter(){

const footer = document.querySelector(".footer");

    if(!footer) return;

    const footerTop = footer.getBoundingClientRect().top;

    const windowHeight = window.innerHeight;

    if(footerTop < windowHeight - 100){

        footer.classList.add("show");

    }

}

window.addEventListener("load", animateFooter);

window.addEventListener("scroll", animateFooter);

window.addEventListener("resize", animateFooter);