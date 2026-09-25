/* =========================================================
   RSK'S PORTFOLIO
   INTERACTIVE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   SELECT ELEMENTS
========================================================= */

const body = document.body;

const header = document.getElementById("header");

const navbar = document.getElementById("navbar");

const menuBtn = document.getElementById("menuBtn");

const themeBtn = document.getElementById("themeBtn");

const themeIcon = document.getElementById("themeIcon");

const scrollTopBtn = document.getElementById("scrollTop");

const preloader = document.getElementById("preloader");

const toast = document.getElementById("toast");

const toastTitle = document.getElementById("toastTitle");

const toastMessage = document.getElementById("toastMessage");

const contactForm = document.getElementById("contactForm");

const projectModal = document.getElementById("projectModal");

const serviceModal = document.getElementById("serviceModal");


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 1400);

});


/* =========================================================
   MOBILE MENU
========================================================= */

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");

});


/* Close mobile menu after clicking navigation */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

    });

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const savedTheme =
    localStorage.getItem("rsk-theme");


if (savedTheme === "dark") {

    body.classList.add("dark");

    themeIcon.textContent = "☾";

}


themeBtn.addEventListener("click", () => {

    body.classList.toggle("dark");

    const darkMode =
        body.classList.contains("dark");


    localStorage.setItem(
        "rsk-theme",
        darkMode ? "dark" : "light"
    );


    themeIcon.textContent =
        darkMode ? "☾" : "☀";


    showToast(
        "Theme changed",
        darkMode
            ? "Dark mode activated."
            : "Light mode activated."
    );

});


/* =========================================================
   TOAST SYSTEM
========================================================= */

let toastTimer;


function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;


                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.target
                    );


                let current = 0;

                const duration = 1400;

                const startTime =
                    performance.now();


                function animate(time) {

                    const progress =
                        Math.min(
                            (time - startTime) /
                            duration,
                            1
                        );


                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    current =
                        Math.floor(
                            eased * target
                        );


                    counter.textContent =
                        current;


                    if (progress < 1) {

                        requestAnimationFrame(
                            animate
                        );

                    } else {

                        counter.textContent =
                            target;

                    }

                }


                requestAnimationFrame(
                    animate
                );


                counterObserver.unobserve(
                    counter
                );

            });

        },

        {
            threshold: .6
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   SKILL BAR ANIMATION
========================================================= */

const skillBars =
    document.querySelectorAll(".skill-bar span");


const skillObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                const bar =
                    entry.target;


                const finalWidth =
                    bar.parentElement
                      .parentElement
                      .querySelector(
                          ".skill-name span:last-child"
                      )
                      .textContent;


                bar.style.width =
                    finalWidth;


                skillObserver.unobserve(bar);

            });

        },

        {
            threshold: .5
        }

    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   PROJECT FILTERING
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        projectCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

                card.style.animation =
                    "fadeIn .5s ease";

            } else {

                card.classList.add("hidden");

            }

        });


        showToast(
            "Projects filtered",
            `Showing ${filter === "all" ? "all projects" : filter + " projects"}.`
        );

    });

});


/* =========================================================
   PROJECT MODALS
========================================================= */

const projectButtons =
    document.querySelectorAll(".project-open");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalType =
    document.getElementById("modalType");

const modalClose =
    document.getElementById("modalClose");

const modalContact =
    document.getElementById("modalContact");


projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".project-card");


        modalTitle.textContent =
            card.dataset.title;


        modalDescription.textContent =
            card.dataset.description;


        modalType.textContent =
            card.dataset.type;


        projectModal.classList.add("active");

        body.classList.add("modal-open");

    });

});


function closeProjectModal() {

    projectModal.classList.remove("active");

    body.classList.remove("modal-open");

}


modalClose.addEventListener(
    "click",
    closeProjectModal
);


projectModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeProjectModal
    );


modalContact.addEventListener("click", () => {

    closeProjectModal();

    document
        .getElementById("contact")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================================
   SERVICE MODALS
========================================================= */

const serviceButtons =
    document.querySelectorAll(".service-btn");

const serviceTitle =
    document.getElementById("serviceTitle");

const serviceDescription =
    document.getElementById("serviceDescription");

const serviceModalClose =
    document.getElementById("serviceModalClose");

const serviceContact =
    document.querySelector(".service-contact");


const services = {

    business: {

        title: "Business Websites",

        description:
            "Professional websites designed for shops, local businesses, startups and organisations. The goal is to create a strong online presence that clearly communicates what the business offers."

    },

    portfolio: {

        title: "Portfolio Websites",

        description:
            "Modern personal portfolios that present skills, projects, achievements and personal branding in a clean and memorable way."

    },

    landing: {

        title: "Landing Pages",

        description:
            "Focused pages designed around a specific product, campaign, service or idea. The layout keeps the visitor focused on the main goal."

    },

    ui: {

        title: "Creative UI",

        description:
            "Interactive and visually distinctive interfaces using thoughtful layouts, typography, animation and micro-interactions."

    }

};


serviceButtons.forEach(button => {

    button.addEventListener("click", () => {

        const service =
            services[
                button.dataset.service
            ];


        if (!service) return;


        serviceTitle.textContent =
            service.title;


        serviceDescription.textContent =
            service.description;


        serviceModal.classList.add(
            "active"
        );


        body.classList.add(
            "modal-open"
        );

    });

});


function closeServiceModal() {

    serviceModal.classList.remove(
        "active"
    );

    body.classList.remove(
        "modal-open"
    );

}


serviceModalClose.addEventListener(
    "click",
    closeServiceModal
);


serviceModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeServiceModal
    );


serviceContact.addEventListener(
    "click",
    closeServiceModal
);


/* =========================================================
   ESCAPE KEY CLOSES MODALS
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeProjectModal();

    closeServiceModal();

});


/* =========================================================
   COPY TO CLIPBOARD
========================================================= */

const copyItems =
    document.querySelectorAll(".copy-item");


copyItems.forEach(item => {

    item.addEventListener("click", async () => {

        const value =
            item.dataset.copy;


        try {

            await navigator.clipboard.writeText(
                value
            );


            showToast(
                "Copied!",
                `${value} copied to clipboard.`
            );


        } catch {

            showToast(
                "Copy unavailable",
                "Please copy the information manually."
            );

        }

    });

});


/* =========================================================
   CONTACT FORM
========================================================= */

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById("name")
                .value.trim();


        const email =
            document.getElementById("email")
                .value.trim();


        const projectType =
            document.getElementById("projectType")
                .value;


        const budget =
            document.getElementById("budget")
                .value;


        const message =
            document.getElementById("message")
                .value.trim();


        /* Validation */

        if (!name) {

            showToast(
                "Name required",
                "Please enter your name."
            );

            return;

        }


        if (!email) {

            showToast(
                "Email required",
                "Please enter your email."
            );

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showToast(
                "Invalid email",
                "Please enter a valid email address."
            );

            return;

        }


        if (!message) {

            showToast(
                "Message required",
                "Tell me a little about your project."
            );

            return;

        }


        /*
            Build WhatsApp message
        */

        const whatsappMessage =

`Hello RSK!

I would like to discuss a website/project.

Name: ${name}
Email: ${email}
Service: ${projectType || "Not specified"}
Budget: ${budget || "Not specified"}

Project details:
${message}`;


        /*
            YOUR NUMBER
        */

        const phoneNumber =
            "919600063543";


        const whatsappURL =
            `https://wa.me/${phoneNumber}?text=` +
            encodeURIComponent(
                whatsappMessage
            );


        showToast(
            "Request prepared",
            "Opening WhatsApp..."
        );


        /*
            Small delay makes the
            notification visible.
        */

        setTimeout(() => {

            window.open(
                whatsappURL,
                "_blank"
            );

        }, 700);


        contactForm.reset();

    }
);


/* =========================================================
   SCROLL TO TOP
========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});


scrollTopBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   REVEAL ELEMENTS
========================================================= */

const revealElements = [

    ".section-heading",

    ".about-text",

    ".stat-card",

    ".service-card",

    ".project-card",

    ".skills-intro",

    ".skill-row",

    ".process-item",

    ".contact-card",

    ".contact-form"

];


revealElements.forEach(selector => {

    document
        .querySelectorAll(selector)
        .forEach(element => {

            element.classList.add(
                "reveal"
            );

        });

});


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const moveX =
                (x - rect.width / 2) /
                35;


            const moveY =
                (y - rect.height / 2) /
                35;


            const mainCard =
                heroVisual.querySelector(
                    ".main-card"
                );


            if (mainCard) {

                mainCard.style.transform =
                    `rotate(3deg)
                     translate(${moveX}px,${moveY}px)`;

            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const mainCard =
                heroVisual.querySelector(
                    ".main-card"
                );


            if (mainCard) {

                mainCard.style.transform =
                    "rotate(3deg)";

            }

        }
    );

}


/* =========================================================
   DYNAMIC YEAR
========================================================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =========================================================
   PROJECT COUNTER
========================================================= */

const projectCounter =
    document.getElementById(
        "projectCounter"
    );


if (projectCounter) {

    const projects =
        document.querySelectorAll(
            ".project-card"
        ).length;


    projectCounter.textContent =
        `${projects + 8}+`;

}


/* =========================================================
   LINK RIPPLE EFFECT
========================================================= */

document
    .querySelectorAll(
        ".primary-btn, .secondary-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.style.position =
                    "absolute";

                ripple.style.width =
                    "10px";

                ripple.style.height =
                    "10px";

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(255,255,255,.35)";

                ripple.style.left =
                    `${event.offsetX}px`;

                ripple.style.top =
                    `${event.offsetY}px`;

                ripple.style.transform =
                    "translate(-50%,-50%)";

                ripple.style.pointerEvents =
                    "none";


                this.style.position =
                    "relative";

                this.style.overflow =
                    "hidden";


                this.appendChild(
                    ripple
                );


                ripple.animate(

                    [
                        {
                            width: "10px",
                            height: "10px",
                            opacity: 1
                        },

                        {
                            width: "400px",
                            height: "400px",
                            opacity: 0
                        }

                    ],

                    {
                        duration: 600,
                        easing: "ease-out"
                    }

                ).onfinish = () => {

                    ripple.remove();

                };

            }

        );

    });


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        RSK'S PORTFOLIO

        Built with:
        HTML
        CSS
        JavaScript

        Keep building. 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
);