import {Link} from "react-router"
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant delivery",
    desc: "Messages land the moment you hit send — no spinners, no waiting around.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "End-to-end encryption keeps your conversations between you and them.",
  },
  {
    icon: Sparkles,
    title: "Built for focus",
    desc: "A calm, clutter-free interface that gets out of the way of the conversation.",
  },
];

function FloatingBubble({ text, time, tone, className, delay }) {
  const styles =
    tone === "sent"
      ? "bg-gradient-to-br from-amber-200 to-amber-500 text-amber-950"
      : "border border-white/10 bg-white/5 text-stone-100";
  return (
    <div
      className={`float-bubble absolute rounded-2xl px-4 py-2.5 text-sm shadow-xl shadow-black/30 ${styles} ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="font-medium">{text}</div>
      <div
        className={`mt-0.5 text-[10.5px] ${tone === "sent" ? "text-amber-900/70" : "text-slate-500"}`}
      >
        {time}
      </div>
    </div>
  );
}

export default function HomePage() {

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-stone-100 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes drift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-16px) translateX(6px); }
        }
        .float-bubble { animation: drift 6s ease-in-out infinite; }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rise { opacity: 0; animation: riseIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes glowMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 20px) scale(1.15); }
        }
        .glow-a { animation: glowMove 12s ease-in-out infinite; }
        .glow-b { animation: glowMove 14s ease-in-out infinite reverse; }
      `}</style>

      {/* ambient glow */}
      <div className="glow-a pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="glow-b pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-700/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      {/* hero */}
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-10 text-center sm:pt-16">
        <div
          className={`rise mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300`}
          style={{ animationDelay: "0ms" }}
        >
          <Sparkles size={13} className="text-amber-300" />
          Now with real-time presence
        </div>

        <h1
          className="rise max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
          style={{ fontFamily: "'Fraunces', serif", animationDelay: "90ms" }}
        >
          Conversations that feel{" "}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            close
          </span>
          , wherever you are.
        </h1>

        <p
          className="rise mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          style={{ animationDelay: "180ms" }}
        >
          ChatVibe brings your messages into one calm, focused space — fast,
          private, and built to feel effortless from the very first hello.
        </p>

        <div
          className="rise mt-9 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "270ms" }}
        >
          <Link
          to={"/login"}
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 px-10 py-3 text-lg font-semibold text-amber-950 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:shadow-amber-500/50"
          >
            Get started
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
          <button className="text-sm font-medium text-slate-300 underline-offset-4 transition hover:text-white ">
            See how it works
          </button>
        </div>

        {/* decorative floating chat mockup */}
        <div className="relative mt-20 hidden h-64 w-full max-w-2xl sm:block">
          <FloatingBubble
            text="hello"
            time="10:09"
            tone="received"
            className="left-4 top-0"
            delay="0s"
          />
          <FloatingBubble
            text="call me right now"
            time="10:09"
            tone="received"
            className="left-16 top-20"
            delay="1.2s"
          />
          <FloatingBubble
            text="hmmm"
            time="10:09"
            tone="sent"
            className="right-8 top-8"
            delay="0.6s"
          />
          <FloatingBubble
            text="on my way 🚗"
            time="10:11"
            tone="sent"
            className="right-16 top-36"
            delay="1.8s"
          />
        </div>
      </main>

      {/* features */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="rise rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md transition hover:-translate-y-1 hover:border-amber-400/30"
              style={{ animationDelay: `${360 + i * 90}ms` }}
            >
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                <Icon size={18} />
              </div>
              <h3
                className="mb-1.5 text-base font-semibold"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ChatVibe. Made for conversations that matter.
      </footer>
    </div>
  );
}
