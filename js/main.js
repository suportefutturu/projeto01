/* ============================================================
   WP Lab — E-book Landing Page
   ============================================================ */

/* ---------- Header ---------- */
const header = document.getElementById("header");
const onScrollHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

/* ---------- Menu mobile ---------- */
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Contadores ---------- */
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || "0");
  const suffix = el.dataset.suffix || "";
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * easeOut(progress);
    el.textContent = value.toFixed(decimals).replace(".", ",");
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

/* ---------- Tilt 3D + brilho nos cards ---------- */
const bookScene = document.getElementById("bookScene");
const book = document.getElementById("book");

bookScene.addEventListener("mousemove", (e) => {
  const rect = bookScene.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  book.style.transform = `rotateY(${(-x * 18).toFixed(2)}deg) rotateX(${(y * -18).toFixed(2)}deg)`;
});

book.addEventListener("mouseleave", () => {
  book.style.transform = "rotateY(0deg) rotateX(0deg)";
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

/* ---------- Animação sutil do mockup ao entrar ---------- */
const bookObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transform = "rotateY(0deg) rotateX(0deg)";
        bookObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);
bookObserver.observe(book);

/* ---------- Ano no footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
