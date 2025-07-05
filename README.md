# 🦈 Tank Time Capsule - Shark Tank India Analytics Platform

<div align="center">
  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=400" alt="Tank Time Capsule Banner" />
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue.svg)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.39.0-green.svg)](https://supabase.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

## 🌟 Overview

Tank Time Capsule is the most comprehensive and advanced analytics platform for Shark Tank India, featuring AI-powered insights, real-time data analysis, and an impressive user experience that rivals industry-leading platforms. Built with cutting-edge technologies and authentic Shark Tank India branding.

### ✨ Key Highlights

- **🎯 Real CSV Data Integration**: Dynamically loads and processes actual Shark Tank India deal data
- **🤖 AI-Powered Analytics**: Machine learning predictions and intelligent insights
- **🎨 Authentic Theme**: Official Shark Tank India color scheme and branding
- **📱 Fully Responsive**: Optimized for all devices with impressive animations
- **⚡ 30+ Features**: Comprehensive feature set with premium capabilities
- **🔒 Secure Authentication**: Supabase-powered user management
- **📊 Advanced Visualizations**: Interactive charts and data representations

## 🚀 Features

### 📈 Core Analytics
- **Real-time Dashboard**: Live statistics and key performance indicators
- **Deal Intelligence**: Comprehensive deal tracking and analysis
- **Shark Profiles**: Detailed investor analysis with success rates
- **Industry Insights**: Sector-wise performance and trends
- **Success Predictions**: AI-powered deal outcome forecasting

### 🤖 AI-Powered Tools
- **Pitch Analyzer**: Video analysis for presentation optimization
- **Shark Chat**: AI-powered shark personality simulator
- **Prediction Engine**: ML-driven investment success probability
- **Sentiment Analysis**: Pitch feedback and market sentiment
- **Risk Assessment**: Investment risk evaluation and mitigation

### 📊 Advanced Analytics
- **Comparative Analysis**: Head-to-head shark comparisons
- **Trend Analysis**: Investment pattern recognition
- **Market Intelligence**: Industry-specific insights
- **Performance Metrics**: Success rate calculations
- **ROI Analysis**: Return on investment tracking

### 🌍 Global Features
- **Global Markets**: International Shark Tank analysis
- **Success Stories**: Winner journey documentation
- **Live Episodes**: Real-time episode tracking
- **Event Calendar**: Startup events and competitions
- **Learning Hub**: Educational content and resources

### 💎 Premium Features
- **Custom Reports**: PDF generation and data export
- **API Access**: Developer-friendly data endpoints
- **Advanced Filters**: Sophisticated search capabilities
- **Priority Support**: Enhanced user assistance
- **Early Access**: New feature previews

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first styling with custom Shark Tank theme
- **Framer Motion 11.0.3** - Smooth animations and transitions
- **Recharts 2.12.2** - Interactive data visualizations
- **Lucide React 0.344.0** - Beautiful icon library

### Backend & Database
- **Supabase 2.39.0** - Backend-as-a-Service with PostgreSQL
- **Row Level Security** - Secure data access patterns
- **Real-time Subscriptions** - Live data updates
- **Edge Functions** - Serverless API endpoints

### Data Processing
- **Papa Parse** - CSV data parsing and processing
- **Custom Analytics Engine** - Real-time calculations
- **ML Prediction Models** - Success probability algorithms
- **Data Validation** - Robust error handling

### Development Tools
- **Vite 5.4.17** - Fast build tool and dev server
- **ESLint 9.9.1** - Code quality and consistency
- **PostCSS 8.4.35** - CSS processing and optimization
- **Zustand 4.5.2** - Lightweight state management

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tank-time-capsule.git
   cd tank-time-capsule
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Add your CSV data**
   - Place your Shark Tank India CSV file in `public/data/`
   - Name it `Shark Tank India.csv`
   - Ensure proper column headers (startup_name, industry, ask_amount, etc.)

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
tank-time-capsule/
├── public/
│   ├── data/
│   │   └── Shark Tank India.csv    # Your CSV data file
│   └── vite.svg
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── FloatingNavigation.tsx  # Advanced navigation hub
│   │   ├── LoadingScreen.tsx       # Loading animations
│   │   ├── Navbar.tsx              # Main navigation
│   │   └── PremiumFeatures.tsx     # Premium feature showcase
│   ├── lib/                        # Utilities and configurations
│   │   ├── csvParser.ts            # CSV data processing
│   │   └── supabase.ts             # Database configuration
│   ├── pages/                      # Application pages
│   │   ├── Analytics.tsx           # Analytics dashboard
│   │   ├── Comparisons.tsx         # Shark comparisons
│   │   ├── Dashboard.tsx           # Main dashboard
│   │   ├── Deals.tsx               # Deal analysis
│   │   ├── Predictions.tsx         # AI predictions
│   │   └── Sharks.tsx              # Shark profiles
│   ├── store/                      # State management
│   │   ├── useAuthStore.ts         # Authentication state
│   │   ├── useDealsStore.ts        # Data management
│   │   └── useThemeStore.ts        # Theme preferences
│   ├── types/                      # TypeScript definitions
│   └── App.tsx                     # Main application component
├── supabase/                       # Database migrations
├── tailwind.config.js              # Tailwind configuration
└── package.json                    # Dependencies and scripts
```

## 📊 CSV Data Format

Your CSV file should include these columns (case-insensitive):

### Required Columns
- `startup_name` / `company_name` - Name of the startup
- `industry` / `sector` - Business category
- `ask_amount` / `amount_asked` - Requested investment
- `ask_equity` / `equity_asked` - Requested equity percentage
- `valuation` - Company valuation
- `season` - Season number
- `episode` - Episode number

### Optional Columns
- `deal_amount` / `investment` - Final investment amount
- `deal_equity` / `final_equity` - Final equity percentage
- `invested_sharks` / `investors` - Sharks who invested
- `success_status` / `deal_status` - Deal outcome
- `revenue_current` - Current revenue
- `location` / `city` - Company location

### Example CSV Structure
```csv
startup_name,industry,ask_amount,ask_equity,valuation,deal_amount,invested_sharks,success_status,season,episode
TechCorp,Technology,50 lakh,10,5 crore,50 lakh,Ashneer Grover,funded,1,5
HealthPlus,Healthcare,1 crore,15,6.67 crore,,None,not_funded,1,8
```

## 🎨 Shark Tank India Theme

The application uses an authentic color palette inspired by the official Shark Tank India branding:

### Primary Colors
- **Shark Blue**: `#0066cc` - Primary brand color
- **Shark Gold**: `#f59e0b` - Accent and highlights
- **Shark Teal**: `#14b8a6` - Secondary actions
- **Shark Gray**: `#64748b` - Neutral elements

### Gradients
- **Main Gradient**: Blue → Teal → Gold
- **Background**: Deep blue gradient with animated elements
- **Cards**: Subtle gradients with backdrop blur effects

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
```

### Tailwind Configuration
The project includes a custom Tailwind configuration with Shark Tank India theme colors, animations, and utilities. See `tailwind.config.js` for details.

### Database Schema
The application uses Supabase with the following main tables:
- `deals` - Deal information and outcomes
- `sharks` - Shark profiles and statistics
- `profiles` - User profiles and preferences
- `predictions` - AI-generated predictions
- `sentiment_analysis` - Pitch sentiment data

## 📱 Responsive Design

The application is fully responsive with breakpoints optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Screens**: 1440px+

### Mobile Optimizations
- Touch-friendly navigation
- Optimized animations for performance
- Compressed images and assets
- Progressive loading for better UX

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy automatically on push to main branch

### Vercel
1. Import project from GitHub
2. Configure build settings (auto-detected)
3. Add environment variables
4. Deploy with zero configuration

### Manual Deployment
```bash
# Build for production
npm run build

# Preview the build
npm run preview

# Deploy the dist folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write comprehensive comments for complex logic
- Ensure responsive design across all devices
- Test all features thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shark Tank India** - For inspiration and the amazing show
- **StackBlitz** - For the excellent development platform
- **Supabase** - For the robust backend infrastructure
- **Tailwind CSS** - For the utility-first CSS framework
- **React Community** - For the incredible ecosystem

## 📞 Support

- **Documentation**: [Wiki](https://github.com/your-username/tank-time-capsule/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/tank-time-capsule/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/tank-time-capsule/discussions)
- **Email**: support@tanktimecapsule.com

---

<div align="center">
  <p>Built with ❤️ for the Shark Tank India community</p>
  <p>© 2025 Tank Time Capsule. All rights reserved.</p>
</div>