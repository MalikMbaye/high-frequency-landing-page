import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Copy, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "hfh_email_popup_v1";
const DELAY_MS = 25_000;
const CODE = "FREQUENCYFAM";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const EmailCapturePopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const state = localStorage.getItem(STORAGE_KEY);
      if (state === "dismissed" || state === "subscribed") return;
    } catch {}

    const t = window.setTimeout(() => setOpen(true), DELAY_MS);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-email", {
        body: { email: email.trim().toLowerCase(), source: "landing-popup" },
      });

      if (error || !data?.success) {
        const msg = data?.message || "Hmm, something went wrong. Try again in a moment.";
        setErrorMsg(msg);
        setSubmitting(false);
        return;
      }

      try {
        localStorage.setItem(STORAGE_KEY, "subscribed");
      } catch {}
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Hmm, something went wrong. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
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
              <DialogTitle className="text-2xl md:text-3xl font-semibold leading-tight mb-2">
                Free app trial + <span className="text-purple-300">10% off</span> your order today.
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm leading-relaxed mb-5">
                Drop your email to get a free trial of the app and unlock 10% off your headphones.
              </DialogDescription>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errorMsg) setErrorMsg(null); }}
                  disabled={submitting}
                  placeholder="you@email.com"
                  className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-purple-400/70 focus:bg-white/10 transition disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 py-3 text-sm font-semibold uppercase tracking-wider transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Unlocking…
                    </>
                  ) : (
                    "Start my free trial"
                  )}
                </button>
                {errorMsg && (
                  <p className="text-xs text-red-300/90 text-center pt-1">{errorMsg}</p>
                )}
              </form>

              <p className="text-[10px] text-white/40 mt-4 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <>
              <DialogTitle className="text-2xl md:text-3xl font-semibold leading-tight mb-2">
                You're in. Here's your 10% off.
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm mb-5">
                Tap to copy — it'll apply at checkout. Your free trial is on its way to your inbox.
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
                onClick={() => {
                  if (!copied) {
                    copyCode();
                  } else {
                    setOpen(false);
                  }
                }}
                className="w-full mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 py-3 text-sm font-semibold uppercase tracking-wider transition"
              >
                {copied ? "Shop now" : "Copy code"}
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCapturePopup;
