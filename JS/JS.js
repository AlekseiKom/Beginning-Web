(function () {
    "use strict";

    var header = document.querySelector(".site-header");
    var burger = document.getElementById("burgerBtn");
    if (!header || !burger) return;

    /* Header shadow on scroll */
    function onScroll() {
        header.classList.toggle("scrolled", window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile menu */
    burger.addEventListener("click", function () {
        var open = header.classList.toggle("nav-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });

    /* Close mobile menu after clicking a link */
    header.addEventListener("click", function (event) {
        if (event.target.closest(".nav-list a") && header.classList.contains("nav-open")) {
            header.classList.remove("nav-open");
            burger.setAttribute("aria-expanded", "false");
        }
    });

    /* Active link on scroll (scrollspy) */
    var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-list a[href^=\'#\']"));
    function spy() {
        var pos = window.scrollY + 140;
        var currentId = "";
        sections.forEach(function (section) {
            if (section.offsetTop <= pos) currentId = section.id;
        });
        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
        });
    }
    window.addEventListener("scroll", spy, { passive: true });
    spy();

    /* Reveal on scroll with stagger */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    document.querySelectorAll(".services-grid, .process-grid, .portfolio-grid, .reviews-grid").forEach(function (grid) {
        Array.prototype.forEach.call(grid.children, function (child, i) {
            if (child.classList.contains("reveal")) child.style.transitionDelay = (i * 90) + "ms";
        });
    });

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && "IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("visible"); });
    }

    /* Animated counters */
    var counters = Array.prototype.slice.call(document.querySelectorAll(".stat-num[data-count]"));
    function animateCounter(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        if (reduceMotion) { el.textContent = target + suffix; return; }
        var start = null;
        function tick(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / 1600, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
    if (counters.length && "IntersectionObserver" in window) {
        var cio = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { animateCounter(entry.target); cio.unobserve(entry.target); }
            });
        }, { threshold: 0.4 });
        counters.forEach(function (el) { cio.observe(el); });
    } else {
        counters.forEach(animateCounter);
    }

    /* Contact form */
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var note = form.querySelector(".form-note");
            var name = form.elements.name.value.trim();
            var email = form.elements.email.value.trim();
            var message = form.elements.message.value.trim();
            if (!name || !email || !message) {
                note.textContent = "Пожалуйста, заполните все поля.";
                note.classList.add("error");
                return;
            }
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                note.textContent = "Проверьте адрес email — он выглядит некорректно.";
                note.classList.add("error");
                return;
            }
            note.classList.remove("error");
            note.textContent = "Спасибо! Мы получили заявку и свяжемся с вами в течение рабочего дня.";
            form.reset();
        });
    }

    /* Footer year */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
