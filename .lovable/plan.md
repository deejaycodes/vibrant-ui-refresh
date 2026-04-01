
## SafeVoice — Full Redesign (Landing + Portal)

Rebuild the SafeVoice landing page and partner portal in this React/Vite project with a **clean, professional** design. All existing API call patterns preserved — only the visual layer changes.

### Design System
- **Palette**: Deep navy primary (`#1e3a5f`), teal accent (`#0d9488`), warm white backgrounds, slate grays for text. Danger red, amber warning, green success kept for risk levels.
- **Typography**: Inter font. Large, confident headings. Clean body text with good line height.
- **Style**: Crisp cards with subtle shadows, consistent 8px spacing grid, rounded-lg corners, professional feel that builds trust for partner organisations.

### Pages

#### 1. Landing Page (`/`)
- **Quick-Exit banner** at top — red "✕ Exit Site" button, safety notice
- **Hero section** — reassuring headline, WhatsApp CTA button (green), trust indicators (24/7, free, confidential, 11 languages)
- **"How we help" grid** — 6 cards (Safety planning, Local services, Legal rights, Emotional support, Children's safety, Privacy) with icons
- **"How it works"** — 4-step numbered flow
- **Emergency numbers section** — UK helplines
- **Footer** with privacy note

#### 2. Login Page (`/login`)
- Centered card with SafeVoice branding, email/password form, sign-in button, links to register

#### 3. Dashboard (`/dashboard`)
- Header with tenant switcher + quick-exit button
- 4 stat cards (Total Cases, Active Referrals, Critical Reports, Resolved)
- Two-column layout: Reports by Risk + Referrals by Status
- Recent Reports table

#### 4. Admin Page (`/admin`)
- Header with tenant switcher + quick-exit
- Stats grid (Survivors, Active Conversations, Reports, Referrals, Messages, Cost)
- Health check status indicator
- Action buttons (Run Cron, Refresh Health)
- AI Generations log table

#### 5. Register Page (`/register`)
- Centered form card with org name, contact person, email, phone, password fields
- Success state showing pending approval message

### API Integration
- Create `src/lib/api.ts` and `src/lib/auth.ts` mirroring the original Next.js patterns (`login`, `register`, `getDashboard`, `getReports`, `getStats`, etc.) using fetch with tenant-aware headers
- Tenant switcher component using localStorage
- All API calls preserved identically — just adapted from Next.js router to React Router

### Components to Build
- `QuickExit` — safety exit button
- `TenantSwitcher` — UK/Nigeria toggle
- `PortalLayout` — shared header/nav for authenticated pages
- `StatCard` — reusable metric card
- `RiskBadge` — color-coded risk level indicator
