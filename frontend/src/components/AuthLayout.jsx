import { Link } from "react-router-dom";

const authHighlights = [
  "Live interview readiness tracking",
  "Guided practice loops with focused prompts",
  "One place for prep, review, and momentum",
];

function AuthLayout({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaTo,
  ctaText,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-16 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-16 right-[12%] h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:min-h-[calc(100svh-3rem)] lg:flex-row lg:items-stretch">
        <section className="flex flex-1 flex-col justify-between rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 sm:p-8 lg:p-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 text-sm text-cyan-100/90">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 font-semibold text-cyan-100">
                IG
              </span>
              <div>
                <p className="font-semibold tracking-[0.28em] text-cyan-100/80 uppercase">
                  InterviewGuide
                </p>
                <p className="text-xs text-slate-400">
                  Focused prep for serious candidates
                </p>
              </div>
            </div>

            <div className="max-w-2xl space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-200/80">
                {eyebrow}
              </p>
              <h1 className="max-w-xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Prep with clarity. Show up with proof.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Build a tighter interview rhythm with guided sessions, cleaner
                accountability, and a workspace that feels ready before you are.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {authHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-emerald-100">
              Practice sessions
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Structured notes
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Confidence loops
            </span>
          </div>
        </section>

        <section className="glass-panel w-full rounded-[2rem] p-6 sm:p-8 lg:max-w-xl lg:p-10">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">
                {eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                {description}
              </p>
            </div>
          </div>

          {children}

          <p className="mt-8 text-sm text-slate-400">
            {ctaText}{" "}
            <Link
              className="font-semibold text-cyan-200 transition hover:text-white"
              to={ctaTo}
            >
              {ctaLabel}
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
