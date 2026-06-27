(function () {
  "use strict";

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Mobile menu toggle
  function setMenu(isOpen) {
    navMenu.classList.toggle("open", isOpen);
    navToggle.classList.toggle("open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function closeMenu() {
    setMenu(false);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      setMenu(!navMenu.classList.contains("open"));
    });

    // Close menu when a link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when tapping the backdrop / outside the drawer
    document.addEventListener("click", function (e) {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close menu on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Reset menu state if resizing back up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && navMenu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // Highlight active nav link based on scroll position
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
