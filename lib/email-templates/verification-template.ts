export const verificationEmailTemplate = (url: string, host: string) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Your Magic Link</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    padding: 14px 0;
                }
                .content {
                    background-color: #f9f9f9;
                    padding: 26px;
                    border-radius: 8px;
                    margin: 10px 0;
                }
                .center-text {
                    text-align: center;
                }
                /* Larger & bolder for non-link text */
                .main-text {
                    font-size: 18px;
                    color: #000;
                    font-weight: 500;
                }
                
                .header-text {
                    font-size: 28px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #ea580c; /* bg-orange-600 */
                    color: white !important;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    margin-top: 30px;
                }
                .alternative-link {
                    color: #ea580c;
                    work-break: break-all;
                }
                a {
                    color: #ea580c;
                    word-break: break-all;
                }
                p {
                    color: #000;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 class="main-text header-text">Welcome to ${host}</h1>
            </div>
            <div class="content">
                <div class="center-text main-text">
                    <p>Hello there!</p>
                    <p>We've received a request to sign in to your account. Click the button below to securely log in:</p>
                </div>
                
                <p style="text-align: center;">
                    <a href="${url}" class="button">Sign In Now</a>
                </p>
                
                <div class="center-text main-text">
                    <p>Or copy and paste this link into your browser:</p>
                    <p><a href="${url}" class="alternative-link">${url}</a></p>
                    <p>This link will expire in 24 hours. If you didn't request this email, please ignore it.</p>
                </div>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} ${host}. All rights reserved.</p>
            </div>
        </body>
    </html>
`;
