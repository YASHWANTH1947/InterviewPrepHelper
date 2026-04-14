import { useQuery } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { getAllReports, getReportById } from "../api/interview.services.js";
import { useState } from "react";

const severityColors = {
  low: "text-emerald-300",
  medium: "text-amber-300",
  high: "text-rose-300",
};

function ScoreBadge({ score }) {
  const color =
    score >= 75
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      : score >= 50
        ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
        : "border-rose-400/30 bg-rose-400/10 text-rose-300";
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${color}`}>
      {score}%
    </span>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PreviousReports() {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const {
    data: reports,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allReports"],
    queryFn: getAllReports,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleOpenReport = async (id) => {
    setLoadingId(id);
    try {
      const report = await getReportById(id);
      navigate("/interview-result", { state: { report } });
    } catch (err) {
      console.error("Failed to fetch report:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-400/10 blur-[110px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-slate-200"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-xs font-bold text-cyan-100">
              IG
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-widest text-cyan-100/80 sm:block">
              InterviewGuide
            </span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-14">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Report History
          </div>
          <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
            Previous{" "}
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Reports
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-400">
            All your past interview analyses — sorted newest first. Click any
            card to re-open the full report.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-[1.75rem] border border-white/[0.06] bg-white/[0.04]"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="rounded-[1.75rem] border border-rose-400/20 bg-rose-400/10 px-6 py-8 text-center">
            <p className="text-sm text-rose-200">
              ⚠ Could not load reports — {error?.response?.data?.message || error?.message || "Server error"}
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-sm text-slate-400 underline underline-offset-2 hover:text-slate-200"
            >
              Go back home
            </Link>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && (!reports || reports.length === 0) && (
          <div className="flex flex-col items-center justify-center gap-5 rounded-[2rem] border border-white/[0.07] bg-white/[0.03] py-20 text-center">
            <span className="text-6xl">📂</span>
            <div>
              <p className="text-lg font-semibold text-white">No reports yet</p>
              <p className="mt-2 text-sm text-slate-400">
                Generate your first interview report to see it here.
              </p>
            </div>
            <Link
              to="/interview-report"
              className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Generate Report →
            </Link>
          </div>
        )}

        {/* Reports grid */}
        {!isLoading && !isError && reports && reports.length > 0 && (
          <>
            <p className="mb-5 text-sm text-slate-500">
              {reports.length} report{reports.length > 1 ? "s" : ""} found
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {reports.map((report) => {
                const isThisLoading = loadingId === report._id;
                return (
                  <button
                    key={report._id}
                    id={`report-card-${report._id}`}
                    onClick={() => handleOpenReport(report._id)}
                    disabled={loadingId !== null}
                    className="group relative flex flex-col gap-5 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-7 text-left transition-all duration-200 hover:border-violet-300/25 hover:bg-white/[0.07] disabled:cursor-wait disabled:opacity-70"
                  >
                    {/* Subtle glow on hover */}
                    <span className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 ring-1 ring-violet-400/20 transition-opacity group-hover:opacity-100" />

                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                          Job Role
                        </p>
                        <h2 className="text-lg font-bold leading-tight text-white">
                          {report.title}
                        </h2>
                      </div>
                      <ScoreBadge score={report.matchScore ?? 0} />
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-500">
                        🗓 {formatDate(report.createdAt)}
                      </span>

                      {isThisLoading ? (
                        <span className="flex items-center gap-2 text-xs text-violet-300">
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-violet-300 border-t-transparent" />
                          Loading…
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-violet-300 transition group-hover:translate-x-0.5">
                          Open Report →
                        </span>
                      )}
                    </div>

                    {/* Match score mini-bar */}
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          (report.matchScore ?? 0) >= 75
                            ? "bg-emerald-400"
                            : (report.matchScore ?? 0) >= 50
                              ? "bg-amber-400"
                              : "bg-rose-400"
                        }`}
                        style={{ width: `${report.matchScore ?? 0}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* New report CTA at bottom */}
            <div className="mt-10 rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-500/8 to-violet-500/8 p-8 text-center backdrop-blur-sm">
              <p className="text-base font-semibold text-white">
                Want a fresh analysis?
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Upload a new resume or target a different role.
              </p>
              <Link
                to="/interview-report"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Generate New Report →
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default PreviousReports;
