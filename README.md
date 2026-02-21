# Monynha Softwares

<div align="center">

**Democratizing Technology, Empowering People**

A futuristic, inclusive, and high-end digital presence for a software studio that builds custom Odoo solutions, AI-powered automation, and digital products.

[Website](https://monynha.com) • [Services](https://monynha.com/solutions) • [Contact](https://monynha.com/contact)

</div>

---

## 🎯 About Monynha Softwares

Monynha Softwares is a digital engineering studio dedicated to bridging the gap between complex engineering and human intuition. We specialize in:

- **Odoo Solutions** - Custom ERP implementations, workflow automation, and resource management
- **Custom Software** - Bespoke web applications, internal dashboards, and robust APIs
- **AI & Automation** - Intelligent assistants and context-aware autonomous workflows

Our mission is to deliver outcomes, not just code—building digital products that don't just function, they *breathe*.

---

## 🎨 Design & Theme

### Visual Identity: Brutalist Futurism

Monynha Softwares embraces a **brutalist-futuristic aesthetic** characterized by:

#### Color Palette
- **Brand Black** (`#05070a`) - Deep, pure black background
- **Brand Violet** (`#8b5cf6`) - Vibrant accent color for primary interactions
- **Brand Blue** (`#3c83f6`) - Secondary accent for contrast and hierarchy
- **Brand Teal** (`#0d9488`) - Tertiary accent for visual diversity

#### Typography
- **Display Font**: Space Grotesk - Bold, geometric sans-serif for headlines
- **Body Font**: Inter - Clean, highly readable sans-serif for content
- **Weight Emphasis**: Bold and black weights create striking visual hierarchy

#### Visual Elements
- **Thick Borders** - 4px solid white borders create boldness and definition
- **Text Outlines** - Transparent text with stroke creates elegant, outlined headlines
- **Glass Morphism** - Frosted glass effect (`backdrop-filter: blur(10px)`) for subtle depth
- **Decorative Blurs** - Large, soft background blurs in brand colors add atmosphere without overwhelming
- **High Contrast** - Pure white text on pure black background ensures maximum readability

#### Interactive Design
- **Smooth Transitions** - Framer Motion animations for fluid interactions
- **Gradient Underlines** - Animated gradient dividers provide visual interest
- **Hover States** - Inverted colors and border transformations on interactions
- **Custom Scrollbar** - Violet scrollbar thumbs maintain brand consistency

---

## 🔧 Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Frontend** | React | 19.2.4 |
| **Language** | TypeScript | ~5.8.2 |
| **Build Tool** | Vite | 6.2.0 |
| **Styling** | Tailwind CSS | latest |
| **Animations** | Framer Motion | 12.33.0 |
| **Backend** | Node.js Express | 4.19.2 |
| **Routing** | Custom State-based | - |
| **Icons** | Lucide React | - |
| **UI Components** | shadcn/ui | - |
| **Deployment** | Docker | Node 20-alpine |

### Key Libraries
- **Animation**: Framer Motion for transitions, gestures, and complex visual effects
- **Styling**: Tailwind CSS utilities with custom brand color extensions
- **Icons**: Lucide React for all vector icons
- **API**: Native `fetch` for asynchronous operations
- **UI**: shadcn/ui components customized with Tailwind

---

## 📁 Project Structure

```
monynha-softwares/
├── components/              # Reusable React components
│   ├── Navbar.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with CTA
│   ├── Services.tsx        # Service offerings display
│   ├── Footer.tsx          # Footer component
│   ├── Logo.tsx            # Monynha logo and animation
│   ├── AISection.tsx       # AI/automation section
│   ├── TeamSection.tsx     # Team presentation
│   └── CTASection.tsx      # Call-to-action section
├── views/                   # Page views/routes
│   ├── HomeView.tsx        # Homepage composition
│   ├── SolutionsView.tsx   # Solutions/services detail
│   ├── LabsView.tsx        # Labs/experiments showcase
│   ├── OpenSourceView.tsx  # Open source projects
│   └── ContactView.tsx     # Contact form page
├── api/                     # Backend API handlers
│   └── contact.js          # Contact form submission endpoint
├── assets/                  # Static assets (images, icons)
├── public/                  # Public static files
├── docs/                    # Documentation
│   └── REACTBITS_INTEGRATION.md
├── scripts/                 # Build and utility scripts
│   ├── generate_favicon.py # Favicon generation
│   └── generate_sitemap.mjs # Sitemap generation
├── App.tsx                  # Main app component with routing
├── index.tsx               # React entry point
├── index.html              # HTML template with Tailwind config
├── server.js               # Express production server
├── vite.config.ts          # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── Dockerfile             # Docker containerization
```

---

## 📄 Pages & Routes

### Home (`/`)
The main landing page featuring:
- Animated hero section with tagline: "Where Engineering Meets Intuition"
- Core services overview (Odoo, Custom Software, AI & Automation)
- AI capabilities showcase
- Team introduction
- Call-to-action section

### Solutions (`/solutions`)
Detailed presentation of three core service offerings:
- **Odoo Solutions** - Enterprise resource planning and workflow automation
- **Custom Software** - Tailored web applications and dashboards
- **AI & Automation** - Applied AI and intelligent workflows

### Labs (`/labs`)
Experimental projects and technical innovations showcase.

### Open Source (`/open-source`)
Community-driven projects and open source contributions.

### Contact (`/contact`)
Contact form with fields:
- Name (required)
- Email (required)
- Phone number (optional)
- Company (optional)
- Message (required)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **pnpm** (optional, but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marcelo-m7/monynha.com.git
   cd monynha.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with pnpm
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=8080
   ```

### Development Setup

For the contact form and API endpoints to work during development, you'll need to run **two servers** in separate terminals:

**Terminal 1: Start the API Server**
```bash
npm run start
```
The Express server will run on `http://localhost:8080` and handle API requests.

**Terminal 2: Start the Vite Dev Server**
```bash
npm run dev
```
The Vite dev server will run on `http://localhost:3000` with API proxy enabled.

> **Note**: If you only run `npm run dev`, the frontend will work but API calls (like the contact form) will fail with 404 errors.

For detailed development setup instructions, see [DEVELOPMENT.md](./DEVELOPMENT.md).

---

## 📦 Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (requires API server running separately for full functionality).

### Backend (Development & Production)
```bash
npm run start
```
Starts the Express production server that serves both the API and static assets on port 8080.

### Build
```bash
npm run build
```
Builds the production bundle and generates a sitemap using Vite and custom build scripts.

### Preview
```bash
npm run preview
```
Serves the production build locally for testing.

---

## 🔌 API Endpoints

### POST `/api/contact`

Handles contact form submissions using the Resend email service.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "tel": "+1 (555) 123-4567",
  "company": "Acme Inc",
  "message": "I'd like to discuss Odoo implementation..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Missing required fields: name, email, and message are mandatory."
}
```

**Requirements:**
- `name`, `email`, and `message` are required
- Uses `RESEND_API_KEY` environment variable
- Sends email through Resend service

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t monynha-softwares:latest .
```

### Run Container
```bash
docker run -p 8080:8080 \
  -e RESEND_API_KEY=your_api_key \
  -e GEMINI_API_KEY=your_gemini_key \
  monynha-softwares:latest
```

The Dockerfile uses a two-stage build:
1. **Build Stage**: Compiles TypeScript and React code
2. **Runtime Stage**: Runs the lightweight Node.js server

The container serves the built application on port 8080.

---

## 🎬 Animation & Interactions

Leveraging **Framer Motion** for sophisticated animations:

### Page Transitions
- Smooth entrance animations with fade and scale effects
- Scroll-triggered reveal animations
- Page loader with animated logo and gradient underline

### Component Animations
- Hero section particle effects and gradients
- Service cards with hover state transformations
- Text animations and reveals
- Decorative blur elements with pulsing effects

### Best Practices
- Maximum 2-3 animated components per view for performance
- Fallback animations for users with `prefers-reduced-motion`
- Mobile-optimized animations to reduce overhead on smaller devices
- GPU-accelerated transforms for smooth 60fps performance

---

## 🎨 Customization

### Colors
Modify brand colors in `index.html` within the Tailwind configuration:
```javascript
colors: {
  'brand-black': '#05070a',
  'brand-violet': '#8b5cf6',
  'brand-blue': '#3c83f6',
  'brand-teal': '#0d9488',
}
```

### Typography
Adjust fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Global Styles
Edit the `<style>` block in `index.html` for:
- Scrollbar appearance
- Text outlines
- Glass morphism effects
- Border styles

---

## 📋 Development Guidelines

As outlined in `AI_RULES.md`:

### Code Structure
- **Components**: Functional components with TypeScript in `/components`
- **Views**: Page compositions in `/views`
- **API**: Server-side logic in `/api`
- **Routing**: Custom state-based routing (no React Router)

### Styling Standards
- Use Tailwind CSS utility classes exclusively
- Maintain brutalist-futuristic aesthetic
- Use custom brand colors consistently
- Apply glass morphism cautiously for depth

### Animation Standards
- Use **Framer Motion** for all non-trivial animations
- Implement smooth page transitions
- Respect `prefers-reduced-motion` preferences

### Icon Standards
- Use **Lucide React** for all vector icons
- Maintain icon size consistency
- Match icons to brand colors

---

## 📚 Additional Documentation

- [DEVELOPMENT.md](./DEVELOPMENT.md) - Complete development setup and troubleshooting guide
- [FIXES_SUMMARY.md](./FIXES_SUMMARY.md) - Summary of production issues and fixes applied
- [REACTBITS_INTEGRATION.md](./docs/REACTBITS_INTEGRATION.md) - Detailed guide on animated component integration
- [AI_RULES.md](./AI_RULES.md) - Development rules and technical guidelines

---

## 🤝 Contributing

Contributions are welcome! When contributing:

1. Follow the guidelines in `AI_RULES.md`
2. Maintain the brutalist-futuristic aesthetic
3. Use TypeScript for type safety
4. Implement Framer Motion animations for interactions
5. Test responsive design across breakpoints

---

## 📄 License

This project is proprietary and maintained by Monynha Softwares. All rights reserved.

---

## 👤 Credits & Contact

**Created by:**

- **Marcelo Santos**
  - GitHub: [@marcelo-m7](https://github.com/marcelo-m7)
  - Email: [marcelo@monynha.com](mailto:marcelo@monynha.com)

**Organization:**
- **Monynha Softwares**
  - Website: [monynha.com](https://monynha.com)
  - Specializing in Odoo Solutions, Custom Software, and AI Automation

---

## 🔗 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

---

**Built with precision. Designed with intuition. Powered by passion.**

*Monynha Softwares — Where Engineering Meets Intuition* 🚀
