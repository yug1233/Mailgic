import { useEffect } from "react";
import { ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import { BlogPage, BlogPostPage } from "./Blog.jsx";

/* ═══════════════════════════════════════════════════════════
   BLOG DATA — 5 articles targeting high-volume Google searches
   Keywords chosen: 60k-200k monthly searches each
═══════════════════════════════════════════════════════════ */
export const BLOG_POSTS = [
  {
    id: "how-to-write-professional-email",
    title: "How to Write a Professional Email (With Examples)",
    desc: "A complete guide to writing professional emails that get responses. Includes subject line tips, tone, structure, and real examples.",
    date: "March 20, 2025",
    readTime: "6 min read",
    category: "Email Tips",
    content: `
      <h2>Why Professional Emails Matter</h2>
      <p>Every email you send is a reflection of your professionalism. Whether you're writing to a client, a colleague, or a hiring manager, the way you write shapes how people perceive you. A well-written professional email can open doors — a poorly written one can close them.</p>
      <p>The good news? Writing great professional emails is a skill you can learn. This guide breaks it down step by step.</p>

      <h2>The 5-Part Structure of a Professional Email</h2>
      <p>Every professional email has five core parts. Get these right and your emails will always land well.</p>

      <h3>1. Subject Line</h3>
      <p>Your subject line determines whether your email gets opened. Keep it specific and under 50 characters. Compare these two:</p>
      <ul>
        <li>❌ "Quick question"</li>
        <li>✅ "Follow-up: Project proposal from Monday's call"</li>
      </ul>
      <p>The second one tells the reader exactly what to expect. Use Mailgic to generate subject lines that get opens.</p>

      <h3>2. Greeting</h3>
      <p>Always use the recipient's name. "Hi Sarah," is warmer than "Dear Sir/Madam" and more professional than just "Hey." If you don't know the person's name, "Hi there," works fine.</p>

      <h3>3. Opening Line</h3>
      <p>Get to the point in the first sentence. Don't start with "I hope this email finds you well" — everyone knows it's filler. Instead, immediately state why you're writing:</p>
      <ul>
        <li>"I'm reaching out to follow up on our conversation from Tuesday."</li>
        <li>"I wanted to share the project proposal we discussed."</li>
        <li>"I'm writing to apply for the Senior Developer position."</li>
      </ul>

      <h3>4. Body</h3>
      <p>Keep your body concise — 3 to 5 sentences for most emails. Use short paragraphs. If you have multiple points, use a numbered list. Never write walls of text.</p>

      <h3>5. Closing + Sign-off</h3>
      <p>End with a clear next step or call to action. Then sign off professionally:</p>
      <ul>
        <li>"Best regards," — universal, always appropriate</li>
        <li>"Kind regards," — slightly warmer</li>
        <li>"Thanks," — casual but professional</li>
        <li>"Looking forward to hearing from you," — great for follow-ups</li>
      </ul>

      <h2>Tone: How Formal Should You Be?</h2>
      <p>Match your tone to the relationship. Writing to a CEO you've never met? Stay formal. Writing to a colleague you work with daily? A casual tone is fine. When in doubt, be slightly more formal — it's easy to relax later, but hard to recover from seeming disrespectful.</p>
      <p>Mailgic lets you choose from 5 tones: Professional, Friendly, Casual, Persuasive, and Formal. Pick the one that fits the situation.</p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Being too vague:</strong> "Can we talk?" tells the reader nothing. Be specific about what you need and when.</li>
        <li><strong>Burying the ask:</strong> Put your main request in the first paragraph, not the last.</li>
        <li><strong>Ignoring the subject line:</strong> A bad subject line is the number one reason professional emails go unanswered.</li>
        <li><strong>No proofreading:</strong> Typos undermine your credibility. Always read your email once before sending.</li>
        <li><strong>CC'ing everyone:</strong> Only include people who genuinely need to see the email.</li>
      </ul>

      <h2>Real Example: Professional Follow-Up Email</h2>
      <blockquote>
        <strong>Subject:</strong> Following up on our Q2 proposal<br/><br/>
        Hi Marcus,<br/><br/>
        I wanted to follow up on the proposal I sent over last Thursday. I know things get busy, so I just wanted to make sure it didn't get lost in your inbox.<br/><br/>
        I'd love to jump on a 15-minute call this week to walk you through the key points and answer any questions. Would Tuesday or Wednesday afternoon work for you?<br/><br/>
        Looking forward to connecting.<br/><br/>
        Best regards,<br/>
        Alex
      </blockquote>

      <h2>Generate Your Professional Email in Seconds</h2>
      <p>You don't have to write every email from scratch. Mailgic's AI email generator creates professional, ready-to-send emails in seconds. Just describe what your email is about, pick a tone, and hit generate. Try it free — no account required.</p>
    `
  },
  {
    id: "best-ai-email-generators",
    title: "5 Best AI Email Generators in 2025 (Free & Paid)",
    desc: "Comparing the top AI email writing tools in 2025. Find out which AI email generator is fastest, most accurate, and best for your use case.",
    date: "March 18, 2025",
    readTime: "7 min read",
    category: "Tools",
    content: `
      <h2>The Best AI Email Generators in 2025</h2>
      <p>AI email generators have exploded in popularity — and for good reason. They save hours of writing time every week, improve email quality, and help non-native speakers sound fluent. But not all AI email tools are equal. Here's an honest comparison of the top options in 2025.</p>

      <h2>What Makes a Great AI Email Generator?</h2>
      <ul>
        <li><strong>Speed:</strong> How fast does it generate an email?</li>
        <li><strong>Quality:</strong> Does it sound natural and human?</li>
        <li><strong>Tone control:</strong> Can you adjust formality and style?</li>
        <li><strong>Free tier:</strong> What do you get without paying?</li>
        <li><strong>Ease of use:</strong> How simple is the interface?</li>
      </ul>

      <h2>1. Mailgic — Best Free AI Email Generator</h2>
      <p>Mailgic is purpose-built for email generation. Unlike general AI tools, it's designed specifically to write emails — which means the quality is consistently higher for email use cases.</p>
      <ul>
        <li>✅ Generates a complete email in under 5 seconds</li>
        <li>✅ 5 tone options: Professional, Friendly, Casual, Persuasive, Formal</li>
        <li>✅ 3 length options: Short, Medium, Detailed</li>
        <li>✅ Free plan: 10 emails/month, no credit card required</li>
        <li>✅ Saves email history on Pro plan</li>
        <li>❌ No browser extension yet</li>
      </ul>
      <p><strong>Best for:</strong> Anyone who wants a dedicated, easy-to-use AI email writer without paying.</p>

      <h2>2. ChatGPT — Most Flexible</h2>
      <p>ChatGPT can write emails, but it requires you to write a detailed prompt every time. There's no dedicated email interface, no tone picker, and no email history. It's powerful but not optimized for this use case.</p>
      <ul>
        <li>✅ Extremely capable and flexible</li>
        <li>✅ Free tier available</li>
        <li>❌ Requires writing detailed prompts</li>
        <li>❌ No dedicated email features</li>
        <li>❌ Often adds unnecessary filler</li>
      </ul>

      <h2>3. Lavender — Best for Sales Teams</h2>
      <p>Lavender is an AI email tool built specifically for sales outreach. It integrates with Gmail and Outlook and scores your emails in real time. It's excellent for sales but overkill for general use.</p>
      <ul>
        <li>✅ Real-time email scoring</li>
        <li>✅ Gmail and Outlook integration</li>
        <li>❌ Paid-only for most features</li>
        <li>❌ Focused on sales, not general use</li>
      </ul>

      <h2>4. Copy.ai — Best for Marketers</h2>
      <p>Copy.ai started as a marketing copy tool and added email capabilities. It's great for promotional emails and newsletters but less suited for professional one-to-one correspondence.</p>
      <ul>
        <li>✅ Great for marketing emails and newsletters</li>
        <li>✅ Large template library</li>
        <li>❌ Expensive for individual users</li>
        <li>❌ Outputs often feel like marketing copy, not genuine emails</li>
      </ul>

      <h2>5. Rytr — Best Budget Option</h2>
      <p>Rytr is a budget AI writing tool with email templates. The quality is decent and the price is low, but the tone control is limited and outputs can feel generic.</p>
      <ul>
        <li>✅ Very affordable</li>
        <li>✅ Email templates included</li>
        <li>❌ Limited tone control</li>
        <li>❌ Output quality inconsistent</li>
      </ul>

      <h2>Verdict</h2>
      <p>If you want the best free AI email generator for everyday use, Mailgic is the clear winner. It's purpose-built for email, fast, has proper tone control, and doesn't require you to craft detailed prompts. Try it free — no credit card needed.</p>
    `
  },
  {
    id: "how-to-write-follow-up-email",
    title: "How to Write a Follow-Up Email That Actually Gets a Reply",
    desc: "Learn how to write follow-up emails that get responses. Includes timing tips, subject lines, real templates, and what to avoid.",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Email Tips",
    content: `
      <h2>Why Most Follow-Up Emails Fail</h2>
      <p>The average professional receives over 120 emails per day. Emails get missed — not because the person is rude or uninterested, but because inboxes are overwhelming. A well-crafted follow-up email isn't pushy. It's a helpful nudge that makes it easy for the other person to respond.</p>
      <p>Most follow-ups fail because they're either too aggressive or too vague. Here's how to do it right.</p>

      <h2>When Should You Send a Follow-Up?</h2>
      <ul>
        <li><strong>After sending a proposal:</strong> Follow up after 3–5 business days</li>
        <li><strong>After a meeting or call:</strong> Follow up within 24 hours while it's fresh</li>
        <li><strong>After no response:</strong> Follow up after 5–7 business days</li>
        <li><strong>Second follow-up:</strong> Wait another 7–10 days</li>
        <li><strong>Stop at 3:</strong> Three follow-ups is the maximum. After that, move on.</li>
      </ul>

      <h2>The Perfect Follow-Up Structure</h2>

      <h3>Subject Line</h3>
      <p>Reference your previous email to create context instantly:</p>
      <ul>
        <li>"Re: Project proposal — quick follow-up"</li>
        <li>"Following up from Tuesday's call"</li>
        <li>"One more thought on [topic]"</li>
      </ul>

      <h3>Opening Line</h3>
      <p>Acknowledge that you're following up without sounding desperate:</p>
      <ul>
        <li>"I wanted to follow up on my email from last week."</li>
        <li>"I know things get busy — just wanted to make sure this didn't get buried."</li>
        <li>"Circling back on the proposal I shared on Monday."</li>
      </ul>

      <h3>Add New Value</h3>
      <p>The best follow-ups add something new. Don't just repeat your original message. Add a new angle, a relevant insight, or a simpler question.</p>

      <h3>Clear Call to Action</h3>
      <p>End with one specific ask — not multiple questions:</p>
      <ul>
        <li>"Would a 15-minute call Thursday work for you?"</li>
        <li>"Could you let me know if you'd like to move forward?"</li>
        <li>"Is this still a priority for your team?"</li>
      </ul>

      <h2>Follow-Up Email Template: After Sending a Proposal</h2>
      <blockquote>
        <strong>Subject:</strong> Following up on the proposal I sent Thursday<br/><br/>
        Hi [Name],<br/><br/>
        I wanted to follow up on the proposal I sent over last Thursday. I know things get hectic, so I just wanted to make sure it landed in your inbox.<br/><br/>
        Happy to walk you through the details on a quick call or answer any questions by email — whatever's easier for you. Would later this week work?<br/><br/>
        Best,<br/>
        [Your Name]
      </blockquote>

      <h2>Follow-Up Email Template: After a Job Interview</h2>
      <blockquote>
        <strong>Subject:</strong> Thank you — following up on the interview<br/><br/>
        Hi [Name],<br/><br/>
        Thank you again for taking the time to meet with me. I really enjoyed learning more about the team and what you're building.<br/><br/>
        I remain very interested in the role and would love to discuss next steps when the timing is right. Please don't hesitate to reach out if you need anything else from my side.<br/><br/>
        Looking forward to hearing from you.<br/><br/>
        Best regards,<br/>
        [Your Name]
      </blockquote>

      <h2>Generate Your Follow-Up Email with AI</h2>
      <p>Writing the perfect follow-up email from scratch takes time. Mailgic's AI email generator can write a professional, personalized follow-up email in seconds. Just describe the context, choose a tone, and get a ready-to-send email instantly.</p>
    `
  },
  {
    id: "cold-email-templates",
    title: "10 Cold Email Templates That Actually Get Responses in 2025",
    desc: "Real cold email templates for sales, partnerships, networking, and job hunting. Each template is tested and optimized for response rates.",
    date: "March 12, 2025",
    readTime: "8 min read",
    category: "Templates",
    content: `
      <h2>What Makes a Cold Email Work?</h2>
      <p>A cold email is one sent to someone who doesn't know you. The bar for getting a response is high — you have about 3 seconds to earn someone's attention before they delete your email. These templates are built on what actually works in 2025.</p>
      <p>The formula is simple: show you know them, explain what you offer, make one clear ask. Short, relevant, and respectful of their time.</p>

      <h2>Template 1: Sales Outreach — Problem + Solution</h2>
      <blockquote>
        <strong>Subject:</strong> [Company] — a quick idea on [specific challenge]<br/><br/>
        Hi [First Name],<br/><br/>
        I noticed [specific thing about their company]. A lot of [their type of company] we work with struggle with [specific problem].<br/><br/>
        We've helped companies like [similar company] solve this by [brief solution]. The result was [specific outcome].<br/><br/>
        Would it be worth a 15-minute call to see if we could do the same for you?<br/><br/>
        Best,<br/>
        [Your Name]
      </blockquote>

      <h2>Template 2: Partnership Request</h2>
      <blockquote>
        <strong>Subject:</strong> Partnership idea — [Your Company] x [Their Company]<br/><br/>
        Hi [First Name],<br/><br/>
        I've been following [Their Company] for a while and really admire [specific thing]. I'm the founder of [Your Company] — we [one-line description].<br/><br/>
        I think there's a natural fit between what we do and what you're building. Specifically, [brief idea for how you could work together].<br/><br/>
        Would you be open to a quick call this week to explore this?<br/><br/>
        Warm regards,<br/>
        [Your Name]
      </blockquote>

      <h2>Template 3: Networking — Asking for Advice</h2>
      <blockquote>
        <strong>Subject:</strong> Quick question from a fellow [industry] professional<br/><br/>
        Hi [First Name],<br/><br/>
        I came across your work on [platform] and have been really impressed by [specific thing]. I'm [brief about yourself] and I'm working on [brief context].<br/><br/>
        I'd love to get 15 minutes of your time to ask a couple of questions about [specific topic]. Completely understand if you're too busy — but if you're open to it, I'd really value your perspective.<br/><br/>
        Thanks,<br/>
        [Your Name]
      </blockquote>

      <h2>Template 4: Job Application — Proactive Outreach</h2>
      <blockquote>
        <strong>Subject:</strong> [Your Role] — interested in joining the [Company] team<br/><br/>
        Hi [First Name],<br/><br/>
        I've been following [Company] for some time and have been impressed by [specific thing]. I'm a [your role] with [X years] of experience in [relevant area].<br/><br/>
        I noticed you're growing quickly and thought there might be a fit. I've attached my resume in case it's useful.<br/><br/>
        No pressure at all — just wanted to put my name in the hat.<br/><br/>
        Best,<br/>
        [Your Name]
      </blockquote>

      <h2>Template 5: Investor Outreach</h2>
      <blockquote>
        <strong>Subject:</strong> [Company] — [one key metric]<br/><br/>
        Hi [First Name],<br/><br/>
        I'm the founder of [Company]. We [one sentence on what you do and for whom]. We're currently at [key traction metric] and growing [X]% month-on-month.<br/><br/>
        We're raising a [round size] seed round. Given your portfolio includes [relevant company], I thought there might be a fit.<br/><br/>
        Would you be open to a 20-minute call to learn more?<br/><br/>
        Best,<br/>
        [Your Name]
      </blockquote>

      <h2>Rules for All Cold Emails</h2>
      <ul>
        <li><strong>Keep it under 100 words:</strong> Shorter emails get more responses. Every sentence must earn its place.</li>
        <li><strong>One ask only:</strong> Multiple asks kill response rates. Pick the single most important action you want.</li>
        <li><strong>Personalize the first line:</strong> Generic openers get ignored. Reference something real and specific.</li>
        <li><strong>Send Tuesday–Thursday:</strong> Emails sent Monday and Friday get lower open rates.</li>
        <li><strong>Follow up once:</strong> One follow-up after 5 days doubles your response rate.</li>
      </ul>

      <h2>Generate Cold Emails Instantly</h2>
      <p>Use Mailgic's AI email generator to create personalized cold emails in seconds. Choose the "Persuasive" tone for sales and outreach, or "Professional" for networking and partnerships.</p>
    `
  },
  {
    id: "how-to-apologize-in-email",
    title: "How to Write an Apology Email (That Actually Sounds Sincere)",
    desc: "A step-by-step guide to writing apology emails that repair relationships. Includes real examples for professional and personal situations.",
    date: "March 8, 2025",
    readTime: "5 min read",
    category: "Email Tips",
    content: `
      <h2>Why Getting Apology Emails Right Matters</h2>
      <p>A bad apology email can make things worse than saying nothing. A good one can repair a relationship, restore trust, and move things forward. The difference usually comes down to three things: taking full responsibility, not making excuses, and being specific about what went wrong.</p>

      <h2>The 5 Elements of a Genuine Apology Email</h2>

      <h3>1. Acknowledge What Happened — Specifically</h3>
      <p>Don't be vague. "I'm sorry if I caused any inconvenience" is not an apology. Name what happened:</p>
      <ul>
        <li>❌ "I'm sorry if you were upset."</li>
        <li>✅ "I'm sorry that I missed the 3pm deadline we agreed on."</li>
      </ul>

      <h3>2. Take Full Responsibility</h3>
      <p>Don't dilute the apology with "but" statements. "I'm sorry but the traffic was terrible" shifts blame. Own the outcome:</p>
      <ul>
        <li>❌ "I'm sorry but I wasn't given all the information."</li>
        <li>✅ "I should have asked for clarification earlier. That's on me."</li>
      </ul>

      <h3>3. Express Genuine Regret</h3>
      <p>Show you understand how your actions affected the other person:</p>
      <ul>
        <li>"I understand this caused delays on your end and I genuinely regret that."</li>
        <li>"I know this put you in a difficult position, and I'm truly sorry for that."</li>
      </ul>

      <h3>4. Explain What You'll Do Differently</h3>
      <p>An apology without a plan to change is just words:</p>
      <ul>
        <li>"Going forward, I'll set a reminder 24 hours before all deadlines."</li>
        <li>"I've already updated our process so this won't happen again."</li>
      </ul>

      <h3>5. Offer to Make It Right</h3>
      <ul>
        <li>"I'd like to offer a 20% discount on your next order as a gesture of goodwill."</li>
        <li>"I can have the corrected report to you by end of day today."</li>
      </ul>

      <h2>Apology Email Example 1: Missing a Deadline</h2>
      <blockquote>
        <strong>Subject:</strong> Apology — the report I owed you today<br/><br/>
        Hi James,<br/><br/>
        I want to apologize sincerely for missing the report deadline we agreed on. I know you were counting on receiving it this morning, and I let you down.<br/><br/>
        There's no excuse for it. I should have communicated earlier when I realized I was behind. That's on me.<br/><br/>
        I have the completed report ready now and am sending it with this email. I've also put systems in place to make sure this doesn't happen again.<br/><br/>
        Best regards,<br/>
        Alex
      </blockquote>

      <h2>Apology Email Example 2: Customer Service</h2>
      <blockquote>
        <strong>Subject:</strong> We're sorry — here's what happened and what we're doing about it<br/><br/>
        Hi Sarah,<br/><br/>
        I want to personally apologize for the experience you had with our service last week. What happened was completely unacceptable, and you deserved better from us.<br/><br/>
        We have already identified the issue and put a fix in place to prevent it from happening to other customers. As a token of our apology, I'd like to offer you a full refund and a complimentary 3-month extension of your subscription.<br/><br/>
        Thank you for your patience and for giving us the chance to make this right.<br/><br/>
        Warm regards,<br/>
        Support Team
      </blockquote>

      <h2>What to Avoid in an Apology Email</h2>
      <ul>
        <li><strong>"I'm sorry you feel that way"</strong> — This is not an apology. It blames the other person for their reaction.</li>
        <li><strong>Over-explaining</strong> — Two sentences of context is fine. A paragraph of excuses is not.</li>
        <li><strong>Passive voice</strong> — "Mistakes were made" doesn't take responsibility. Say "I made a mistake."</li>
        <li><strong>Asking for forgiveness immediately</strong> — Give the other person space. Don't pressure them to forgive you in the same email.</li>
      </ul>

      <h2>Generate Your Apology Email with AI</h2>
      <p>Writing an apology email when emotions are running high is hard. Mailgic's AI email generator can help you find the right words — professional, sincere, and appropriately toned. Try the "Professional" or "Friendly" tone. Generate one in seconds and customize as needed.</p>
    `
  },
];

/* ═══════════════════════════════════════════════════════════
   SHARED BLOG CSS — injected once
═══════════════════════════════════════════════════════════ */
const BLOG_CSS = `
  .blog-content h2{font-family:Syne,sans-serif;font-weight:800;font-size:22px;color:#111827;margin:36px 0 12px}
  .blog-content h3{font-family:Syne,sans-serif;font-weight:700;font-size:17px;color:#111827;margin:24px 0 10px}
  .blog-content p{margin:0 0 16px;font-size:16px;color:#374151;line-height:1.82}
  .blog-content ul{padding-left:22px;margin:12px 0 18px;display:flex;flex-direction:column;gap:7px}
  .blog-content li{font-size:15px;color:#374151;line-height:1.7}
  .blog-content strong{font-weight:600;color:#111827}
  .blog-content blockquote{background:#fafbff;border-left:3px solid #7C3AED;border-radius:0 12px 12px 0;padding:18px 22px;margin:20px 0;font-size:14.5px;line-height:1.85;color:#374151}
`;

/* ═══════════════════════════════════════════════════════════
   BLOG LIST PAGE  —  /blog
═══════════════════════════════════════════════════════════ */
export function BlogPage({ nav, Logo, Footer }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fafbff" }}>
      <style>{BLOG_CSS}</style>

      {/* Hero header */}
      <div style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 50,
            fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,.15)", color: "#fff",
            border: "1px solid rgba(255,255,255,.25)", marginBottom: 18 }}>
            ✦ Email Tips & Guides
          </span>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800,
            fontSize: "clamp(28px,5vw,48px)", color: "#fff", marginBottom: 14, lineHeight: 1.1 }}>
            The Email Writing Blog
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.78)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Practical guides on writing professional emails, cold outreach, follow-ups, and more.
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 24 }}>
          {BLOG_POSTS.map(post => (
            <article key={post.id}
              onClick={() => nav(`blog-${post.id}`)}
              style={{ background: "#fff", borderRadius: 18, border: "1px solid rgba(124,58,237,.1)",
                overflow: "hidden", cursor: "pointer", transition: "all .22s",
                boxShadow: "0 2px 12px rgba(124,58,237,.05)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,.13)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(124,58,237,.05)"; }}>
              {/* Purple accent bar top */}
              <div style={{ height: 4, background: "linear-gradient(90deg,#7C3AED,#8B5CF6)" }} />
              <div style={{ padding: "22px 24px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: "rgba(124,58,237,.08)", color: "#7C3AED" }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 17,
                  color: "#111827", marginBottom: 10, lineHeight: 1.35 }}>{post.title}</h2>
                <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.65, marginBottom: 16 }}>{post.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11.5, color: "#9ca3af" }}>{post.date}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#7C3AED",
                    display: "flex", alignItems: "center", gap: 4 }}>
                    Read more <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 52, background: "linear-gradient(135deg,#7C3AED,#6D28D9)",
          borderRadius: 20, padding: "36px 32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 24,
            color: "#fff", marginBottom: 10 }}>
            Stop Writing Emails Manually
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", maxWidth: 420,
            margin: "0 auto 22px", lineHeight: 1.65 }}>
            Use Mailgic's free AI email generator to write professional emails in seconds.
          </p>
          <button onClick={() => nav("generator")}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 26px",
              borderRadius: 11, fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer",
              background: "rgba(255,255,255,.15)", border: "1.5px solid rgba(255,255,255,.3)",
              fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <Sparkles size={14} />Try It Free
          </button>
        </div>
      </div>

      <Footer nav={nav} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BLOG POST PAGE  —  /blog-[id]
═══════════════════════════════════════════════════════════ */
export function BlogPostPage({ postId, nav, Logo, Footer, NotFound }) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [postId]);

  if (!post) return <NotFound nav={nav} />;

  const others = BLOG_POSTS.filter(p => p.id !== postId).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: "#fafbff" }}>
      <style>{BLOG_CSS}</style>

      {/* Sticky top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,.97)", backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(124,58,237,.07)",
        padding: "13px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo size={24} />
        <button onClick={() => nav("blog")}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px",
            borderRadius: 11, fontWeight: 600, fontSize: 13, color: "#7C3AED",
            border: "1.5px solid rgba(124,58,237,.32)", background: "transparent", cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <ArrowLeft size={13} />All Articles
        </button>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Meta */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ padding: "3px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: "rgba(124,58,237,.08)", color: "#7C3AED" }}>{post.category}</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.readTime}</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>·</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.date}</span>
          </div>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800,
            fontSize: "clamp(24px,4vw,38px)", color: "#111827", lineHeight: 1.2, marginBottom: 16 }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.75,
            borderLeft: "3px solid #7C3AED", paddingLeft: 16 }}>{post.desc}</p>
        </div>

        {/* Top inline CTA */}
        <div style={{ background: "rgba(124,58,237,.04)", border: "1px solid rgba(124,58,237,.12)",
          borderRadius: 14, padding: "18px 22px", marginBottom: 36,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111827", marginBottom: 3 }}>
              ✦ Try Mailgic's Free AI Email Generator
            </div>
            <div style={{ fontSize: 12.5, color: "#6b7280" }}>Write professional emails in seconds. No login required.</div>
          </div>
          <button onClick={() => nav("generator")}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 20px",
              borderRadius: 11, fontWeight: 700, fontSize: 13, color: "#fff", cursor: "pointer",
              background: "linear-gradient(135deg,#7C3AED,#6D28D9)", border: "none",
              fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <Sparkles size={13} />Generate Email
          </button>
        </div>

        {/* Article body */}
        <div className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Bottom CTA */}
        <div style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", borderRadius: 18,
          padding: "32px 28px", textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 21,
            color: "#fff", marginBottom: 10 }}>
            Generate This Email in Seconds
          </h3>
          <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.75)", marginBottom: 20 }}>
            Use Mailgic's free AI email generator — no account needed.
          </p>
          <button onClick={() => nav("generator")}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 26px",
              borderRadius: 11, fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer",
              background: "rgba(255,255,255,.15)", border: "1.5px solid rgba(255,255,255,.3)",
              fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <Sparkles size={14} />Try Free Now
          </button>
        </div>

        {/* More articles */}
        {others.length > 0 && (
          <div style={{ marginTop: 52 }}>
            <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 18,
              color: "#111827", marginBottom: 18 }}>More Articles</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {others.map(p => (
                <div key={p.id} onClick={() => nav(`blog-${p.id}`)}
                  style={{ padding: "16px 20px", background: "#fff", borderRadius: 12,
                    border: "1px solid rgba(124,58,237,.09)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 12, transition: "all .18s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C3AED"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,.09)"; }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{p.readTime} · {p.category}</div>
                  </div>
                  <ChevronRight size={15} color="#7C3AED" style={{ flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer nav={nav} />
    </div>
  );
}
