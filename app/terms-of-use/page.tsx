export const metadata = {
  title: "Terms of Use | Bisacom",
  description:
    "Read the Terms of Use for Bisacom, a UK-based product design and digital creative brand.",
};

export default function TermsOfUsePage() {
  return (
    <main className="bg-[#020617] px-6 py-10 text-slate-200 md:px-16 lg:px-32">
      <main className="glass mx-auto max-w-5xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl md:p-14">

        {/* Header */}
        <header className="mb-12">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            Bisacom
          </p>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Terms of{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Use
            </span>
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            Please read these Terms of Use carefully before using the Bisacom
            website or engaging with any of our digital products, services or
            content.
          </p>
        </header>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-white">
            1. Acceptance of Terms
          </h2>

          <p className="leading-relaxed text-slate-300">
            By accessing or using the <strong>Bisacom</strong> website,
            portfolio or related services, you agree to comply with and be
            bound by these Terms of Use.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-white">
            2. About Bisacom
          </h2>

          <p className="leading-relaxed text-slate-300">
            Bisacom is a UK-based product design and digital creative brand
            specialising in UI/UX design, branding, front-end development,
            digital experiences and creative consultancy services.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-white">
            3. Intellectual Property
          </h2>

          <p className="mb-5 leading-relaxed text-slate-300">
            Unless otherwise stated, all content published on this website
            including designs, branding assets, UI concepts, graphics, layouts,
            code snippets, case studies, written content and visuals are the
            intellectual property of Bisacom.
          </p>

          <ul className="list-disc space-y-3 pl-6 leading-relaxed text-slate-300">
            <li>
              You may view and use the website for personal or business
              reference purposes only.
            </li>

            <li>
              You must not copy, reproduce, distribute or commercially exploit
              website content without prior written permission.
            </li>

            <li>
              You may share portfolio links or social media content provided
              proper credit is given to Bisacom.
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-700 pt-8">
          <p className="text-sm text-slate-500">
            Last updated: May 2026
          </p>
        </footer>
      </main>
    </main>
  );
}