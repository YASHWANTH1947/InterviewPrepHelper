import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { getInterviewReport } from "../api/interview.services.js";

function InterviewReport() {
  const navigate = useNavigate();

  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationFn: getInterviewReport,
    onSuccess: (report) => {
      navigate("/interview-result", { state: { report } });
    },
    onError: (error) => {
      setFormError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    },
  });

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setFormError("Please upload a PDF file only.");
      return;
    }
    setFormError("");
    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!resumeFile) {
      setFormError("Please upload your resume PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setFormError("Please enter the job description.");
      return;
    }
    if (!selfDescription.trim()) {
      setFormError("Please enter a short self description.");
      return;
    }

    mutate({ resumeFile, jobDescription, selfDescription });
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="border-b border-white/[0.07] bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-slate-200"
          >
            <span className="text-base">←</span> Back to Home
          </Link>
          <div className="flex items-center gap-3 text-sm text-cyan-100/90">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-xs font-bold text-cyan-100">
              IG
            </span>
            <span className="hidden font-semibold tracking-widest uppercase sm:block">
              InterviewGuide
            </span>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-14">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            AI Analysis Engine
          </div>
          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Generate your{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Interview Report
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Upload your resume, paste the job description and tell us about
            yourself. Our AI will generate a complete interview prep blueprint.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1 – Resume Upload */}
          <section className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-bold text-cyan-100">
                01
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Resume / CV
                </h2>
                <p className="text-sm text-slate-400">Upload your PDF resume</p>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) =>
                e.key === "Enter" && fileInputRef.current?.click()
              }
              className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[1.5rem] border-2 border-dashed transition-all duration-200 ${
                dragOver
                  ? "border-cyan-400/70 bg-cyan-400/10"
                  : resumeFile
                    ? "border-emerald-400/40 bg-emerald-400/5"
                    : "border-white/15 bg-white/[0.03] hover:border-cyan-300/30 hover:bg-white/[0.06]"
              }`}
            >
              <input
                ref={fileInputRef}
                id="resume-file-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              {resumeFile ? (
                <>
                  <span className="text-4xl">✅</span>
                  <p className="text-sm font-semibold text-emerald-300">
                    {resumeFile.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(resumeFile.size / 1024).toFixed(1)} KB · Click to replace
                  </p>
                </>
              ) : (
                <>
                  <span className="text-4xl text-slate-500">📄</span>
                  <p className="text-sm font-medium text-slate-300">
                    Drag & drop your PDF here, or{" "}
                    <span className="text-cyan-300 underline underline-offset-2">
                      browse
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">PDF files only</p>
                </>
              )}
            </div>
          </section>

          {/* Step 2 – Job Description */}
          <section className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-300/15 text-sm font-bold text-amber-100">
                02
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Job Description
                </h2>
                <p className="text-sm text-slate-400">
                  Paste the full job description from the listing
                </p>
              </div>
            </div>
            <textarea
              id="job-description-input"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Role: Senior Frontend Engineer&#10;Requirements:&#10;- 3+ years React experience&#10;- TypeScript proficiency&#10;..."
              rows={8}
              className="w-full resize-none rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-7 text-slate-200 placeholder-slate-600 outline-none transition focus:border-amber-300/40 focus:bg-white/[0.08] focus:ring-0"
            />
          </section>

          {/* Step 3 – Self Description */}
          <section className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-300/15 text-sm font-bold text-violet-100">
                03
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  About Yourself
                </h2>
                <p className="text-sm text-slate-400">
                  Tell us your strengths, goals, and what makes you a good fit
                </p>
              </div>
            </div>
            <textarea
              id="self-description-input"
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              placeholder="I am a passionate full-stack developer with 2 years of experience building MERN applications. I love building scalable systems and I'm particularly strong in..."
              rows={6}
              className="w-full resize-none rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-7 text-slate-200 placeholder-slate-600 outline-none transition focus:border-violet-300/40 focus:bg-white/[0.08] focus:ring-0"
            />
          </section>

          {/* Error */}
          {formError && (
            <p className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200">
              ⚠ {formError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="generate-report-btn"
            disabled={isPending}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-5 text-base font-bold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] transition hover:shadow-[0_0_60px_rgba(34,211,238,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                Analysing your profile — this may take a moment…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Generate My Interview Report
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}

export default InterviewReport;
