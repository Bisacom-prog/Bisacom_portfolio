"use client";

import { useEffect, useState, type ReactNode } from "react";

const projects = [
  {
    title: "Mobile Mechanic App",
    type: "Mobile App",
    description: "On-demand car repair app connecting drivers with trusted mobile mechanics.",
    image: "/img/mobile.webp",
    href: "/projects/mobile-mechanic-app",
  },
  {
    title: "Cleaning Website",
    type: "Website Design",
    description: "Modern, conversion-focused website for a cleaning service business in the UK.",
    image: "/img/cleaning.webp",
    href: "/projects/cleaning-website",
  },
  {
    title: "Aba’s Pie",
    type: "Website Design",
    description: "E-commerce website design for a local bakery specialising in homemade pies.",
    image: "/img/abas.webp",
    href: "/projects/abas-pie",
  },
];

const reviews = [
  {
    quote: "Bisacom brought clarity to our website structure and made the user journey feel simple, modern, and professional.",
    name: "Majoa K.",
    role: "Food Business Owner",
    image: "/img/Client2.webp",
  },
  {
    quote: "The product thinking behind the mobile mechanic concept was strong. The flow felt practical and easy to understand.",
    name: "Daniel K.",
    role: "Startup Founder",
    image: "/img/Client3.webp",
  },
  {
    quote: "Professional, responsive, and detail-oriented. The final design helped us look more credible online.",
    name: "Michael A.",
    role: "Service Business Owner",
    image: "/img/Client1.webp",
  },
];

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-blue-500/10 bg-blue-50 text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-blue-300">
      {children}
    </span>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("bisacomTheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("bisacomTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const progress = document.getElementById("progress");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progress) progress.style.width = height > 0 ? `${(scrollTop / height) * 100}%` : "0%";
    };

    const handleScroll = () => window.requestAnimationFrame(updateProgress);
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    const fadeItems = document.querySelectorAll(".fade-up");
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && !reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
      );
      fadeItems.forEach((el) => observer?.observe(el));
    } else {
      fadeItems.forEach((el) => el.classList.add("show"));
    }

    const cookieOverlay = document.getElementById("cookieOverlay");
    const cookieModal = cookieOverlay?.querySelector(".cookie-modal");
    const analyticsCookies = document.getElementById("analyticsCookies") as HTMLInputElement | null;
    const marketingCookies = document.getElementById("marketingCookies") as HTMLInputElement | null;
    const saveCookies = document.getElementById("saveCookies");
    const cancelCookies = document.getElementById("cancelCookies");
    const closeCookies = document.getElementById("closeCookies");
    const manageCookies = document.getElementById("manageCookies");
    const storageKey = "bisacomCookiePreferences";
    let openTimeout: number | undefined;
    let closeTimeout: number | undefined;

    function getPreferences() {
      try {
        const item = localStorage.getItem(storageKey);
        return item ? JSON.parse(item) : null;
      } catch {
        localStorage.removeItem(storageKey);
        return null;
      }
    }

    function syncInputs(preferences: { analytics?: boolean; marketing?: boolean } | null) {
      if (!preferences) return;
      if (analyticsCookies) analyticsCookies.checked = Boolean(preferences.analytics);
      if (marketingCookies) marketingCookies.checked = Boolean(preferences.marketing);
    }

    function openCookieModal() {
      if (!cookieOverlay) return;
      syncInputs(getPreferences());
      cookieOverlay.classList.remove("hidden");
      cookieOverlay.classList.add("flex");
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => cookieModal?.classList.add("is-open"));
      saveCookies?.focus();
    }

    function closeCookieModal() {
      if (!cookieOverlay) return;
      cookieModal?.classList.remove("is-open");
      closeTimeout = window.setTimeout(() => {
        cookieOverlay.classList.add("hidden");
        cookieOverlay.classList.remove("flex");
        document.body.style.overflow = "";
      }, 180);
    }

    function savePreferences(analytics: boolean, marketing: boolean) {
      const preferences = { necessary: true, analytics, marketing, savedAt: new Date().toISOString() };
      localStorage.setItem(storageKey, JSON.stringify(preferences));
      syncInputs(preferences);
      closeCookieModal();
    }

    const savedPreferences = getPreferences();
    if (!savedPreferences) openTimeout = window.setTimeout(openCookieModal, 600);
    else syncInputs(savedPreferences);

    const handleSaveCookies = () => savePreferences(Boolean(analyticsCookies?.checked), Boolean(marketingCookies?.checked));
    const handleCancelCookies = () => savePreferences(false, false);
    const handleCookieOverlayClick = (event: MouseEvent) => { if (event.target === cookieOverlay) closeCookieModal(); };
    const handleCookieEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && cookieOverlay && !cookieOverlay.classList.contains("hidden")) closeCookieModal();
    };

    saveCookies?.addEventListener("click", handleSaveCookies);
    cancelCookies?.addEventListener("click", handleCancelCookies);
    closeCookies?.addEventListener("click", closeCookieModal);
    manageCookies?.addEventListener("click", openCookieModal);
    cookieOverlay?.addEventListener("click", handleCookieOverlayClick);
    document.addEventListener("keydown", handleCookieEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
      saveCookies?.removeEventListener("click", handleSaveCookies);
      cancelCookies?.removeEventListener("click", handleCancelCookies);
      closeCookies?.removeEventListener("click", closeCookieModal);
      manageCookies?.removeEventListener("click", openCookieModal);
      cookieOverlay?.removeEventListener("click", handleCookieOverlayClick);
      document.removeEventListener("keydown", handleCookieEscape);
      if (openTimeout) window.clearTimeout(openTimeout);
      if (closeTimeout) window.clearTimeout(closeTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div id="progress" aria-hidden="true"></div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050914]/90 text-white shadow-sm backdrop-blur-xl dark:bg-[#050914]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="focus-ring flex items-center gap-3 rounded-lg" aria-label="Bisacom home">
            <img src="/img/Bisacom.webp" className="h-9 w-9 rounded-lg object-cover" alt="Bisacom logo" />
            <span className="text-xl font-extrabold tracking-tight">Bisacom</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 lg:flex" aria-label="Primary navigation">
            <a href="#projects" className="nav-link hover:text-white">Work</a>
            <a href="#about" className="nav-link hover:text-white">About</a>
            <a href="#process" className="nav-link hover:text-white">Process</a>
            <a href="#skills" className="nav-link hover:text-white">Skills</a>
            <a href="/blog" className="nav-link hover:text-white">Blog</a>
            <a href="#contact" className="nav-link hover:text-white">Contact</a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button type="button" onClick={() => setDarkMode((value) => !value)} className="focus-ring btn-lift inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-white/10" aria-label="Toggle dark mode">
              <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
            </button>
            <a href="/Bismark-Apenkwah-CV.pdf" className="focus-ring btn-lift inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Download CV <span aria-hidden="true">↓</span></a>
            <a href="#contact" className="focus-ring btn-lift inline-flex items-center gap-2 rounded-xl bg-[#2D5BFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#1f49e8]">Let&apos;s Talk <span aria-hidden="true">＋</span></a>
          </div>

          <button type="button" onClick={() => setMenuOpen((value) => !value)} className={`focus-ring btn-lift inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white shadow-sm backdrop-blur lg:hidden ${menuOpen ? "menu-open" : ""}`} aria-expanded={menuOpen} aria-controls="mobileMenu" aria-label={menuOpen ? "Close menu" : "Open menu"}>
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="grid gap-[5px]"><span className="hamburger-line"></span><span className="hamburger-line"></span><span className="hamburger-line"></span></span>
          </button>
        </div>

        <nav id="mobileMenu" className={`mobile-menu-panel border-t border-white/10 bg-[#050914]/95 px-5 shadow-xl shadow-black/30 backdrop-blur-xl lg:hidden ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2 py-4 text-sm font-semibold text-slate-200">
            {["Work", "About", "Process", "Skills", "Contact"].map((item) => (
              <a key={item} href={item === "Work" ? "#projects" : `#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="focus-ring rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-white">{item}</a>
            ))}
            <a href="/blog" onClick={() => setMenuOpen(false)} className="focus-ring rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-white">Blog</a>
            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              <button type="button" onClick={() => setDarkMode((value) => !value)} className="focus-ring btn-lift rounded-xl border border-white/15 px-4 py-3 font-semibold text-white hover:bg-white/10">{darkMode ? "Light mode" : "Dark mode"}</button>
              <a href="/Bismark-Apenkwah-CV.pdf" className="focus-ring btn-lift rounded-xl border border-white/15 px-4 py-3 text-center font-semibold text-white hover:bg-white/10">Download CV</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="focus-ring btn-lift rounded-xl bg-[#2D5BFF] px-4 py-3 text-center font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#1f49e8]">Let&apos;s Talk</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="relative isolate overflow-hidden bg-[#050914] pt-28 text-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(45,91,255,0.18),transparent_34%),radial-gradient(circle_at_75%_20%,rgba(45,91,255,0.14),transparent_32%),linear-gradient(180deg,#050914_0%,#070B16_100%)]"></div>
          <div className="absolute left-1/2 top-24 -z-10 hidden h-52 w-52 -translate-x-1/2 rotate-12 rounded-[3rem] border border-blue-500/20 lg:block"></div>

          <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 pb-20 pt-12 md:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="fade-up max-w-2xl">
              <p className="mb-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Product Designer &amp; Front-End Developer</p>
              <h1 className="text-4xl font-black leading-[1.04] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl xl:text-7xl">I design digital products that <span className="bg-gradient-to-r from-[#3B6DFF] to-[#6D8DFF] bg-clip-text text-transparent">solve real problems.</span></h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">Product Designer with a front-end mindset, helping startups and businesses in the UK build user-centred web and mobile experiences that drive results.</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#projects" className="focus-ring btn-lift inline-flex items-center justify-center gap-3 rounded-xl bg-[#2D5BFF] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-[#1f49e8]">View My Work <span aria-hidden="true">→</span></a>
                <a href="#contact" className="focus-ring btn-lift inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-bold text-white hover:bg-white/10">Let&apos;s Work Together <span aria-hidden="true">→</span></a>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex -space-x-3">{["/img/Client1.webp", "/img/Client2.webp", "/img/Client3.webp", "/img/Bisacom.webp"].map((src, index) => <img key={src} src={src} className="h-10 w-10 rounded-full border-2 border-[#050914] object-cover" alt={`Trusted client ${index + 1}`} />)}</div>
                <p className="max-w-xs text-sm leading-6 text-slate-400">Trusted by startups &amp; local businesses across the UK</p>
              </div>
            </div>

            <div className="fade-up relative min-h-[360px] lg:min-h-[560px]">
              <div className="relative mx-auto w-full max-w-2xl lg:absolute lg:-right-24 lg:top-6 lg:w-[760px] lg:max-w-none lg:rotate-[-3deg] xl:-right-32">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/60 backdrop-blur">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0B1120]">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-xs text-slate-300">
                      <div className="flex items-center gap-2 font-bold text-white"><span className="grid h-6 w-6 place-items-center rounded-lg bg-blue-500 text-[10px]">B</span> Mobile Mechanic</div>
                      <div className="hidden gap-6 md:flex"><span>Home</span><span>Services</span><span>How it works</span><span>About us</span></div>
                      <span className="rounded-lg bg-blue-500 px-3 py-2 text-white">Book Now</span>
                    </div>
                    <div className="grid min-h-[360px] items-center gap-8 bg-[linear-gradient(90deg,rgba(5,9,20,0.95),rgba(5,9,20,0.82)),url('/img/mockup.webp')] bg-cover bg-center px-6 py-10 lg:grid-cols-[0.8fr_1fr] lg:px-8">
                      <div><h2 className="text-3xl font-extrabold leading-tight text-white">Reliable. Fast.<br />On-Demand Car Repairs at Your Doorstep</h2><p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">Book a trusted mechanic to come to you anytime, anywhere.</p><div className="mt-6 flex flex-wrap gap-3"><span className="rounded-lg bg-blue-500 px-4 py-3 text-sm font-bold text-white">Book a Mechanic</span><span className="rounded-lg border border-white/20 px-4 py-3 text-sm font-bold text-white">How it works</span></div></div>
                      <div className="hidden lg:block"></div>
                      <div className="col-span-full grid gap-4 text-xs text-slate-300 sm:grid-cols-3"><span className="rounded-full border border-white/10 bg-black/20 px-4 py-3">◎ Certified Mechanics</span><span className="rounded-full border border-white/10 bg-black/20 px-4 py-3">◌ Fair Pricing</span><span className="rounded-full border border-white/10 bg-black/20 px-4 py-3">✦ Fast Response</span></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-3 hidden w-40 rounded-[2rem] border border-white/10 bg-[#0B1120] p-2 shadow-2xl shadow-black/60 md:block lg:left-10 lg:w-44"><img src="/img/mobile.webp" alt="Mobile app preview" className="h-72 w-full rounded-[1.5rem] object-cover" /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200/70 bg-white py-10 dark:border-white/10 dark:bg-[#080D1A]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {[
              ["User-Centred Design", "I design with real users in mind, not just aesthetics.", "○"],
              ["End-to-End Solution", "From research and design to development.", "▯"],
              ["Conversion Focused", "Designs that help businesses grow.", "↗"],
              ["Clean & Scalable Code", "Front-end development with performance in mind.", "<>"],
            ].map(([title, text, icon]) => (
              <article key={title} className="flex gap-4 border-slate-200/80 lg:border-r lg:pr-8 last:border-r-0 dark:border-white/10"><IconBox>{icon}</IconBox><div><h3 className="font-bold text-slate-950 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p></div></article>
            ))}
          </div>
        </section>

        <section id="projects" className="bg-white py-20 dark:bg-[#050914]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Featured Work</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl dark:text-white">Selected Projects</h2></div><a href="/projects" className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">View all projects <span>→</span></a></div>
            <div className="grid gap-6 md:grid-cols-3">{projects.map((project) => <article key={project.title} className="group card-hover overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B1120]"><div className="overflow-hidden bg-slate-100 dark:bg-white/[0.03]"><img src={project.image} className="project-img h-64 w-full object-cover" alt={`${project.title} preview`} /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">{project.type}</p><h3 className="mt-3 text-xl font-bold text-slate-950 dark:text-white">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p><a href={project.href} className="focus-ring mt-5 inline-flex text-sm font-bold text-blue-600 dark:text-blue-400">View Case Study →</a></div></article>)}</div>
          </div>
        </section>

        <section id="process" className="bg-slate-50 py-20 dark:bg-[#080D1A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">My Design Process</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl dark:text-white">How I Work</h2><p className="mt-4 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">A clear process to solve the right problems and deliver real value.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{["Discover", "Define", "Design", "Build", "Deliver"].map((step, index) => <article key={step} className="process-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1120]"><p className="text-xs font-bold text-blue-600 dark:text-blue-400">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-4 font-bold text-slate-950 dark:text-white">{step}</h3><p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-400">{["Understand users, business goals and problems.", "Analyse insights and define the right problem.", "Ideate, wireframe and design user-centred solutions.", "Develop clean code and bring designs to life.", "Test, refine and deliver measurable results."][index]}</p></article>)}</div></div></div>
        </section>

        <section id="skills" className="bg-white py-20 dark:bg-[#050914]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Customer Reviews</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl dark:text-white">Trusted by clients and collaborators</h2><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">Social proof that supports your UK recruiter-ready positioning.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{reviews.map((review) => <figure key={review.name} className="card-hover rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0B1120]"><div className="text-lg text-amber-400" aria-label="5 out of 5 stars">★★★★★</div><blockquote className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">“{review.quote}”</blockquote><figcaption className="mt-6 flex items-center gap-3"><img src={review.image} className="h-12 w-12 rounded-full object-cover" alt={review.name} /><div><p className="font-bold text-slate-950 dark:text-white">{review.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{review.role}</p></div></figcaption></figure>)}</div></div>
        </section>

        <section id="contact" className="bg-white px-6 pb-20 dark:bg-[#050914] lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-2xl bg-[linear-gradient(135deg,#050914,#21115C)] p-8 text-white shadow-2xl shadow-blue-950/20 md:flex-row md:items-center md:justify-between lg:p-10"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Have a project in mind?</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">Let’s build something amazing together.</h2></div><a href="mailto:hello@bisacom.dev" className="focus-ring btn-lift inline-flex items-center justify-center gap-3 rounded-xl bg-[#2D5BFF] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-[#1f49e8]">Let&apos;s Talk <span aria-hidden="true">☏</span></a></div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-[#070B16] px-6 pt-16 pb-8 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-green-400/10 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
              <div>
                <a
                  href="#home"
                  className="focus-ring inline-flex items-center gap-3 rounded-xl"
                  aria-label="Bisacom home"
                >
                  <img
                    src="/img//Bisacom.webp"
                    className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10"
                    alt="Bisacom logo"
                  />
                  <span className="text-xl font-bold tracking-tight">
                    Bisacom
                  </span>
                </a>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                  Norwich-based product designer creating conversion-focused
                  websites, apps, and digital experiences for startups and local
                  businesses.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@bisacom.dev"
                    className="focus-ring rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/20 hover:bg-green-600"
                  >
                    Start a project
                  </a>
                  <a
                    href="mailto:hello@bisacom.dev"
                    className="focus-ring rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
                  >
                    Email me
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Explore
                </h3>
                <nav
                  className="mt-4 grid gap-3 text-sm text-slate-400"
                  aria-label="Footer navigation"
                >
                  <a href="#home" className="transition hover:text-white">
                    Home
                  </a>
                  <a href="#projects" className="transition hover:text-white">
                    Projects
                  </a>
                  <a href="#contact" className="transition hover:text-white">
                    Contact
                  </a>
                  <a
                    href="mailto:hello@bisacom.dev"
                    className="transition hover:text-white"
                  >
                    WhatsApp
                  </a>
                </nav>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Legal
                </h3>
                <nav
                  className="mt-4 grid gap-3 text-sm text-slate-400"
                  aria-label="Legal links"
                >
                  <a
                    href="/privacy-policy"
                    className="transition hover:text-white"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-of-use"
                    className="transition hover:text-white"
                  >
                    Terms of Use
                  </a>
                  <button
                    id="manageCookies"
                    type="button"
                    className="w-fit text-left text-sm font-semibold text-blue-300 underline underline-offset-4 transition hover:text-white"
                  >
                    Manage Cookies
                  </button>
                </nav>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Connect
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/bisacom_?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring social-icon inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-white"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect
                        x="2.5"
                        y="2.5"
                        width="19"
                        height="19"
                        rx="5"
                      ></rect>

                      <path d="M16 11.37a4 4 0 1 1-7.9 1.18 4 4 0 0 1 7.9-1.18z"></path>

                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/bismarkapenkwah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring social-icon inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path d="M4.98 3.5C4.98 4.604 4.104 5.5 3 5.5S1.02 4.604 1.02 3.5 1.896 1.5 3 1.5s1.98.896 1.98 2zM1.5 8h3V22h-3V8zm7 0h2.877v1.917h.041C11.82 8.88 13.1 8 14.98 8 18.08 8 19 9.938 19 13.02V22h-3v-7.02c0-1.675-.03-3.827-2.333-3.827-2.336 0-2.694 1.823-2.694 3.708V22h-3V8z" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/Bisacom-prog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring social-icon inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400/40 hover:bg-white/10 hover:text-white"
                    aria-label="GitHub"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 008 10.938c.584.108.792-.254.792-.566 0-.28-.01-1.022-.016-2.006-3.25.706-3.937-1.566-3.937-1.566-.532-1.35-1.3-1.71-1.3-1.71-1.063-.726.08-.711.08-.711 1.176.083 1.796 1.208 1.796 1.208 1.045 1.79 2.742 1.272 3.41.973.106-.757.41-1.273.746-1.566-2.595-.295-5.323-1.298-5.323-5.777 0-1.276.456-2.32 1.204-3.138-.12-.296-.522-1.487.114-3.1 0 0 .982-.314 3.217 1.198A11.19 11.19 0 0112 6.095c.99.005 1.987.134 2.92.393 2.233-1.512 3.214-1.198 3.214-1.198.638 1.613.236 2.804.116 3.1.75.818 1.202 1.862 1.202 3.138 0 4.49-2.732 5.478-5.335 5.767.422.364.798 1.08.798 2.177 0 1.573-.014 2.84-.014 3.226 0 .315.204.68.8.564A11.502 11.502 0 0023.5 12C23.5 5.648 18.352.5 12 .5z" />
                    </svg>
                  </a>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  Available for UI/UX design, landing pages, product redesigns,
                  and front-end builds.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>&copy; 2026 Bisacom. All rights reserved.</p>
              <p>
                Designed and built with clarity, accessibility, and conversion
                in mind.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Overlay */}
      <div
        id="cookieOverlay"
        className="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookieTitle"
      >
        <div className="cookie-modal w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700">
                Cookie Control
              </p>
              <h2
                id="cookieTitle"
                className="mt-1 text-2xl font-extrabold text-slate-900"
              >
                Cookie Preferences
              </h2>
            </div>

            <button
              id="closeCookies"
              className="text-2xl text-slate-400 hover:text-slate-900"
            >
              &times;
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Choose which cookies you want to allow. You can update these
            preferences anytime.
          </p>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  disabled
                  className="mt-1 h-4 w-4 accent-slate-400"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Strictly Necessary Cookies
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Required for basic site functionality and security.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="pr-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Analytics Cookies
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Helps improve the portfolio experience.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="analyticsCookies"
                  type="checkbox"
                  className="peer sr-only"
                />
                <div className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-blue-900"></div>
                <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"></div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="pr-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Marketing Cookies
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Used for embedded videos and social content.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="marketingCookies"
                  type="checkbox"
                  className="peer sr-only"
                />
                <div className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-amber-600"></div>
                <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              id="cancelCookies"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              id="saveCookies"
              className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
