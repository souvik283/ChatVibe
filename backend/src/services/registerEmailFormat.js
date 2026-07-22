
export function registerEmailFormat (name) {
return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to ChatVibe</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Sans:wght@400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0e0a1a;
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 620px;
      margin: 40px auto;
      padding: 0 16px 60px;
    }

    /* ── Top bar ── */
    .topbar {
      text-align: center;
      padding: 28px 0 20px;
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .logo-icon {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #9b5de5, #c77dff);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon svg { display: block; }

    .logo-name {
      font-family: 'Sora', sans-serif;
      font-weight: 700;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: -0.5px;
    }

    /* ── Card ── */
    .card {
      background: #160f2b;
      border: 1px solid #2e1f55;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(155, 93, 229, 0.12);
    }

    /* ── Hero banner ── */
    .hero {
      background: linear-gradient(135deg, #2d1060 0%, #6a22b8 60%, #9b5de5 100%);
      padding: 52px 40px 44px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 220px; height: 220px;
      background: rgba(255,255,255,0.05);
      border-radius: 50%;
    }

    .hero::after {
      content: '';
      position: absolute;
      bottom: -80px; left: -40px;
      width: 260px; height: 260px;
      background: rgba(255,255,255,0.04);
      border-radius: 50%;
    }

    .hero-emoji {
      font-size: 52px;
      line-height: 1;
      margin-bottom: 18px;
      display: block;
    }

    .hero h1 {
      font-family: 'Sora', sans-serif;
      font-size: 30px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }

    .hero p {
      font-size: 15px;
      color: rgba(255,255,255,0.75);
      line-height: 1.6;
      max-width: 380px;
      margin: 0 auto;
    }

    /* ── Body content ── */
    .content {
      padding: 40px 40px 36px;
    }

    .greeting {
      font-size: 15px;
      color: #c0aee8;
      margin-bottom: 18px;
      line-height: 1.7;
    }

    .greeting strong {
      color: #e5d9ff;
      font-weight: 600;
    }

    /* ── Feature tiles ── */
    .features {
      display: table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 28px 0;
    }

    .features-row {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
    }

    .feature-tile {
      flex: 1;
      background: #1e1238;
      border: 1px solid #2e1f55;
      border-radius: 14px;
      padding: 18px 16px;
    }

    .feature-icon {
      font-size: 24px;
      margin-bottom: 10px;
      display: block;
    }

    .feature-title {
      font-family: 'Sora', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #e5d9ff;
      margin-bottom: 4px;
    }

    .feature-desc {
      font-size: 12px;
      color: #8b7db0;
      line-height: 1.5;
    }

    /* ── CTA Button ── */
    .cta-wrap {
      text-align: center;
      margin: 32px 0 28px;
    }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #8b2fe6, #b866ff);
      color: #ffffff;
      font-family: 'Sora', sans-serif;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      padding: 16px 44px;
      border-radius: 50px;
      letter-spacing: 0.2px;
      box-shadow: 0 8px 28px rgba(155, 93, 229, 0.45);
    }

    /* ── Divider ── */
    .divider {
      border: none;
      border-top: 1px solid #2e1f55;
      margin: 28px 0;
    }

    /* ── Help note ── */
    .help-note {
      background: #1a0e35;
      border-left: 3px solid #7b3fe4;
      border-radius: 0 10px 10px 0;
      padding: 14px 18px;
      font-size: 13px;
      color: #9e8cbf;
      line-height: 1.6;
    }

    .help-note a {
      color: #c77dff;
      text-decoration: none;
      font-weight: 500;
    }

    /* ── Footer ── */
    .footer {
      padding: 28px 40px 32px;
      background: #100c22;
      text-align: center;
      border-top: 1px solid #1e1535;
    }

    .social-links {
      margin-bottom: 16px;
    }

    .social-links a {
      display: inline-block;
      margin: 0 6px;
      width: 34px;
      height: 34px;
      background: #1e1238;
      border: 1px solid #2e1f55;
      border-radius: 8px;
      line-height: 34px;
      font-size: 15px;
      text-decoration: none;
    }

    .footer-text {
      font-size: 12px;
      color: #5a4d77;
      line-height: 1.7;
    }

    .footer-text a {
      color: #7b6aa0;
      text-decoration: none;
    }

    .footer-text a:hover { text-decoration: underline; }

    .footer-brand {
      font-family: 'Sora', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #7b3fe4;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>

<div class="wrapper">

  <!-- Logo -->
  <div class="topbar">
    <span class="logo">
      <span class="logo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            fill="white" opacity="0.9"/>
        </svg>
      </span>
      <span class="logo-name">ChatVibe</span>
    </span>
  </div>

  <!-- Card -->
  <div class="card">

    <!-- Hero -->
    <div class="hero">
      <span class="hero-emoji">🎉</span>
      <h1>You're officially in!</h1>
      <p>${name} <br/> Your ChatVibe account is ready. Welcome to a place where every conversation flows effortlessly.</p>
    </div>

    <!-- Content -->
    <div class="content">

      <p class="greeting">
        Hey <strong>there</strong> 👋<br/>
        We're thrilled to have you on board. Your account has been successfully created and is ready to use. Start chatting, create groups, and connect with people that matter.
      </p>

      <!-- Features -->
      <div class="features-row">
        <div class="feature-tile">
          <span class="feature-icon">💬</span>
          <div class="feature-title">Instant Messaging</div>
          <div class="feature-desc">Real-time chats with zero delay, always in sync.</div>
        </div>
        
      <div class="features-row">
        <div class="feature-tile">
          <span class="feature-icon">🔒</span>
          <div class="feature-title">End-to-End Encrypted</div>
          <div class="feature-desc">Your messages stay private — always.</div>
        </div>
        
      </div>

      <!-- CTA -->
      <div class="cta-wrap">
        <a href="#" class="cta-btn">Open ChatVibe →</a>
      </div>

      <hr class="divider"/>

      <!-- Help note -->
      <div class="help-note">
        Didn't create this account? No worries — just <a href="#">contact our support team</a> and we'll sort it out right away.
      </div>

    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-brand">ChatVibe</div>
      <div class="social-links">
        <a href="#" title="Twitter">𝕏</a>
        <a href="#" title="Instagram">📸</a>
        <a href="#" title="LinkedIn">in</a>
      </div>
      <div class="footer-text">
        You received this email because an account was created with your address.<br/>
        <a href="#">Unsubscribe</a> · <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a><br/><br/>
        © 2026 ChatVibe Inc. · Rajarhat-Newtown, Kolkata, India
      </div>
    </div>

  </div>
</div>

</body>
</html>
`
}