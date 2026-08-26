import { useState, FormEvent } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RECIPIENT = "Hello@highfrequencyhw.com";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
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
            href="/highfrequencyhealth"
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
            Contact Us
          </h1>
          <p className="section-sub" style={{ marginBottom: 32 }}>
            Send us a message and we'll get back to you at{" "}
            <a href={`mailto:${RECIPIENT}`} style={{ textDecoration: "underline" }}>
              {RECIPIENT}
            </a>
            .
          </p>

          <form
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
                NAME
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: "12px 14px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
                EMAIL
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "12px 14px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
                MESSAGE
              </span>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  padding: "12px 14px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: 8,
                  fontSize: 15,
                  background: "#fff",
                  resize: "vertical",
                }}
              />
            </label>

            <button
              type="submit"
              className="btn btn-purple btn-lg"
              style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Mail size={18} /> Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
