import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

export const dynamic = "force-dynamic";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).url();
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      category,
      summary,
      heroImage,
      liveUrl,
      figmaUrl,
      sections[]{
        number,
        title,
        description,
        image
      }
    }`,
    { slug },
    { cache: "no-store" }
  );

  if (!project) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-3xl font-bold">Project not found</h1>
      </main>
    );
  }

  const sections = project.sections?.sort(
    (a: any, b: any) => a.number - b.number
  );

  return (
    <main className="bg-[#F8FAFC] text-slate-950">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          {project.category || "Product Design"}
        </p>

        <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
          {project.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {project.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.figmaUrl && (
            <a
              href={project.figmaUrl}
              target="_blank"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
            >
              View Prototype
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold"
            >
              View Live Project
            </a>
          )}
        </div>

        {project.heroImage && (
          <img
            src={urlFor(project.heroImage)}
            alt={project.title}
            className="mt-12 w-full rounded-[2rem] border border-slate-200 bg-white shadow-2xl"
          />
        )}
      </section>

      {/* SECTIONS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="space-y-24">
          {sections?.map((section: any) => {
            const isFullWidth =
              section.title?.toLowerCase().includes("hero") ||
              section.title?.toLowerCase().includes("wireframe") ||
              section.title?.toLowerCase().includes("design system") ||
              section.title?.toLowerCase().includes("key screen");

            return (
              <article
                key={`${section.number}-${section.title}`}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10"
              >
                <div
                  className={
                    isFullWidth
                      ? "space-y-8"
                      : "grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center"
                  }
                >
                  <div>
                    <p className="text-sm font-bold text-blue-600">
                      {String(section.number).padStart(2, "0")}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                      {section.title}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                      {section.description}
                    </p>
                  </div>

                  {section.image && (
                    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                      <img
                        src={urlFor(section.image)}
                        alt={section.title}
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}