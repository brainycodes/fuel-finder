# FindFuelSpot - Frontend

**Find the closest fuel near you** — Real-time fuel station locator with live prices, directions, and station details.


## 🚀 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.3.0 | React framework (App Router) |
| React | 18+ | UI library |
| Tailwind CSS | 3.4 | Styling (via globals.css) |
| Leaflet | 1.9 | Interactive maps |
| Framer Motion | 10+ | Animations |
| Lucide React | 0.294 | SVG icons |


## 📁 Project Structure

```
frontend/
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout
│   │   ├── page.js                # Landing page
│   │   ├── search/
│   │   │   └── page.js            # Search results
│   │   ├── station/
│   │   │   └── [id]/
│   │   │       └── page.js        # Station details
│   │   ├── about/
│   │   │   └── page.js            # About page
│   │   ├── contact/
│   │   │   └── page.js            # Contact page
│   │   └── api/
│   │       └── autocomplete/
│   │           └── route.js       # Search suggestions API
│   ├── components/
│   │   ├── Header.jsx             # Navigation bar
│   │   ├── Footer.jsx             # Footer
│   │   ├── Hero.jsx               # Landing hero section
│   │   ├── HowItWorks.jsx         # 3-step process
│   │   ├── Features.jsx           # Feature grid
│   │   ├── Stats.jsx              # Statistics section
│   │   ├── Testimonials.jsx       # User reviews
│   │   ├── CTASection.jsx         # Call to action
│   │   ├── MapView.jsx            # Interactive map
│   │   ├── StationCard.jsx        # Station card component
│   │   └── PriceDisplay.jsx       # Price cards
│   └── styles/
│       └── globals.css            # Global styles + theme
├── .env.local                      # Environment variables
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── package.json                    # Dependencies
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ installed
- Backend API running (see backend README)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/brainycodes/fuel-finder.git

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend URL

# 4. Run development server
npm run dev
```

## 🔧 Environment Variables

Create `.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# App details
NEXT_PUBLIC_APP_NAME=FindFuelSpot
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📄 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, stats, testimonials |
| `/search` | Search with filters, live station results |
| `/search?q=lagos` | Search with pre-filled query |
| `/station/[id]` | Station detail page with map, prices, directions |
| `/about` | About page |
| `/contact` | Contact form page |
| `/api/autocomplete` | Autocomplete suggestions API |


## 🎨 Color Theme

```css
--primary: #7c3aed;      /* Purple */
--primary-dark: #6d28d9; /* Dark purple */
--primary-light: #a78bfa;/* Light purple */
--accent: #fbbf24;       /* Yellow (highlights) */
--dark: #0a0418;         /* Background dark */
--light: #faf5ff;        /* Background light */
```

## 🏗️ Build

```bash
# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Or via GitHub:**
1. Push code to GitHub
2. Import repo in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

## 📱 Features

- 🔍 **Search Autocomplete** — Suggestions as you type
- 📍 **GPS Location** — Auto-detect user's precise location
- 🗺️ **Interactive Maps** — Visual station locations
- 💰 **Real-Time Prices** — Official government + scraped prices
- 🌍 **22+ Countries** — Global coverage
- 📏 **Distance Sorting** — Nearest stations first
- 🧭 **Navigation** — One-click Google Maps directions
- 📊 **Station Details** — Fuels, payment methods, amenities
- 🌙 **Dark Theme** — Built-in dark mode
- 📱 **Fully Responsive** — Mobile-first design


## 🔗 API Integration

The frontend connects to the backend at:

```
GET  /api/v1/countries                 → List supported countries
GET  /api/v1/stations/nearby          → Nearby stations
GET  /api/v1/prices/official/:country → Official fuel prices
GET  /api/v1/geolocation/detect       → IP-based location
```

## 📝 License

MIT License


## 👨‍💻 Author

**brainycodes**
**Solomon Zion**
**FE/24/3064259443**


## 🙏 Credits

- [Unsplash](https://unsplash.com) — Images
- [OpenStreetMap](https://openstreetmap.org) — Station data
- [GlobalPetrolPrices](https://globalpetrolprices.com) — Fuel prices
- [NMDPRA](https://nmdpra.gov.ng) — Nigerian official prices