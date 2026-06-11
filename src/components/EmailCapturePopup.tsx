import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";

const STORAGE_KEY = "hfh_email_popup_v1";
// Avg engagement on landing pages ~25s — fire after user has had a moment to taste the brand
const DELAY_MS = 25_000;
const CODE = "FREQUENCYFAM";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const EmailCapturePopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const state = localStorage.getItem(STORAGE_KEY);
      if (state === "dismissed" || state === "subscribed") return;
    } catch {}

    const t = window.setTimeout(() => setOpen(true), DELAY_MS);

    // Exit-intent fallback — desktop only
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) setOpen((o) => o || true);
    };
    document.addEventListener("mouseleave", onExit);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseleave", onExit);
    };
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next && !submitted) {
      try { localStorage.setItem(STORAGE_KEY, "dismissed"); } catch {}
    }
    setOpen(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, "subscribed");
      const list = JSON.parse(localStorage.getItem("hfh_email_list") || "[]");
      list.push({ email: email.trim().toLowerCase(), ts: Date.now() });
      localStorage.setItem("hfh_email_list", JSON.stringify(list));
    } catch {}
    setSubmitted(true);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      toast.success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy manually.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <div className="relative bg-gradient-to-br from-[#0a0a12] via-[#11111c] to-[#0a0a12] border border-purple-500/30 rounded-2xl p-7 text-white">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

          {!submitted ? (
            <>
              <div className="text-[11px] tracking-[0.25em] uppercase text-purple-300/80 mb-3">
                Join the Frequency Fam
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-semibold leading-tight mb-2">
                Tune in. Save <span className="text-purple-300">$50</span> on your headphones.
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm leading-relaxed mb-5">
                Drop your email and we'll unlock your <strong className="text-white">FREQUENCYFAM</strong> insider code —
                plus first access to new frequencies, restocks, and founder drops. No spam, just signal.
              </DialogDescription>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@frequency.com"
                  className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-purple-400/70 focus:bg-white/10 transition"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 py-3 text-sm font-semibold uppercase tracking-wider transition"
                >
                  Unlock My Code
                </button>
              </form>

              <p className="text-[10px] text-white/40 mt-4 text-center">
                We respect your inbox. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <>
              <div className="text-[11px] tracking-[0.25em] uppercase text-purple-300/80 mb-3">
                Welcome to the Fam
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-semibold leading-tight mb-2">
                You're in. Here's your code.
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm mb-5">
                Apply <strong className="text-white">FREQUENCYFAM</strong> at checkout to save on your order.
              </DialogDescription>

              <button
                onClick={copyCode}
                className="w-full flex items-center justify-between gap-3 rounded-lg border-2 border-dashed border-purple-400/50 bg-white/5 hover:bg-white/10 px-4 py-4 transition group"
              >
                <span className="font-mono text-xl tracking-[0.2em] text-white">{CODE}</span>
                <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-purple-300 group-hover:text-purple-200">
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </span>
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-full mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 py-3 text-sm font-semibold uppercase tracking-wider transition"
              >
                Continue Shopping
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCapturePopup;
