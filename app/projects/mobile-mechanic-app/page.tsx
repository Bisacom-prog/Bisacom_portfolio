import { client } from "@/sanity/lib/client";

const PROJECT_QUERY = `*[_type == "project" && slug.current == "mobile-mechanic-app"][0]{
  title,
  category,
  summary,
  problem,
  approach,
  solution,
  outcome,
  "imageUrl": heroImage.asset->url
}`;

export default async function MobileMechanicPage() {
  const project = await client.fetch(PROJECT_QUERY);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-blue-300 hover:text-blue-200">
          ← Back to home
        </a>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-blue-400">
          {project.category}
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          {project.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          {project.summary}
        </p>

        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="mt-12 w-full rounded-3xl border border-white/10 shadow-2xl"
          />
        )}

        <div className="mt-16 grid gap-10">
          <section>
            <h2 className="text-2xl font-bold">Problem</h2>
            <p className="mt-4 leading-8 text-slate-300">{project.problem}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Approach</h2>
            <p className="mt-4 leading-8 text-slate-300">{project.approach}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Solution</h2>
            <p className="mt-4 leading-8 text-slate-300">{project.solution}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Outcome</h2>
            <p className="mt-4 leading-8 text-slate-300">{project.outcome}</p>
          </section>
        </div>
      </section>
    </main>
  );
}