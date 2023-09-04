//! === ADD HEADER STYLES ON SCROLL ===
const headerScroll = () => {
  const headerElement = document.querySelector(".header");
  this.scrollY >= 30
    ? headerElement.classList.add("active")
    : headerElement.classList.remove("active");
};
window.addEventListener("scroll", headerScroll);
//! === OPEN AND CLOSE THE MENU ON HAMBURGER ICON CLICK ===
const menuToggler = document.querySelector("#menu-toggler");
const navbarMenu = document.querySelector(".navbar__menu");
const hamburger = document.querySelector(".menu-btn__burger");

const toggleMenu = () => {
  navbarMenu.classList.toggle("active");
  hamburger.classList.toggle("close");
};
menuToggler.addEventListener("click", toggleMenu);

// --- CLOSE MENU WHEN NAV-LINKS ARE CLICKED ---
const linksToggleMenu = (e) => {
  if (e.target.classList.contains("navbar__list--link"))
    navbarMenu.classList.remove("active");
};
window.addEventListener("click", linksToggleMenu);

// --- CLOSE MENU WHEN NAV-LINKS ARE CLICKED ---
const hamburgerToggleMenu = (e) => {
  if (e.target.classList.contains("navbar__list--link"))
    hamburger.classList.remove("close");
};
window.addEventListener("click", hamburgerToggleMenu);

// Sticky Navbar
const header = document.querySelector(".header");
const sticky = header.offsetTop;
window.onscroll = function () {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

// Add/Remove active class from Nav Link
const activeNav = document.querySelectorAll(".navbar__list--link");
activeNav.forEach((link) => {
  link.addEventListener("click", function () {
    activeNav.forEach((item) => item.classList.remove("active-link"));
    this.classList.add("active-link");
  });
});


// Close lightbox image on click page

const lightBoxClose = document.querySelector('.lightbox-close');

const lightsToggler = () => {
    lightBoxClose.click();
};
window.addEventListener("click", lightsToggler);



// !SCROLL REVEAL
const sr = ScrollReveal({
  distance: "50px",
  duration: 1500,
  easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
});

sr.reveal(`.section__title`, { origin: "left", interval: 150 });
sr.reveal(`.projects__content, .section__description`, {
  origin: "right",
  interval: 250,
});

sr.reveal(`.home,.box`, {
  origin: "top",
  interval: 150,
});


const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = ` <span class="success">Message Sent successfully!</span>`;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});