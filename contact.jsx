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
        name="name"   // ✅ FIXED
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
        name="email"   // ✅ FIXED
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
      name="subject"   // ✅ FIXED
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
      name="message"   // ✅ FIXED
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

  {/* Submit button stays SAME */}
</form>
