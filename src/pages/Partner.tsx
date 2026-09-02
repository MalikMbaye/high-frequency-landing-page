import { useState, FormEvent } from "react";
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Partnership inquiry — ${company.trim().slice(0, 80) || name.trim().slice(0, 80) || "website"}`
    );
    const body = encodeURIComponent(
      `Name: ${name.trim().slice(0, 100)}\nEmail: ${email.trim().slice(0, 255)}\nCompany / Brand: ${company
        .trim()
        .slice(0, 120)}\n\n${message.trim().slice(0, 2000)}`
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
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
              <span style={labelText}>NAME</span>
              <input
                type="text"
                required
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
              <span style={labelText}>COMPANY / BRAND</span>
              <input
                type="text"
                maxLength={120}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              <span style={labelText}>WHAT DO YOU HAVE IN MIND?</span>
              <textarea
                required
                rows={6}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </label>

            <button
              type="submit"
              className="btn btn-purple btn-lg"
              style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Mail size={18} /> Send Partnership Inquiry
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Partner;
