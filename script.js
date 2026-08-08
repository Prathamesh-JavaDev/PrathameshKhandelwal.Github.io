const navLinks = document.querySelectorAll(".nav a[href^='#'], .nav a[href*='index.html#']");

const sectionIds = Array.from(navLinks)
    .map((link) => {
        const hash = new URL(link.href, window.location.href).hash;
        return hash ? hash.slice(1) : null;
    })
    .filter(Boolean);

const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

if (sections.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) {
                return;
            }

            navLinks.forEach((link) => {
                const hash = new URL(link.href, window.location.href).hash;
                link.classList.toggle("is-active", hash === `#${visible.target.id}`);
            });
        },
        { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
}
