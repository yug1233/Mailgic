import { useState, useEffect } from "react";
import { ArrowLeft, Mail, Send, Check, User, MessageSquare } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE
   Uses Netlify Forms — zero backend, emails go to
   m.ailgic@outlook.com automatically after setup
═══════════════════════════════════════════════════════════ */
export function ContactPage({ nav, Logo, Footer }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim())    { setError("Please enter your name.");    return; }
    if (!email.trim())   { setError("Please enter your email.");   return; }
    if (!message.trim()) { setError("Please enter your message."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Netlify Forms submission — sends directly to your email
      const formData = new FormData();
      formData.append("form-name", "contact");
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("subject", subject.trim() || "Message from Mailgic Contact Form");
      formData.append("message", message.trim());

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (res.ok) {
        setSent(true);
        setName(""); setEmail(""); setSubject(""); setMessage("");
      } else {
        throw new Error("Submit failed");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly at m.ailgic@outlook.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafbff" }}>

      {/* Sticky header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,.97)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(124,58,237,.07)",
        padding: "13px 28px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <Logo size={24} />
        <button onClick={() => nav("home")} style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "7px 14px", borderRadius: 11, fontWeight: 600, fontSize: 13,
          color: "#7C3AED", border: "1.5px solid rgba(124,58,237,.32)",
          background: "transparent", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif"
        }}>
          <ArrowLeft size={13} />Back to Home
        </button>
      </div>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg,#7C3AED,#6D28D9)",
        padding: "64px 24px 52px", textAlign: "center"
      }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 18px"
          }}>
            <Mail size={26} color="#fff" />
          </div>
          <h1 style={{
            fontFamily: "Syne,sans-serif", fontWeight: 800,
            fontSize: "clamp(26px,5vw,42px)", color: "#fff",
            marginBottom: 12, lineHeight: 1.15
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: 16, color: "rgba(255,255,255,.78)",
            maxWidth: 420, margin: "0 auto", lineHeight: 1.7
          }}>
            Have a question, feedback, or just want to say hi? We read every message and reply within 24 hours.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "52px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40, alignItems: "start" }}>

          {/* Left — info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {[
              {
                icon: <Mail size={18} />,
                label: "Email us directly",
                value: "m.ailgic@outlook.com",
                color: "#7C3AED"
              },
              {
                icon: <MessageSquare size={18} />,
                label: "Response time",
                value: "Within 24 hours",
                color: "#059669"
              },
              {
                icon: <User size={18} />,
                label: "Support hours",
                value: "Mon–Fri, 9am–6pm",
                color: "#0284c7"
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 16, padding: "18px 20px",
                border: "1px solid rgba(124,58,237,.09)",
                boxShadow: "0 2px 12px rgba(124,58,237,.04)",
                display: "flex", alignItems: "flex-start", gap: 14
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${item.color}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.color
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11.5, color: "#9ca3af", marginBottom: 3, fontWeight: 600, letterSpacing: .3, textTransform: "uppercase" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13.5, color: "#111827", fontWeight: 600 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            {/* What we can help with */}
            <div style={{
              background: "rgba(124,58,237,.04)", borderRadius: 16, padding: "20px",
              border: "1px solid rgba(124,58,237,.1)", marginTop: 4
            }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#7C3AED", marginBottom: 12, letterSpacing: .3, textTransform: "uppercase" }}>
                We can help with
              </div>
              {[
                "Questions about the product",
                "Billing & account issues",
                "Feature requests",
                "Bug reports",
                "Partnership enquiries",
                "General feedback",
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 13, color: "#374151", marginBottom: 8
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(124,58,237,.1)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Check size={10} color="#7C3AED" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            background: "#fff", borderRadius: 22, padding: "36px 34px",
            border: "1px solid rgba(124,58,237,.1)",
            boxShadow: "0 4px 32px rgba(124,58,237,.07)"
          }}>

            {/* Success state */}
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(5,150,105,.1)", border: "2px solid rgba(5,150,105,.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px"
                }}>
                  <Check size={28} color="#059669" />
                </div>
                <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 22, color: "#111827", marginBottom: 10 }}>
                  Message Sent!
                </h2>
                <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, maxWidth: 340, margin: "0 auto 28px" }}>
                  Thanks for reaching out. We've received your message and will get back to you within 24 hours.
                </p>
                <button onClick={() => setSent(false)} style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "11px 24px", borderRadius: 11, fontWeight: 600, fontSize: 14,
                  color: "#7C3AED", border: "1.5px solid rgba(124,58,237,.32)",
                  background: "transparent", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif"
                }}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 21, color: "#111827", marginBottom: 6 }}>
                  Send us a message
                </h2>
                <p style={{ fontSize: 13.5, color: "#9ca3af", marginBottom: 26 }}>
                  Fill in the form below and we'll get back to you shortly.
                </p>

                {/* Error */}
                {error && (
                  <div style={{
                    padding: "11px 14px", borderRadius: 10, marginBottom: 18,
                    background: "rgba(239,68,68,.05)", border: "1px solid rgba(239,68,68,.17)",
                    color: "#dc2626", fontSize: 13
                  }}>
                    {error}
                  </div>
                )}

                {/*
                  NETLIFY FORMS MAGIC:
                  The hidden form below is for Netlify's build-time detection.
                  The actual submission is handled by the handleSubmit function above.
                */}
                <form
                  name="contact"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  hidden
                >
                  <input type="text"    name="name" />
                  <input type="email"   name="email" />
                  <input type="text"    name="subject" />
                  <textarea             name="message" />
                </form>

                {/* Visible form */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  {/* Honeypot — hidden from humans, catches bots */}
                  <input name="bot-field" style={{ display: "none" }} />

                  {/* Name + Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{
                          width: "100%", padding: "12px 14px", borderRadius: 11,
                          border: "1.5px solid rgba(124,58,237,.16)", fontSize: 14,
                          color: "#111827", background: "#fff", outline: "none",
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          transition: "border-color .18s", boxSizing: "border-box"
                        }}
                        onFocus={e => e.target.style.borderColor = "#7C3AED"}
                        onBlur={e => e.target.style.borderColor = "rgba(124,58,237,.16)"}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                          width: "100%", padding: "12px 14px", borderRadius: 11,
                          border: "1.5px solid rgba(124,58,237,.16)", fontSize: 14,
                          color: "#111827", background: "#fff", outline: "none",
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          transition: "border-color .18s", boxSizing: "border-box"
                        }}
                        onFocus={e => e.target.style.borderColor = "#7C3AED"}
                        onBlur={e => e.target.style.borderColor = "rgba(124,58,237,.16)"}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                      Subject <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="What's it about?"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      style={{
                        width: "100%", padding: "12px 14px", borderRadius: 11,
                        border: "1.5px solid rgba(124,58,237,.16)", fontSize: 14,
                        color: "#111827", background: "#fff", outline: "none",
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        transition: "border-color .18s", boxSizing: "border-box"
                      }}
                      onFocus={e => e.target.style.borderColor = "#7C3AED"}
                      onBlur={e => e.target.style.borderColor = "rgba(124,58,237,.16)"}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                      Message *
                    </label>
                    <textarea
                      placeholder="Tell us what's on your mind..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={5}
                      style={{
                        width: "100%", padding: "13px 14px", borderRadius: 11,
                        border: "1.5px solid rgba(124,58,237,.16)", fontSize: 14,
                        color: "#111827", background: "#fff", outline: "none",
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        transition: "border-color .18s", resize: "vertical",
                        lineHeight: 1.7, boxSizing: "border-box"
                      }}
                      onFocus={e => e.target.style.borderColor = "#7C3AED"}
                      onBlur={e => e.target.style.borderColor = "rgba(124,58,237,.16)"}
                    />
                    <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 5, textAlign: "right" }}>
                      {message.length} / 2000
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "13px", borderRadius: 11, fontWeight: 700, fontSize: 15,
                      color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
                      background: loading
                        ? "linear-gradient(135deg,#7C3AED,#6D28D9)"
                        : "linear-gradient(135deg,#7C3AED,#6D28D9,#8B5CF6,#7C3AED)",
                      backgroundSize: "300% 300%",
                      animation: loading ? "none" : "gradBtn 4s ease infinite",
                      transition: "transform .2s, box-shadow .2s",
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      opacity: loading ? 0.7 : 1,
                      marginTop: 4
                    }}
                    onMouseEnter={e => { if (!loading) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(124,58,237,.32)"; }}}
                    onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
                  >
                    {loading ? (
                      <>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", animation: "spin 1s linear infinite" }} />
                        Sending…
                      </>
                    ) : (
                      <><Send size={15} />Send Message</>
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", lineHeight: 1.6 }}>
                    By sending this message you agree to our{" "}
                    <button onClick={() => nav("privacy")} style={{ color: "#7C3AED", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600 }}>
                      Privacy Policy
                    </button>
                    . We never share your information.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media(max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer nav={nav} />
    </div>
  );
}
