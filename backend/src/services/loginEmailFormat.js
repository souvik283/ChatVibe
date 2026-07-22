export async function loginEmailFormat(name) {
  const locRes = await fetch("https://ipapi.co/json/");
  const location = await locRes.json();
console.log(location)
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Login Detected - ChatVibe</title>
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
      background: linear-gradient(135deg, #1a0a0a 0%, #6b1a1a 55%, #9b2020 100%);
      padding: 48px 40px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 220px; height: 220px;
      background: rgba(255,80,80,0.06);
      border-radius: 50%;
    }

    .hero::after {
      content: '';
      position: absolute;
      bottom: -80px; left: -40px;
      width: 260px; height: 260px;
      background: rgba(255,80,80,0.04);
      border-radius: 50%;
    }

    .hero-emoji {
      font-size: 50px;
      line-height: 1;
      margin-bottom: 16px;
      display: block;
    }

    .hero h1 {
      font-family: 'Sora', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .hero p {
      font-size: 14px;
      color: rgba(255,255,255,0.68);
      line-height: 1.6;
      max-width: 370px;
      margin: 0 auto;
    }

    /* ── Alert badge ── */
    .alert-badge {
      display: inline-block;
      background: rgba(255, 90, 90, 0.18);
      border: 1px solid rgba(255, 90, 90, 0.35);
      color: #ff9090;
      font-size: 11px;
      font-weight: 600;
      font-family: 'Sora', sans-serif;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 50px;
      margin-bottom: 18px;
    }

    /* ── Content ── */
    .content {
      padding: 38px 40px 34px;
    }

    .greeting {
      font-size: 15px;
      color: #c0aee8;
      margin-bottom: 24px;
      line-height: 1.7;
    }

    .greeting strong {
      color: #e5d9ff;
      font-weight: 600;
    }

    /* ── Login details box ── */
    .details-box {
      background: #1a0e35;
      border: 1px solid #2e1f55;
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 26px;
    }

    .details-header {
      background: #1e1238;
      padding: 12px 20px;
      font-family: 'Sora', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: #9b7ed4;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      border-bottom: 1px solid #2e1f55;
    }

    .details-row {
      display: flex;
      align-items: center;
      padding: 14px 20px;
      border-bottom: 1px solid #1e1535;
      gap: 14px;
    }

    .details-row:last-child {
      border-bottom: none;
    }

    .details-icon {
      font-size: 18px;
      width: 28px;
      text-align: center;
      flex-shrink: 0;
    }

    .details-label {
      font-size: 12px;
      color: #7b6aa0;
      font-weight: 500;
      margin-bottom: 2px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .details-value {
      font-size: 14px;
      color: #e0d4ff;
      font-weight: 500;
    }

    /* ── Action buttons ── */
    .action-wrap {
      display: flex;
      gap: 12px;
      margin: 28px 0 24px;
    }

    .btn-secure {
      flex: 1;
      display: block;
      background: linear-gradient(135deg, #c0392b, #e74c3c);
      color: #ffffff;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      padding: 15px 10px;
      border-radius: 50px;
      text-align: center;
      box-shadow: 0 6px 24px rgba(231, 76, 60, 0.4);
    }

    .btn-safe {
      flex: 1;
      display: block;
      background: transparent;
      color: #c77dff;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      padding: 14px 10px;
      border-radius: 50px;
      text-align: center;
      border: 1.5px solid #7b3fe4;
    }

    /* ── Divider ── */
    .divider {
      border: none;
      border-top: 1px solid #2e1f55;
      margin: 26px 0;
    }

    /* ── Info note ── */
    .info-note {
      background: #1a0e35;
      border-left: 3px solid #7b3fe4;
      border-radius: 0 10px 10px 0;
      padding: 14px 18px;
      font-size: 13px;
      color: #9e8cbf;
      line-height: 1.65;
    }

    .info-note a {
      color: #c77dff;
      text-decoration: none;
      font-weight: 500;
    }

    /* ── Warning strip ── */
    .warning-strip {
      background: rgba(255, 90, 90, 0.07);
      border: 1px solid rgba(255, 90, 90, 0.2);
      border-radius: 12px;
      padding: 14px 18px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 24px;
    }

    .warning-strip .warn-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }

    .warning-strip p {
      font-size: 13px;
      color: #f09090;
      line-height: 1.6;
    }

    .warning-strip p strong {
      color: #ffb3b3;
      font-weight: 600;
    }

    /* ── Footer ── */
    .footer {
      padding: 26px 40px 30px;
      background: #100c22;
      text-align: center;
      border-top: 1px solid #1e1535;
    }

    .social-links { margin-bottom: 14px; }

    .social-links a {
      display: inline-block;
      margin: 0 5px;
      width: 34px;
      height: 34px;
      background: #1e1238;
      border: 1px solid #2e1f55;
      border-radius: 8px;
      line-height: 34px;
      font-size: 14px;
      text-decoration: none;
    }

    .footer-brand {
      font-family: 'Sora', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #7b3fe4;
      margin-bottom: 8px;
    }

    .footer-text {
      font-size: 12px;
      color: #5a4d77;
      line-height: 1.8;
    }

    .footer-text a {
      color: #7b6aa0;
      text-decoration: none;
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
      <div class="alert-badge">⚠ Security Alert</div>
      <span class="hero-emoji">🔐</span>
      <h1>New Login Detected</h1>
      <p>Someone just signed into your ChatVibe account. If this was you, you're all good. If not — act now.</p>
    </div>

    <!-- Content -->
    <div class="content">

      <p class="greeting">
        Hey <strong>${name}</strong> 👋<br/>
        We noticed a new login to your ChatVibe account just now. Here are the details of this login activity:
      </p>

      <!-- Warning strip -->
      <div class="warning-strip">
        <span class="warn-icon">🚨</span>
        <p><strong>Was this not you?</strong> Tap "Secure My Account" immediately to change your password and log out all devices.</p>
      </div>

      <!-- Login Details -->
      <div class="details-box">
        <div class="details-header">Login Details</div>

        <div class="details-row">
          <span class="details-icon">🕐</span>
          <div>
            <div class="details-label">Date &amp; Time</div>
            <div class="details-value">${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} IST</div>
          </div>
        </div>

        <div class="details-row">
          <span class="details-icon">📱</span>
          <div>
            <div class="details-label">Device</div>
            <div class="details-value">os_name</div>
          </div>
        </div>

        

        <div class="details-row">
          <span class="details-icon">📍</span>
          <div>
            <div class="details-label">Location</div>
            <div class="details-value">${location.city}, country</div>
          </div>
        </div>

        

      </div>

      <!-- Action Buttons -->
      <div class="action-wrap">
        <a href="#" class="btn-secure">🔒 Secure My Account</a>
        <a href="#" class="btn-safe">✅ Yes, It Was Me</a>
      </div>

      <hr class="divider"/>

      <!-- Info note -->
      <div class="info-note">
        For your safety, this alert is sent every time a new login is detected on your account. If you have questions, <a href="#">contact our support team</a> anytime.
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
        This is an automated security notification from ChatVibe.<br/>
        <a href="#">Manage Notifications</a> · <a href="#">Privacy Policy</a> · <a href="#">Help Center</a><br/><br/>
        © 2026 ChatVibe Inc. · 123 Anywhere St, Mumbai, India
      </div>
    </div>

  </div>
</div>

</body>
</html>
  `
}
