import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RECIPIENT = "j@highfrequencyhw.com";

const inputStyle = {
  padding: "12px 14px",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 8,
  fontSize: 15,
  background: "#fff",
} as const;

const labelStyle = { display: "flex", flexDirection: "column", gap: 6 } as const;
const labelText = { fontSize: 13, fontWeight: 600, letterSpacing: 0.5 } as const;

const Partner = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().slice(0, 255);
    if (!cleanEmail) return;
    setSubmitting(true);
    const { error } = await supabase.from("partner_inquiries").insert({
      name: name.trim().slice(0, 100) || null,
      email: cleanEmail,
      company: company.trim().slice(0, 120) || null,
      message: message.trim().slice(0, 2000) || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please email us directly at " + RECIPIENT);
      return;
    }
    toast.success("Thanks — we received your inquiry. We'll be in touch.");
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section
        className="section section-light"
        data-theme="light"
        style={{ paddingTop: 120, paddingBottom: 80, minHeight: "70vh" }}
      >
        <div className="hfh-container" style={{ maxWidth: 640 }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              marginBottom: 24,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Back home
          </a>

          <h1 className="section-header" style={{ marginBottom: 12 }}>
            Partner With Us
          </h1>
          <p className="section-sub" style={{ marginBottom: 32 }}>
            Athletes, creators, studios, clinics and brands: tell us what you want to build
            with High Frequency. Or email us at{" "}
            <a href={`mailto:${RECIPIENT}`} style={{ textDecoration: "underline" }}>
              {RECIPIENT}
            </a>
            .
          </p>

          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <label style={labelStyle}>
              <span style={labelText}>NAME (OPTIONAL)</span>
              <input
                type="text"
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              <span style={labelText}>EMAIL</span>
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              <span style={labelText}>COMPANY / BRAND (OPTIONAL)</span>
              <input
                type="text"
                maxLength={120}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              <span style={labelText}>WHAT DO YOU HAVE IN MIND? (OPTIONAL)</span>
              <textarea
                rows={6}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-purple btn-lg"
              style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Mail size={18} /> {submitting ? "Sending…" : "Send Partnership Inquiry"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Partner;
