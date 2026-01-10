# Stranger IT Things

A retro-themed IT support adventure game inspired by Stranger Things. Navigate through mysterious IT incidents, solve technical challenges, and manage team morale in this interactive web experience.

## 🎮 Features

- **Interactive Storytelling**: Navigate through IT support scenarios with meaningful choices
- **Retro UI**: Authentic 80s-inspired interface with CRT effects and nostalgic styling
- **Mini-Games**: Test your IT skills through various challenges
- **Character Selection**: Choose from unique IT professionals with different abilities
- **Dynamic Gameplay**: Manage SLA time, team morale, and ticket quality

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/voku/STRANGER_IT_THINGS.git
   cd STRANGER_IT_THINGS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to play the game

### Build for Production

Build the application for production deployment:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages. Every push to the main branch will trigger a build and deployment.

View the live application at: [https://voku.github.io/STRANGER_IT_THINGS/](https://voku.github.io/STRANGER_IT_THINGS/)

## 📂 Project Structure

```
STRANGER_IT_THINGS/
├── components/          # React components
├── services/           # Service modules
├── App.tsx             # Main application component
├── constants.ts        # Game constants and configuration
├── types.ts            # TypeScript type definitions
├── index.html          # HTML entry point
├── index.tsx           # React entry point
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## 🔑 Key Files Detector Helper Prompt

When working on this codebase, use this prompt to identify the most important files for a specific task:

```
I'm working on [describe your task/feature/bug fix]. Based on the STRANGER_IT_THINGS project structure, which files are most relevant for this work? Please prioritize:

1. Core game logic and state management
2. UI components related to [specific feature]
3. Type definitions and constants
4. Service modules
5. Configuration files

Consider these key areas:
- Game mechanics: App.tsx, constants.ts, types.ts
- UI Components: components/ directory
- Services: services/ directory
- Build & Deploy: vite.config.ts, package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, fork the repository, and create pull requests.

**Repository**: [https://github.com/voku/STRANGER_IT_THINGS](https://github.com/voku/STRANGER_IT_THINGS)

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational and entertainment purposes.

## 🎯 Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **GitHub Pages** - Hosting

## 🎨 Design Credits

The game features a retro aesthetic inspired by the 1980s, with custom fonts and CRT effects to create an authentic experience.

---

Made with ❤️ for IT professionals and Stranger Things fans
