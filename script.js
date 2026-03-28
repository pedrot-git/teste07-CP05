const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (!prefersReducedMotion && window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".reveal-up", { y: 32 });
  gsap.set(".reveal-scale", { y: 24, scale: 0.96 });

  gsap.utils.toArray(".reveal-up").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".reveal-scale").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
        once: true
      }
    });
  });

  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTimeline
    .from(".hero-copy .section-kicker", { opacity: 0, y: 20, duration: 0.6 })
    .from(".hero-title", { opacity: 0, y: 30, duration: 0.9 }, "-=0.2")
    .from(".hero-description", { opacity: 0, y: 18, duration: 0.7 }, "-=0.45")
    .from(".hero-actions a", { opacity: 0, y: 14, stagger: 0.12, duration: 0.6 }, "-=0.4")
    .from(".metric-chip", { opacity: 0, y: 16, stagger: 0.12, duration: 0.6 }, "-=0.35")
    .from(".phone-shell", { opacity: 0, y: 42, scale: 0.92, rotate: -4, duration: 1.15 }, "-=0.9")
    .from(".floating-note", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, "-=0.55")
    .from(".hero-bottom-ribbon span", { opacity: 0, y: 12, stagger: 0.08, duration: 0.45 }, "-=0.5");

  gsap.to(".hero-aurora", {
    yPercent: 7,
    xPercent: 4,
    scale: 1.06,
    duration: 10,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".hero-halo", {
    rotate: 14,
    duration: 18,
    ease: "none",
    repeat: -1
  });

  gsap.to(".cover-a", {
    x: 12,
    y: -10,
    duration: 5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".cover-b", {
    x: -10,
    y: 12,
    duration: 5.8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".core-ring", {
    scale: 1.03,
    opacity: 0.72,
    transformOrigin: "center center",
    stagger: {
      each: 0.25,
      repeat: -1,
      yoyo: true
    },
    duration: 3.2,
    ease: "sine.inOut"
  });

  gsap.to(".orbit-track", {
    rotate: 360,
    transformOrigin: "center center",
    duration: 36,
    ease: "none",
    repeat: -1
  });

  gsap.to(".orbit-card", {
    y: -8,
    duration: 2.6,
    ease: "sine.inOut",
    stagger: 0.22,
    repeat: -1,
    yoyo: true
  });

  gsap.to(".waveform span", {
    scaleY: () => gsap.utils.random(0.45, 1.18),
    transformOrigin: "bottom center",
    duration: 0.9,
    ease: "sine.inOut",
    stagger: {
      each: 0.05,
      repeat: -1,
      yoyo: true
    }
  });

  gsap.to(".panel-bars span", {
    scaleY: () => gsap.utils.random(0.5, 1.15),
    transformOrigin: "bottom center",
    duration: 1.1,
    ease: "sine.inOut",
    stagger: {
      each: 0.08,
      repeat: -1,
      yoyo: true
    }
  });

  gsap.utils.toArray(".hero-float").forEach((element) => {
    const depth = Number(element.dataset.depth || 12);

    gsap.to(element, {
      y: depth * -0.18,
      scrollTrigger: {
        trigger: ".hero-section",
        scrub: true,
        start: "top top",
        end: "bottom top"
      }
    });
  });
} else {
  document.querySelectorAll(".reveal-up, .reveal-scale").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}

if (canHover) {
  const magneticItems = document.querySelectorAll(".magnetic-button, .magnetic-card");

  magneticItems.forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      if (prefersReducedMotion) {
        return;
      }

      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const moveX = ((x - rect.width / 2) / rect.width) * 16;
      const moveY = ((y - rect.height / 2) / rect.height) * 16;

      item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    item.addEventListener("pointerleave", () => {
      item.style.transform = "";
    });
  });
}

const header = document.querySelector(".site-header");
const mobileMenu = document.querySelector("#mobile-menu");
const navToggle = document.querySelector(".nav-toggle");

if (navToggle && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.hidden = true;
    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
      return;
    }

    mobileMenu.hidden = false;
    mobileMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

window.addEventListener("scroll", () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 24);
});
