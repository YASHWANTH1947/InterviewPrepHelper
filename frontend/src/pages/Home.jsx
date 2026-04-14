import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { getMe, logoutUser } from "../api/auth.services";

const features = [
  {
    icon: "📄",
    title: "Upload Your Resume",
    description:
      "Drop your PDF resume and let our AI extract key skills, experiences, and talking points automatically.",
  },
  {
    icon: "🎯",
    title: "AI Match Score",
    description:
      "Get a precise match score showing how well your profile aligns with the job description you're targeting.",
  },
  {
    icon: "🧠",
    title: "Smart Q&A Prep",
    description:
      "Receive tailored technical and behavioral questions — each with interviewer intentions and ideal answer strategies.",
  },
  {
    icon: "📈",
    title: "Skill Gap Analysis",
    description:
      "Identify exactly what's missing from your profile and how critical each gap is for landing the role.",
  },
  {
    icon: "🗓️",
    title: "Day-by-Day Prep Plan",
    description:
      "A structured preparation roadmap customized to bridge your gaps and maximise interview readiness.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    description:
      "Powered by Google Gemini AI — get your complete interview report in seconds, not hours.",
  },
];

const stats = [
  { value: "95%", label: "Match Accuracy" },
  { value: "10x", label: "Faster Prep" },
  { value: "AI", label: "Powered Analysis" },
];

const Home = () => {
  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error.message);
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/15 blur-[120px]" />
        <div className="absolute right-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-amber-300/10 blur-[100px]" />
        <div className="absolute bottom-0 left-[30%] h-[300px] w-[500px] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-bold text-cyan-100">
              IG
            </span>
            <span className="font-semibold tracking-widest text-cyan-100/90 uppercase text-sm">
              InterviewGuide
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {user?.username || "Candidate"}
            </div>

            <Link
              to="/previous-reports"
              className="rounded-full border border-violet-300/20 bg-violet-300/10 px-5 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-300/20"
            >
              Previous Reports
            </Link>

            <Link
              to="/interview-report"
              className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Start Analysis →
            </Link>

            <button
              onClick={() => logout()}
              disabled={isPending}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "..." : "Logout"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center lg:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-cyan-200">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          AI-Powered Interview Preparation
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Land your dream job with{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
            AI-guided prep
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Upload your resume, paste the job description, and get a complete
          interview blueprint — tailored questions, skill gap analysis, and a
          personalized prep plan — in seconds.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/interview-report"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.3)] transition hover:shadow-[0_0_60px_rgba(34,211,238,0.5)]"
          >
            <span className="relative z-10">Generate My Interview Report</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-full skew-x-12" />
          </Link>
          <span className="text-sm text-slate-500">
            Free · No credit card · Instant results
          </span>
        </div>

        {/* Stats row */}
        <div className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 bg-white/5 px-6 py-5 backdrop-blur-sm"
            >
              <span className="text-2xl font-bold text-white sm:text-3xl">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300/70">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Three steps to interview confidence
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Upload & Describe",
              body: "Share your PDF resume, the job description you're targeting, and a short note about yourself.",
              color: "from-cyan-500/20 to-cyan-500/5",
              border: "border-cyan-300/20",
            },
            {
              step: "02",
              title: "AI Analyses",
              body: "Gemini AI reads your profile, compares it to the role, and generates a deep-dive interview report.",
              color: "from-sky-500/20 to-sky-500/5",
              border: "border-sky-300/20",
            },
            {
              step: "03",
              title: "Walk In Ready",
              body: "Study your custom Q&A, close skill gaps, and follow the prep plan. Show up prepared.",
              color: "from-violet-500/20 to-violet-500/5",
              border: "border-violet-300/20",
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`relative overflow-hidden rounded-[2rem] border ${item.border} bg-gradient-to-b ${item.color} p-8 backdrop-blur-sm`}
            >
              <span className="text-6xl font-black text-white/5 absolute right-6 top-4 select-none">
                {item.step}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Step {item.step}
              </p>
              <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/70">
            Everything you need
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Your complete interview toolkit
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-violet-500/10 p-12 text-center backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute right-1/4 bottom-0 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl" />
          </div>
          <p className="relative text-xs font-semibold uppercase tracking-widest text-cyan-200/70">
            Ready to begin?
          </p>
          <h2 className="relative mt-4 text-3xl font-bold text-white sm:text-4xl">
            Your next interview starts here
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-base text-slate-400">
            Welcome back, {user?.username || "Candidate"}. Drop your resume and
            get your personalized report right now.
          </p>
          <Link
            to="/interview-report"
            className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-8 py-4 text-base font-bold text-slate-950 transition hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
          >
            Generate My Report →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-8 text-center text-sm text-slate-500">
        <span className="font-medium tracking-widest uppercase text-slate-600">
          InterviewGuide
        </span>{" "}
        · Powered by Google Gemini AI
      </footer>
    </div>
  );
};

export default Home;
