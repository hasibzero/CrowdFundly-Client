# Crowdfundly Client (Frontend) 🚀

Crowdfundly is a full-stack crowdfunding platform built to empower creators to launch their ideas and supporters to back innovative projects. Built with Next.js, Express, and MongoDB, Crowdfundly provides a secure, reliable, and user-friendly experience featuring role-based access, automated payments, and comprehensive admin tools.

This repository contains the **Next.js Frontend Application** for Crowdfundly.

## 🔗 Live Demo & Links
- **Client Deployment**: [https://crowdfundly-client.vercel.app/](https://crowdfundly-client.vercel.app/)
- **Server Deployment**: [https://crowdfundly-server.vercel.app/](https://crowdfundly-server.vercel.app/)

## 🔑 Admin Test Credentials
To access the admin dashboard, use the following credentials:
- **Email**: admin@crowdfundly.com
- **Password**: admin123

> The admin account must be registered and the email must be listed in the server's `ADMIN_EMAILS` allowlist so the Admin role is applied.

## ✨ Key Features (10+)

1. **Role-Based Authentication (RBAC):** Secure JWT-based login with distinct dashboards for Supporters, Creators, and Admins. Includes Google Sign-In integration.
2. **Dynamic Campaign Management:** Creators can seamlessly add, edit, and delete campaigns. Built-in integration with ImgBB allows effortless image uploads.
3. **Admin Approval Workflow:** New and edited campaigns automatically enter a pending state, requiring Admin review to ensure platform safety and quality.
4. **Automated Notification System:** A global, real-time-like notification system alerts users of status changes (e.g., campaign approvals, successful contributions, and withdrawal updates).
5. **Credit Purchasing & Stripe Integration:** Supporters can securely purchase platform credits through Stripe across 4 tier packages to back campaigns.
6. **Contribution Processing & Refunds:** Creators can review incoming contributions. Approvals add to the campaign's total, while rejections automatically refund the Supporter's credits.
7. **Withdrawal System with Automated Math:** Creators can request fund withdrawals once they exceed the minimum threshold, converting credits to USD.
8. **Suspicious Activity Reporting:** Supporters can flag potentially fraudulent campaigns, sending detailed reports directly to the Admin dashboard for investigation.
9. **Responsive & Premium Design:** The platform is fully responsive and features dynamic hero sliders, testimonials, and clean modern aesthetics utilizing Framer Motion for smooth transitions.
10. **Admin Master Controls:** Administrators have full oversight to manage all registered users, handle withdrawal requests, review flagged campaigns, and oversee the entire platform ecosystem.
11. **Client-Side Pagination:** Optimized rendering and pagination built directly into campaign lists, contribution tables, and admin user directories for smooth performance at scale.

## 🛠️ Technology Stack
- **Frontend**: React, Next.js (App Router), TailwindCSS, Framer Motion, Axios
- **Backend**: Node.js, Express.js, MongoDB (Native Driver), JWT (JSON Web Tokens)
- **Third-Party Integrations**: Stripe (Payments), ImgBB (Image Hosting)

## 🚀 Frontend Local Setup

### Prerequisites
- Node.js 18+ installed

### Setup Instructions
1. Navigate to the client directory (if not already there): `cd client`
2. Install dependencies: `npm install`
3. Create a `.env.local` file. Required variables:
   - `NEXT_PUBLIC_API_URL` — base URL of the Express API (e.g. `http://localhost:5000`)
   - `NEXT_PUBLIC_IMGBB_API_KEY` — imgBB API key for image uploads
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
   - `MONGODB_URI` — MongoDB connection string (used by Better Auth)
   - `ACCESS_TOKEN_SECRET` / `BETTER_AUTH_SECRET` — auth signing secrets
   - `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` — the client's own origin (e.g. `http://localhost:3000`)
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
4. Start the client: `npm run dev`

## ☁️ Deployment (Vercel)

- Framework preset: Next.js
- Set every variable from your local `.env.local` in the Vercel dashboard.
- Set `NEXT_PUBLIC_API_URL` to your deployed server URL.
- Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to your deployed client URL.
- Add your deployed client URL to the authorized redirect URIs in the Google OAuth console.
