export const verificationEmailTemplate = (url: string, host: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Your Magic Link</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.5;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f3f4f6;
        }
        .card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          padding: 20px 28px;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 20px;
        }
        .logo-img {
          width: 45px;
          height: 45px;
          display: block;
        }
        .brand-name {
          font-size: 20px;
          font-weight: bold;
          color: #ea580c;
        }
        .content {
          text-align: left;
        }
        .main-text {
          font-size: 15px;
          color: #111;
          margin-bottom: 16px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #ea580c;
          color: white !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .alternative-link {
          color: #ea580c;
          word-break: break-all;
          font-size: 14px;
          display: block;
          margin-bottom: 16px;
        }
        .footer {
          background: #f9fafb;
          padding: 12px;
          font-size: 12px;
          color: #666;
          text-align: left;
          border-top: 1px solid #e5e7eb;
          border-radius: 0 0 12px 12px;
        }
        a { color: #ea580c; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <img src="https://www.placeapi.site/logo.svg" alt="PlaceAPI Logo" class="logo-img" />
          <span class="brand-name">PlaceAPI</span>
        </div>
        <div class="content">
          <p class="main-text">Hi there,</p>
          <p class="main-text">Click the button below to securely sign in to your PlaceAPI account:</p>
          <a href="${url}" class="button">Sign In Now</a>
          <p class="main-text">Or paste this link into your browser:</p>
          <a href="${url}" class="alternative-link">${url}</a>
          <p class="main-text">This link will expire in 24 hours. If you didn’t request it, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} PlaceAPI. All rights reserved.
        </div>
      </div>
    </body>
  </html>
`;
