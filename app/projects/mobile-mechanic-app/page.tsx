export default function MobileMechanicPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-blue-300 hover:text-blue-200">
          ← Back to home
        </a>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-blue-400">
          Mobile App / UI/UX Design
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Mobile Mechanic App
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          An on-demand roadside assistance and vehicle servicing platform
          designed to connect drivers with trusted nearby mechanics in real time.
        </p>

        <img
          src="/img/Mechanic_ui.webp"
          alt="Mobile Mechanic app interface"
          className="mt-12 w-full rounded-3xl border border-white/10 shadow-2xl"
        />

        <div className="mt-16 grid gap-10">
          <section>
            <h2 className="text-2xl font-bold">Problem</h2>
            <p className="mt-4 leading-8 text-slate-300">
              Traditional roadside assistance experiences are often slow,
              stressful, and difficult to navigate during emergencies. Drivers
              struggle to find trusted mechanics, understand pricing, communicate
              vehicle problems clearly, and track service progress.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Approach</h2>
            <p className="mt-4 leading-8 text-slate-300">
              The design process focused on reducing cognitive load, simplifying
              booking, improving trust signals, and creating familiar patterns
              inspired by on-demand service apps.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Solution</h2>
            <p className="mt-4 leading-8 text-slate-300">
              The final solution includes AI-powered diagnostics, real-time
              mechanic matching, live tracking, emergency booking, transparent
              pricing, and a clean mobile-first interface.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Outcome</h2>
            <p className="mt-4 leading-8 text-slate-300">
              The concept demonstrates how thoughtful UX can simplify high-stress
              service experiences, reduce friction, and build trust between
              drivers and mechanics.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}