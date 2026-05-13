const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const priceLoader = document.querySelector(".price-loader");

if (priceLoader) {
  const hidePriceLoader = () => {
    priceLoader.classList.add("is-hidden");
    window.setTimeout(() => priceLoader.remove(), reduceMotion ? 0 : 380);
  };

  const schedulePriceLoader = () => {
    window.setTimeout(hidePriceLoader, reduceMotion ? 0 : 1250);
  };

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", schedulePriceLoader, { once: true });
  } else {
    window.requestAnimationFrame(schedulePriceLoader);
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
