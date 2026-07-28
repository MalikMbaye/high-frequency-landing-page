import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { TrackResult } from "@/lib/track";
import { SUPPORT_EMAIL } from "@/lib/track";

const Track = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Track Your Order | High Frequency Headphones";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("track-order", {
      body: { email, orderNumber: orderNumber.trim() || undefined },
    });
    setLoading(false);
    if (fnError) {
      setError("Something went wrong on our end. Please try again in a moment.");
      return;
    }
    const row = (data as { order: TrackResult | null } | null)?.order;
    if (!row) {
      setError(
        `We couldn't find an order for those details. Double-check the email you used at checkout. This tracker only covers recent orders — if you ordered several months ago, email ${SUPPORT_EMAIL} with your order number and we'll pull it up for you.`
      );
      return;
    }
    navigate("/track/result", { state: { order: row } });
  };

  return (
    <div className="trk">
      <div className="trk-wrap">
        <a href="/" className="trk-back">
          <ArrowLeft size={16} /> Back to High Frequency Headphones
        </a>

        <div className="trk-card">
          <h1 className="trk-title">Track your order</h1>
          <p className="trk-sub">
            We ship in batches, in the order orders came in. Enter the email you used at
            checkout to see exactly where you sit and when your set arrives.
          </p>

          <form onSubmit={onSubmit} className="trk-form">
            <label className="trk-label">
              Email used at checkout
              <input
                className="trk-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </label>
            <label className="trk-label">
              Order number <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
              <input
                className="trk-input"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="#1234"
                inputMode="text"
              />
            </label>
            <button className="trk-btn trk-btn-wide" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Track my order"}
            </button>
          </form>


          {error && <p className="trk-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Track;
