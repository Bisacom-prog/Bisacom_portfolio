export const metadata = {
  title: "Privacy & Cookie Policy | Bisacom",
  description:
    "Read the Privacy & Cookie Policy for Bisacom, a UK-based product design and digital creative brand.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-900 px-6 py-12 text-slate-200 md:px-16 lg:px-32">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl md:p-14">
        
        {/* Header */}
        <div className="mb-12">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            Bisacom
          </p>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Privacy &{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Cookie Policy
            </span>
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            At <strong>Bisacom</strong>, we are committed to protecting your
            privacy and handling your personal information transparently and
            responsibly in accordance with the UK General Data Protection
            Regulation (UK GDPR) and the Privacy and Electronic Communications
            Regulations (PECR).
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-white">
            1. Who We Are
          </h2>

          <p className="leading-relaxed text-slate-300">
            Bisacom is a UK-based product design and digital creative brand
            specialising in UI/UX design, branding, front-end development and
            digital product experiences.
          </p>

          <div className="mt-5 space-y-2 text-slate-300">
            <p>
              <strong>Brand:</strong> Bisacom
            </p>
            <p>
              <strong>Email:</strong> bisacom@gmail.com
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-white">
            2. Information We Collect
          </h2>

          <ul className="list-disc space-y-3 pl-6 leading-relaxed text-slate-300">
            <li>Contact form submissions (name, email address, message)</li>
            <li>Project enquiry information</li>
            <li>
              Technical information such as browser type, IP address and device
              information
            </li>
            <li>Website usage analytics (only where consent is provided)</li>
            <li>Cookie preferences and site interaction data</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-white">
            3. How Your Information Is Used
          </h2>

          <ul className="list-disc space-y-3 pl-6 leading-relaxed text-slate-300">
            <li>To respond to enquiries and project requests</li>
            <li>To improve website performance and user experience</li>
            <li>To maintain website security and functionality</li>
            <li>
              To analyse website traffic and engagement (with consent)
            </li>
            <li>To communicate updates or services where appropriate</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-white">4. Cookies</h2>

          <p className="mb-5 leading-relaxed text-slate-300">
            Bisacom uses cookies to improve functionality, enhance performance
            and personalise user experience.
          </p>

          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="mb-1 font-semibold text-white">
                Essential Cookies
              </h3>
              <p>Necessary for core website functionality and security.</p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-white">
                Preference Cookies
              </h3>
              <p>
                Used to remember settings such as theme preferences or cookie
                choices.
              </p>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-white">
                Analytics Cookies
              </h3>
              <p>
                Used to understand website traffic and improve the overall
                experience. These are only enabled after user consent.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 border-t border-slate-700 pt-8">
          <p className="text-sm text-slate-500">
            Last updated: May 2026
          </p>
        </div>
      </div>
    </main>
  );
}