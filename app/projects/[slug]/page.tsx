import { client } from "@/sanity/lib/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const dynamic = "force-dynamic";

type SanityImage = Record<string, any> | null | undefined;

type ResearchInsight = {
  title?: string;
  description?: string;
};

type KeyFeature = {
  title?: string;
  description?: string;
};

type FinalScreen = {
  title?: string;
  description?: string;
  image?: SanityImage;
};

type ImpactMetric = {
  metric?: string;
  label?: string;
  description?: string;
};

type FlexibleSection = {
  number?: number;
  title?: string;
  description?: string;
  image?: SanityImage;
};

type Project = {
  title?: string;
  category?: string;
  projectType?: string;
  summary?: string;
  heroImage?: SanityImage;
  featured?: boolean;
  role?: string;
  timeline?: string;
  tools?: string[];
  platform?: string;
  problem?: string;
  goal?: string;
  designChallenge?: string;
  targetUsers?: string[];
  researchMethods?: string[];
  researchInsights?: ResearchInsight[];
  personasImage?: SanityImage;
  journeyMapImage?: SanityImage;
  userFlowImage?: SanityImage;
  wireframeImages?: SanityImage[];
  designSystemImage?: SanityImage;
  solutionOverview?: string;
  keyFeatures?: KeyFeature[];
  finalScreens?: FinalScreen[];
  outcome?: string;
  impactMetrics?: ImpactMetric[];
  learnings?: string;
  nextSteps?: string[];
  sections?: FlexibleSection[];
  liveUrl?: string;
  figmaUrl?: string;
};

const builder = createImageUrlBuilder(client);

function urlFor(source: SanityImage) {
  if (!source) return "";
  return builder.image(source).auto("format").fit("max").url();
}

function hasText(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

function InfoCard({ label, value }: { label: string; value?: string | string[] }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
        {label}
      </p>
      {Array.isArray(value) ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
          {value}
        </p>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
}

function ImageBlock({ image, alt, className = "" }: { image?: SanityImage; alt: string; className?: string }) {
  if (!image) return null;

  return (
    <div className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04] ${className}`}>
      <img src={urlFor(image)} alt={alt} className="w-full object-cover" />
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      category,
      projectType,
      summary,
      heroImage,
      featured,
      role,
      timeline,
      tools,
      platform,
      problem,
      goal,
      designChallenge,
      targetUsers,
      researchMethods,
      researchInsights[]{
        title,
        description
      },
      personasImage,
      journeyMapImage,
      userFlowImage,
      wireframeImages,
      designSystemImage,
      solutionOverview,
      keyFeatures[]{
        title,
        description
      },
      finalScreens[]{
        title,
        description,
        image
      },
      outcome,
      impactMetrics[]{
        metric,
        label,
        description
      },
      learnings,
      nextSteps,
      sections[]{
        number,
        title,
        description,
        image
      },
      liveUrl,
      figmaUrl
    }`,
    { slug },
    { cache: "no-store" }
  );

  if (!project) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6 text-slate-950 dark:bg-[#050914] dark:text-white">
        <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
            Project not found
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.04em]">
            This case study could not be found.
          </h1>
          <a
            href="/projects"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Back to projects
          </a>
        </div>
      </main>
    );
  }

  const sections = [...(project.sections || [])].sort(
    (a, b) => (a.number || 0) - (b.number || 0)
  );

  return (
    <main className="bg-[#F8FAFC] text-slate-950 dark:bg-[#050914] dark:text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(45,91,255,0.24),transparent_32%),radial-gradient(circle_at_78%_16%,rgba(34,197,94,0.10),transparent_28%),linear-gradient(180deg,#050914_0%,#070B16_100%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-36">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
                  {project.category || "Product Design"}
                </span>
                {project.projectType && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-300">
                    {project.projectType}
                  </span>
                )}
              </div>

              <h1 className="mt-8 max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl xl:text-7xl">
                {project.title}
              </h1>

              {project.summary && (
                <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                  {project.summary}
                </p>
              )}

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                {project.figmaUrl && (
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#2D5BFF] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-[#1f49e8]"
                  >
                    View Prototype →
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white hover:bg-white/10"
                  >
                    View Live Project →
                  </a>
                )}
              </div>
            </div>

            <ImageBlock image={project.heroImage} alt={`${project.title || "Project"} hero image`} className="shadow-2xl shadow-black/40" />
          </div>
        </div>
      </section>

      {/* PROJECT META */}
      <section className="border-b border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-[#080D1A]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <InfoCard label="Role" value={project.role} />
          <InfoCard label="Timeline" value={project.timeline} />
          <InfoCard label="Platform" value={project.platform} />
          <InfoCard label="Tools" value={project.tools} />
        </div>
      </section>

      {/* STRATEGY */}
      {(hasText(project.problem) || hasText(project.goal) || hasText(project.designChallenge) || (project.targetUsers?.length || 0) > 0) && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Strategy"
            title="Framing the right problem"
            description="A strong product case study starts by making the business problem, user problem, and design direction clear."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {project.problem && (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04] md:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Problem</p>
                <p className="mt-5 text-lg leading-9 text-slate-700 dark:text-slate-300">{project.problem}</p>
              </article>
            )}

            {project.goal && (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04] md:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Goal</p>
                <p className="mt-5 text-lg leading-9 text-slate-700 dark:text-slate-300">{project.goal}</p>
              </article>
            )}
          </div>

          {(project.designChallenge || (project.targetUsers?.length || 0) > 0) && (
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              {project.designChallenge && (
                <article className="rounded-[2rem] border border-blue-200 bg-blue-50 p-7 shadow-sm dark:border-blue-400/20 dark:bg-blue-400/10 md:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">Design Challenge</p>
                  <p className="mt-5 text-2xl font-black leading-snug tracking-[-0.03em] text-slate-950 dark:text-white">{project.designChallenge}</p>
                </article>
              )}
              <InfoCard label="Target Users" value={project.targetUsers} />
            </div>
          )}
        </section>
      )}

      {/* RESEARCH */}
      {((project.researchMethods?.length || 0) > 0 || (project.researchInsights?.length || 0) > 0 || project.personasImage || project.journeyMapImage) && (
        <section className="bg-white py-20 dark:bg-[#080D1A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <SectionHeading eyebrow="Research" title="Insights that shaped the product" />
                {project.researchMethods && project.researchMethods.length > 0 && (
                  <div className="mt-8">
                    <InfoCard label="Methods" value={project.researchMethods} />
                  </div>
                )}
              </div>

              {project.researchInsights && project.researchInsights.length > 0 && (
                <div className="grid gap-4">
                  {project.researchInsights.map((insight, index) => (
                    <article key={`${insight.title}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0B1120]">
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">{insight.title}</h3>
                      {insight.description && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{insight.description}</p>}
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <ImageBlock image={project.personasImage} alt="Personas" />
              <ImageBlock image={project.journeyMapImage} alt="Journey map" />
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {(project.userFlowImage || (project.wireframeImages?.length || 0) > 0 || project.designSystemImage) && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Process" title="From journey mapping to interface system" />

          <div className="mt-12 space-y-8">
            <ImageBlock image={project.userFlowImage} alt="User flow" />

            {project.wireframeImages && project.wireframeImages.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {project.wireframeImages.map((image, index) => (
                  <ImageBlock key={index} image={image} alt={`Wireframe ${index + 1}`} />
                ))}
              </div>
            )}

            <ImageBlock image={project.designSystemImage} alt="Design system" />
          </div>
        </section>
      )}

      {/* SOLUTION */}
      {(project.solutionOverview || (project.keyFeatures?.length || 0) > 0 || (project.finalScreens?.length || 0) > 0) && (
        <section className="bg-white py-20 dark:bg-[#080D1A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading eyebrow="Solution" title="The final product experience" description={project.solutionOverview} />

            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {project.keyFeatures.map((feature, index) => (
                  <article key={`${feature.title}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0B1120]">
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400">Feature {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">{feature.title}</h3>
                    {feature.description && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>}
                  </article>
                ))}
              </div>
            )}

            {project.finalScreens && project.finalScreens.length > 0 && (
              <div className="mt-14 grid gap-8 md:grid-cols-2">
                {project.finalScreens.map((screen, index) => (
                  <article key={`${screen.title}-${index}`} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-[#0B1120]">
                    <ImageBlock image={screen.image} alt={screen.title || `Final screen ${index + 1}`} />
                    <div className="p-3 pt-6">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Final Screen</p>
                      <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">{screen.title}</h3>
                      {screen.description && <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{screen.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* IMPACT */}
      {(project.outcome || (project.impactMetrics?.length || 0) > 0 || project.learnings || (project.nextSteps?.length || 0) > 0) && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="Impact" title="Outcome, learnings and next steps" />

          {project.impactMetrics && project.impactMetrics.length > 0 && (
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {project.impactMetrics.map((item, index) => (
                <article key={`${item.metric}-${index}`} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="text-3xl font-black tracking-[-0.04em] text-blue-600 dark:text-blue-400">{item.metric}</p>
                  <h3 className="mt-3 text-lg font-black text-slate-950 dark:text-white">{item.label}</h3>
                  {item.description && <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>}
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {project.outcome && (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04] md:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Outcome</p>
                <p className="mt-5 text-lg leading-9 text-slate-700 dark:text-slate-300">{project.outcome}</p>
              </article>
            )}

            {project.learnings && (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04] md:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Key Learnings</p>
                <p className="mt-5 text-lg leading-9 text-slate-700 dark:text-slate-300">{project.learnings}</p>
              </article>
            )}
          </div>

          {project.nextSteps && project.nextSteps.length > 0 && (
            <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04] md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Next Steps</p>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {project.nextSteps.map((step) => (
                  <li key={step} className="rounded-2xl bg-slate-50 p-4 text-slate-700 dark:bg-[#0B1120] dark:text-slate-300">✓ {step}</li>
                ))}
              </ul>
            </article>
          )}
        </section>
      )}

      {/* FLEXIBLE / LEGACY SECTIONS */}
      {sections.length > 0 && (
        <section className="bg-white py-20 dark:bg-[#080D1A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading eyebrow="Additional Case Study Detail" title="Supporting screens and artefacts" />
            <div className="mt-12 space-y-10">
              {sections.map((section) => {
                const isFullWidth =
                  section.title?.toLowerCase().includes("hero") ||
                  section.title?.toLowerCase().includes("wireframe") ||
                  section.title?.toLowerCase().includes("design system") ||
                  section.title?.toLowerCase().includes("key screen");

                return (
                  <article
                    key={`${section.number}-${section.title}`}
                    className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-white/10 dark:bg-[#0B1120] md:p-10"
                  >
                    <div className={isFullWidth ? "space-y-8" : "grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center"}>
                      <div>
                        {section.number !== undefined && (
                          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {String(section.number).padStart(2, "0")}
                          </p>
                        )}
                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl dark:text-white">
                          {section.title}
                        </h2>
                        {section.description && (
                          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                            {section.description}
                          </p>
                        )}
                      </div>
                      <ImageBlock image={section.image} alt={section.title || "Case study section image"} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#050914] px-6 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:flex-row md:items-center md:justify-between lg:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Next Project</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Explore more selected work</h2>
          </div>
          <a href="/projects" className="inline-flex items-center justify-center rounded-xl bg-[#2D5BFF] px-7 py-4 text-sm font-bold text-white hover:bg-[#1f49e8]">
            Back to Projects →
          </a>
        </div>
      </section>
    </main>
  );
}
