javascript
/* =========================================================
   BRIGHT SERVICES
   Next Gen Innovation for an Intelligent World

   Main JavaScript
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".main-navbar");

    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );

    handleNavbarScroll();


    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight -
                        10;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });


                    /* Close mobile navbar */

                    const navigation =
                        document.getElementById(
                            "mainNavigation"
                        );


                    if (
                        navigation &&
                        navigation.classList.contains(
                            "show"
                        )
                    ) {

                        const navbarToggle =
                            document.querySelector(
                                ".navbar-toggler"
                            );


                        if (navbarToggle) {

                            navbarToggle.click();

                        }

                    }

                }

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".navbar-nav .nav-link"
        );


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop -
                150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href &&
                href === "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------------------
                   GET FORM VALUES
                ----------------------------------------- */

                const name =
                    document.getElementById(
                        "name"
                    )?.value.trim();


                const email =
                    document.getElementById(
                        "email"
                    )?.value.trim();


                const message =
                    document.getElementById(
                        "message"
                    )?.value.trim();


                /* -----------------------------------------
                   BASIC VALIDATION
                ----------------------------------------- */

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showFormMessage(
                        "Please complete all required fields.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   EMAIL VALIDATION
                ----------------------------------------- */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email
                    )
                ) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   STATIC WEBSITE NOTICE
                ----------------------------------------- */

                showFormMessage(
                    "Thank you, " +
                    name +
                    "! Your inquiry has been received on this demo frontend. Connect this form to your backend or email service to receive submissions.",
                    "success"
                );


                /* -----------------------------------------
                   RESET FORM
                ----------------------------------------- */

                contactForm.reset();

            }
        );

    }


    /* =====================================================
       FORM MESSAGE FUNCTION
    ===================================================== */

    function showFormMessage(
        message,
        type
    ) {

        if (!formMessage) return;


        formMessage.textContent =
            message;


        formMessage.className =
            "form-message mt-3";


        if (type === "success") {

            formMessage.classList.add(
                "success"
            );

        } else {

            formMessage.style.display =
                "block";

            formMessage.style.color =
                "#b42318";

            formMessage.style.background =
                "#fef3f2";

            formMessage.style.border =
                "1px solid #fecdca";

        }


        setTimeout(
            function () {

                formMessage.style.display =
                    "none";

            },
            6000
        );

    }


    /* =====================================================
       INTERSECTION OBSERVER
       REVEAL ELEMENTS WHILE SCROLLING
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".why-card, " +
            ".process-item, " +
            ".country-card, " +
            ".industry-item, " +
            ".digital-list-item"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (
                    entries,
                    observerInstance
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal-hidden"
                );


                observer.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       SERVICE CARD HOVER EFFECT
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    this.classList.add(
                        "service-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    this.classList.remove(
                        "service-hover"
                    );

                }
            );

        }
    );


    /* =====================================================
       COUNTER ANIMATION
       Future-ready function
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(
        element
    ) {

        const target =
            parseInt(
                element.getAttribute(
                    "data-counter"
                ),
                10
            );


        if (
            isNaN(target)
        ) {

            return;

        }


        let current = 0;


        const increment =
            Math.max(
                1,
                Math.ceil(
                    target / 60
                )
            );


        const interval =
            setInterval(
                function () {

                    current += increment;


                    if (
                        current >= target
                    ) {

                        current =
                            target;

                        clearInterval(
                            interval
                        );

                    }


                    element.textContent =
                        current.toLocaleString();

                },
                25
            );

    }


    if (
        counters.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observerInstance
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(
                    counter
                );

            }
        );

    }


    /* =====================================================
       PREVENT EMPTY SOCIAL LINKS
       Only for demo frontend
    ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                }
            );

        }
    );


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


});

