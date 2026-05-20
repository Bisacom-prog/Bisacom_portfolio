"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const root = document.documentElement;
    const progress = document.getElementById("progress");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const desktopThemeToggle = document.getElementById("desktopThemeToggle");
    const mobileThemeToggle = document.getElementById("mobileThemeToggle");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const savedTheme = localStorage.getItem("bisacomTheme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
    }

    const toggleDark = () => {
      root.classList.toggle("dark");
      localStorage.setItem(
        "bisacomTheme",
        root.classList.contains("dark") ? "dark" : "light",
      );
    };

    function setMenu(open: boolean) {
      if (!menuToggle || !mobileMenu) return;
      mobileMenu.classList.toggle("is-open", open);
      menuToggle.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    const handleMenuClick = () =>
      setMenu(!mobileMenu?.classList.contains("is-open"));
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    const handleOutsideClick = (event: MouseEvent) => {
      if (!mobileMenu || !menuToggle) return;
      const target = event.target as Node;
      if (!mobileMenu.contains(target) && !menuToggle.contains(target))
        setMenu(false);
    };

    menuToggle?.addEventListener("click", handleMenuClick);
    desktopThemeToggle?.addEventListener("click", toggleDark);
    mobileThemeToggle?.addEventListener("click", toggleDark);
    mobileMenu
      ?.querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOutsideClick);

    let ticking = false;
    const updateProgress = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (progress)
        progress.style.width =
          height > 0 ? `${(scrollTop / height) * 100}%` : "0%";
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

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
    const analyticsCookies = document.getElementById(
      "analyticsCookies",
    ) as HTMLInputElement | null;
    const marketingCookies = document.getElementById(
      "marketingCookies",
    ) as HTMLInputElement | null;
    const saveCookies = document.getElementById("saveCookies");
    const cancelCookies = document.getElementById("cancelCookies");
    const closeCookies = document.getElementById("closeCookies");
    const manageCookies = document.getElementById("manageCookies");
    const storageKey = "bisacomCookiePreferences";
    let closeTimeout:number | undefined;

    function getPreferences() {
      try {
        const item = localStorage.getItem(storageKey);
        return item ? JSON.parse(item) : null;
      } catch {
        localStorage.removeItem(storageKey);
        return null;
      }
    }

    function syncInputs(
      preferences: { analytics?: boolean; marketing?: boolean } | null,
    ) {
      if (!preferences) return;
      if (analyticsCookies)
        analyticsCookies.checked = Boolean(preferences.analytics);
      if (marketingCookies)
        marketingCookies.checked = Boolean(preferences.marketing);
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
      const preferences = {
        necessary: true,
        analytics: Boolean(analytics),
        marketing: Boolean(marketing),
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(preferences));
      syncInputs(preferences);
      closeCookieModal();
    }

    const savedPreferences = getPreferences();
    let openTimeout: number | undefined;
    if (!savedPreferences) {
      openTimeout = window.setTimeout(openCookieModal, 600);
    } else {
      syncInputs(savedPreferences);
    }

    const handleSaveCookies = () =>
      savePreferences(
        Boolean(analyticsCookies?.checked),
        Boolean(marketingCookies?.checked),
      );
    const handleCancelCookies = () => savePreferences(false, false);
    const handleCookieOverlayClick = (event: MouseEvent) => {
      if (event.target === cookieOverlay) closeCookieModal();
    };
    const handleCookieEscape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        cookieOverlay &&
        !cookieOverlay.classList.contains("hidden")
      )
        closeCookieModal();
    };

    saveCookies?.addEventListener("click", handleSaveCookies);
    cancelCookies?.addEventListener("click", handleCancelCookies);
    closeCookies?.addEventListener("click", closeCookieModal);
    manageCookies?.addEventListener("click", openCookieModal);
    cookieOverlay?.addEventListener("click", handleCookieOverlayClick);
    document.addEventListener("keydown", handleCookieEscape);

    return () => {
      menuToggle?.removeEventListener("click", handleMenuClick);
      desktopThemeToggle?.removeEventListener("click", toggleDark);
      mobileThemeToggle?.removeEventListener("click", toggleDark);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleOutsideClick);
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

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0B1120]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a
            href="#home"
            className="flex items-center gap-3 focus-ring rounded-lg"
            aria-label="Bisacom home"
          >
            <img
              src="/assets/img/Bisacom.webp"
              className="h-9 w-9 rounded-lg object-cover"
              alt="Bisacom logo"
            />
            <span className="font-bold text-[#1E3A8A] dark:text-white">
              Bisacom
            </span>
          </a>

          <nav
            className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex dark:text-slate-300"
            aria-label="Primary navigation"
          >
            <a
              href="#home"
              className="nav-link hover:text-[#1E3A8A] dark:hover:text-white"
            >
              Home
            </a>
            <a
              href="#projects"
              className="nav-link hover:text-[#1E3A8A] dark:hover:text-white"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="nav-link hover:text-[#1E3A8A] dark:hover:text-white"
            >
              Contact
            </a>

            <button
              type="button"
              id="desktopThemeToggle"
              className="focus-ring btn-lift rounded-lg border border-slate-300 px-3 py-2 text-base leading-none hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10"
              aria-label="Toggle dark mode"
            >
              <span aria-hidden="true">&#9790;</span>
            </button>

            <a
              href="https://wa.me/447555824637"
              className="focus-ring btn-lift rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-sm shadow-green-500/20 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25"
            >
              WhatsApp
            </a>
          </nav>

          <button
            type="button"
            id="menuToggle"
            className="focus-ring btn-lift inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white/80 text-slate-800 shadow-sm backdrop-blur md:hidden dark:border-white/20 dark:bg-white/5 dark:text-white"
            aria-expanded="false"
            aria-controls="mobileMenu"
            aria-label="Open menu"
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true" className="grid gap-[5px]">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>

        <nav
          id="mobileMenu"
          className="mobile-menu-panel border-t border-slate-200 bg-white/95 px-5 shadow-xl shadow-slate-900/5 backdrop-blur md:hidden dark:border-white/10 dark:bg-[#0B1120]/95"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-6xl gap-2 py-4 text-sm font-semibold">
            <a
              href="#home"
              className="focus-ring rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#1E3A8A] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Home
            </a>
            <a
              href="#projects"
              className="focus-ring rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#1E3A8A] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="focus-ring rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#1E3A8A] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Contact
            </a>
            <div className="grid gap-3 pt-3 sm:grid-cols-2">
              <button
                type="button"
                id="mobileThemeToggle"
                className="focus-ring btn-lift rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-800 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                Toggle theme
              </button>
              <a
                href="https://wa.me/447555824637"
                className="focus-ring btn-lift rounded-xl bg-green-500 px-4 py-3 text-center font-semibold text-white shadow-lg shadow-green-500/20 hover:bg-green-600"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden pt-28"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_36%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_34%),linear-gradient(180deg,#0B1120_0%,#020617_100%)]"></div>

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1fr_0.9fr]">
            <div className="fade-up">
              <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-[#1E3A8A] dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
                Norwich product designer for websites and apps
              </p>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-blue-700 md:text-6xl dark:text-white">
                I design digital products that turn visitors into customers.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Bisacom helps startups and local businesses shape clearer user
                journeys, sharper interfaces, and front-end builds that make
                enquiries easier.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/447555824637"
                  className="focus-ring btn-lift card-hover rounded-lg bg-[#2D5BDE] px-6 py-3 text-center font-semibold text-white hover:bg-[#172f70]"
                >
                  Get a quote on WhatsApp
                </a>

                <a
                  href="#projects"
                  className="focus-ring btn-lift card-hover rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 hover:bg-white dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                >
                  View projects &rarr;
                </a>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="font-bold text-slate-950 dark:text-white">
                    UX
                  </dt>
                  <dd className="mt-1 text-slate-500 dark:text-slate-400">
                    Clear flows
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-950 dark:text-white">
                    UI
                  </dt>
                  <dd className="mt-1 text-slate-500 dark:text-slate-400">
                    Polished screens
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-950 dark:text-white">
                    Build
                  </dt>
                  <dd className="mt-1 text-slate-500 dark:text-slate-400">
                    Responsive code
                  </dd>
                </div>
              </dl>
            </div>

            <div className="fade-up">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-2xl dark:bg-blue-400/10"
                  aria-hidden="true"
                ></div>
                <img
                  src="/assets/img/mockup.webp"
                  className="relative w-full rounded-2xl border border-white/70 shadow-2xl dark:border-white/10"
                  alt="Product interface mockup designed by Bisacom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-white py-20 dark:bg-[#020617]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                Services
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Design that is easy to use and easy to act on.
              </h2>
              <p className="mt-4 text-slate-500 dark:text-slate-400">
                From first impression to final enquiry, every section is shaped
                around trust, clarity, and conversion.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <article className="card-hover rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#111827]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.815 6.879 2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">User-centred design</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Interfaces shaped around what real users need to decide,
                  trust, and act.
                </p>
              </article>

              <article className="card-hover rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#111827]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-400/10 dark:text-green-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 7h16M4 12h16M4 17h10"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Responsive layouts</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Clean, stable pages that work comfortably across mobile,
                  tablet, and desktop.
                </p>
              </article>

              <article className="card-hover rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#111827]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3M12 3a9 9 0 100 18 9 9 0 000-18z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Conversion focus</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Sharper calls to action, clearer structure, and fewer blockers
                  before contact.
                </p>
              </article>

              <article className="card-hover rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#111827]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 9l-3 3 3 3m8-6l3 3-3 3"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Front-end build</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Efficient, maintainable front-end work with performance and
                  accessibility in mind.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="bg-slate-50 py-20 dark:bg-[#020617]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                  Featured projects
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  Selected work
                </h2>
                <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
                  A few examples of product thinking, interface design, and
                  conversion-focused web experiences.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <article className="group card-hover overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#111827]">
                <div className="relative overflow-hidden">
                  <img
                    src="/assets/img/mobile.webp"
                    className="project-img h-60 w-full object-cover"
                    alt="Mobile mechanic app screens"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow dark:bg-[#020617]/95">
                    Mobile App
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Mobile Mechanic App</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    On-demand car repair app connecting drivers with trusted
                    local mechanics.
                  </p>
                  <a
                    href="/projects/mobile-mechanic-app"
                    className="focus-ring mt-5 inline-flex rounded-md text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View case study &rarr;
                  </a>
                </div>
              </article>

              <article className="group card-hover overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#111827]">
                <div className="relative overflow-hidden">
                  <img
                    src="/assets/img/cleaning.webp"
                    className="project-img h-60 w-full object-cover"
                    alt="Cleaning service website design"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow dark:bg-[#020617]/95">
                    Website Design
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Cleaning Website</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    A modern UK service website designed to build trust and
                    generate enquiries.
                  </p>
                  <a
                    href="/projects/cleaning-website"
                    className="focus-ring mt-5 inline-flex rounded-md text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View case study &rarr;
                  </a>
                </div>
              </article>

              <article className="group card-hover overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#111827]">
                <div className="relative overflow-hidden">
                  <img
                    src="/assets/img/abas.webp"
                    className="project-img h-60 w-full object-cover"
                    alt="Majoa's Kitchen ecommerce interface"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow dark:bg-[#020617]/95">
                    E-commerce
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Majoa's Kitchen</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    An ordering experience for a UK-based Ghanaian kitchen,
                    built to increase online sales.
                  </p>
                  <a
                    href="/projects/majoas-kitchen"
                    className="focus-ring mt-5 inline-flex rounded-md text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View case study &rarr;
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="bg-white py-20 dark:bg-[#020617]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                  Results
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  Better structure creates better decisions.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-6 dark:border-white/10">
                  <h3 className="text-2xl font-bold text-blue-500">More</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Qualified enquiries
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-6 dark:border-white/10">
                  <h3 className="text-2xl font-bold text-blue-500">Higher</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Customer trust
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-6 dark:border-white/10">
                  <h3 className="text-2xl font-bold text-blue-500">Lower</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Decision friction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section className="bg-slate-50 py-20 dark:bg-[#111827]">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
              Process
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              My approach
            </h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-[#020617]">
                Research
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-[#020617]">
                UX Strategy
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-[#020617]">
                UI Design
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-[#020617]">
                Build
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-white py-20 dark:bg-[#0B1120]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                Testimonials
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                What clients say
              </h2>
              <p className="mt-4 text-slate-500 dark:text-slate-400">
                Trusted by startups and local businesses.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <figure className="card-hover rounded-xl bg-slate-50 p-6 dark:bg-[#1F2937]">
                <div
                  className="mb-4 text-lg text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <blockquote className="text-slate-600 dark:text-slate-300">
                  "Bisacom completely transformed our website. We started
                  getting more enquiries within weeks."
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src="/assets/img/Client1.webp"
                    className="h-11 w-11 rounded-full object-cover"
                    alt="Michael A."
                  />
                  <div>
                    <p className="font-semibold">Michael A.</p>
                    <p className="text-sm text-slate-400">
                      Cleaning Business Owner
                    </p>
                  </div>
                </figcaption>
              </figure>

              <figure className="card-hover rounded-xl bg-slate-50 p-6 dark:bg-[#1F2937]">
                <div
                  className="mb-4 text-lg text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <blockquote className="text-slate-600 dark:text-slate-300">
                  "The UX thinking behind the mobile mechanic app was
                  exceptional. Everything just made sense."
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src="/assets/img/Client3.webp"
                    className="h-11 w-11 rounded-full object-cover"
                    alt="Daniel K."
                  />
                  <div>
                    <p className="font-semibold">Daniel K.</p>
                    <p className="text-sm text-slate-400">Startup Founder</p>
                  </div>
                </figcaption>
              </figure>

              <figure className="card-hover rounded-xl bg-slate-50 p-6 dark:bg-[#1F2937]">
                <div
                  className="mb-4 text-lg text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <blockquote className="text-slate-600 dark:text-slate-300">
                  "Professional, fast, and very detail-oriented. The final
                  product exceeded expectations."
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src="/assets/img/Client2.webp"
                    className="h-11 w-11 rounded-full object-cover"
                    alt="Majoa K."
                  />
                  <div>
                    <p className="font-semibold">Majoa K.</p>
                    <p className="text-sm text-slate-400">
                      Food Business Owner
                    </p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-slate-50 py-20 dark:bg-[#111827]">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                Contact
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Have a project in mind?
              </h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                Tell me what you are building, what needs to improve, and where
                customers currently get stuck. I will get back within 24 hours.
              </p>

              <div className="mt-8 space-y-2 text-slate-600 dark:text-slate-300">
                <p>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    WhatsApp:
                  </span>{" "}
                  <a
                    className="hover:text-blue-600"
                    href="https://wa.me/447555824637"
                  >
                    +44 7555 824637
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-slate-950 dark:text-white">
                    Email:
                  </span>{" "}
                  <a
                    className="hover:text-blue-600"
                    href="mailto:hello@bisacom.com"
                  >
                    hello@bisacom.com
                  </a>
                </p>
              </div>
            </div>

            <form
              action="https://formspree.io/f/xldnqpbp"
              method="POST"
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#1F2937] dark:ring-white/10"
            >
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  Your name
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    className="focus-ring w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-white/10 dark:bg-[#111827] dark:text-white"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Email address
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="focus-ring w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-white/10 dark:bg-[#111827] dark:text-white"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Project details
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="focus-ring w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-white/10 dark:bg-[#111827] dark:text-white"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  className="focus-ring rounded-lg bg-[#1E3A8A] px-6 py-3 font-semibold text-white hover:bg-[#172f70]"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1E3A8A] px-6 py-14 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to bring your idea to life?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Start with a quick message and I will help you map the next best
            step.
          </p>
          <a
            href="https://wa.me/447555824637"
            className="focus-ring btn-lift mt-7 inline-flex rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
          >
            Chat on WhatsApp
          </a>
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
                    src="/assets/img/Bisacom.webp"
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
                    href="https://wa.me/447555824637"
                    className="focus-ring rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/20 hover:bg-green-600"
                  >
                    Start a project
                  </a>
                  <a
                    href="mailto:hello@bisacom.com"
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
                    href="https://wa.me/447555824637"
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
