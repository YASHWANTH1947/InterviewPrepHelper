import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const severityConfig = {
  low: {
    label: "Low",
    dot: "bg-emerald-400",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  },
  medium: {
    label: "Medium",
    dot: "bg-amber-400",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  },
  high: {
    label: "High",
    dot: "bg-rose-400",
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  },
};

function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0);
  const circumference = 2 * Math.PI * 52;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const offset = circumference - (animated / 100) * circumference;
  const color =
    score >= 75
      ? "#34d399"
      : score >= 50
        ? "#fbbf24"
        : "#f87171";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r="52"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r="52"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="text-4xl font-black text-white"
          style={{ color }}
        >
          {score}
        </span>
        <span className="text-xs uppercase tracking-widest text-slate-400">
          / 100
        </span>
      </div>
    </div>
  );
}

function QuestionCard({ item, index, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] transition-all duration-300 ${open ? "border-white/15" : ""}`}
    >
      <button
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start gap-4">
          <span
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${accent} text-xs font-bold`}
          >
            Q{String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm font-medium leading-6 text-slate-200">
            {item.question}
          </p>
        </div>
        <span className="ml-auto mt-1 shrink-0 text-slate-500 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▾
        </span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/[0.07] px-6 pb-6 pt-5">
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/8 px-4 py-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-300/70">
              Why they ask this
            </p>
            <p className="text-sm leading-6 text-amber-100/90">{item.intention}</p>
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/8 px-4 py-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan-300/70">
              How to answer
            </p>
            <p className="text-sm leading-6 text-cyan-50/90">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function InterviewReportResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.report;

  useEffect(() => {
    if (!report) navigate("/interview-report");
  }, [report, navigate]);

  if (!report) return null;

  const {
    matchScore,
    title,
    technicalQuestions = [],
    behavioralQuestions = [],
    skillGaps = [],
    preparationPlan = [],
  } = report;

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[110px]" />
        <div className="absolute bottom-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-amber-400/5 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/interview-report"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-slate-200"
          >
            ← New Report
          </Link>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-xs font-bold text-cyan-100">
              IG
            </span>
            <Link
              to="/"
              className="hidden text-sm font-semibold uppercase tracking-widest text-cyan-100/80 sm:block"
            >
              InterviewGuide
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-14">
        {/* Report Header */}
        <section className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="shrink-0">
              <ScoreRing score={matchScore} />
              <p className="mt-3 text-center text-xs uppercase tracking-widest text-slate-400">
                Match Score
              </p>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">
                Interview Report Ready
              </div>
              <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                {title || "Interview Preparation Report"}
              </h1>
              <p className="mt-3 text-base text-slate-400">
                Your personalized analysis is complete. Study each section
                carefully — these are tailored to your profile and the role.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  🧠 {technicalQuestions.length} Technical Q&amp;As
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  💬 {behavioralQuestions.length} Behavioral Q&amp;As
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  🚨 {skillGaps.length} Skill Gaps
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  🗓️ {preparationPlan.length}-Day Prep Plan
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Questions */}
        {technicalQuestions.length > 0 && (
          <section>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-bold text-cyan-200">
                🧠
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Technical Questions
                </h2>
                <p className="text-sm text-slate-500">
                  {technicalQuestions.length} questions · tap to expand answers
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {technicalQuestions.map((item, i) => (
                <QuestionCard
                  key={i}
                  item={item}
                  index={i}
                  accent="bg-cyan-300/15 text-cyan-100"
                />
              ))}
            </div>
          </section>
        )}

        {/* Behavioral Questions */}
        {behavioralQuestions.length > 0 && (
          <section>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-300/15 text-sm font-bold text-violet-200">
                💬
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Behavioral Questions
                </h2>
                <p className="text-sm text-slate-500">
                  {behavioralQuestions.length} questions · tap to expand answers
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {behavioralQuestions.map((item, i) => (
                <QuestionCard
                  key={i}
                  item={item}
                  index={i}
                  accent="bg-violet-300/15 text-violet-100"
                />
              ))}
            </div>
          </section>
        )}

        {/* Skill Gaps */}
        {skillGaps.length > 0 && (
          <section className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-300/15 text-sm text-rose-200">
                🚨
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Skill Gaps</h2>
                <p className="text-sm text-slate-500">
                  Areas to strengthen before the interview
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {skillGaps.map((gap, i) => {
                const cfg = severityConfig[gap.severity] || severityConfig.low;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-[1.25rem] border border-white/[0.07] bg-white/[0.03] px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
                      <span className="text-sm font-medium text-slate-200">
                        {gap.skill}
                      </span>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.badge}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Prep Plan */}
        {preparationPlan.length > 0 && (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15 text-sm text-amber-200">
                🗓️
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Day-by-Day Preparation Plan
                </h2>
                <p className="text-sm text-slate-500">
                  {preparationPlan.length}-day structured roadmap
                </p>
              </div>
            </div>

            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute left-[1.35rem] top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-amber-300/30 via-amber-300/10 to-transparent" />

              {preparationPlan.map((dayItem, i) => (
                <div key={i} className="flex gap-6">
                  <div className="relative flex flex-col items-center">
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/15 text-xs font-bold text-amber-100">
                      D{dayItem.day}
                    </span>
                  </div>

                  <div className="flex-1 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.04] p-6 pb-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber-300/70">
                      Day {dayItem.day}
                    </p>
                    <h3 className="mt-1.5 text-base font-bold text-white">
                      {dayItem.focus}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {(dayItem.tasks || []).map((task, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm text-slate-300"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-8 text-center backdrop-blur-sm">
          <p className="text-lg font-bold text-white">You're ready to prep! 🚀</p>
          <p className="mt-2 text-sm text-slate-400">
            Save or screenshot this report. Come back and run a new analysis
            anytime.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/interview-report"
              className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Run Another Analysis
            </Link>
            <Link
              to="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
            >
              Back to Dashboard
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default InterviewReportResult;
