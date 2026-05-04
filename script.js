const statement = document.querySelector("[data-word-count-source]");
const countTarget = document.querySelector("[data-word-count]");

document.documentElement.classList.add("motion-ready");
document.querySelectorAll(".hero .reveal").forEach((item) => item.classList.add("is-visible"));

if (statement && countTarget) {
  const words = statement.textContent.trim().split(/\s+/).filter(Boolean);
  countTarget.textContent = String(words.length);
}

function observeNav(links, options) {
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", isActive);
    });
  }, options);

  sections.forEach((section) => observer.observe(section));
}

observeNav(Array.from(document.querySelectorAll(".site-nav a")), {
  rootMargin: "-24% 0px -56% 0px",
  threshold: [0.08, 0.2, 0.4],
});

observeNav(Array.from(document.querySelectorAll(".case-nav a")), {
  rootMargin: "-18% 0px -64% 0px",
  threshold: [0.08, 0.18, 0.32],
});

const revealItems = Array.from(document.querySelectorAll(".reveal"));

if (window.location.hash) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if (revealItems.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
