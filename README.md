# Originn for Startup

A modern web application built with Vite, TypeScript, and Tailwind CSS v4.1.

## Features

- ⚡ **Vite** - Lightning fast build tool and development server
- 🎨 **Tailwind CSS v4.1** - Utility-first CSS framework
- 🔷 **TypeScript** - Type-safe JavaScript
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Modern ES Modules** - Latest JavaScript features

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## Project Structure

```
Originnforstartup/
├── public/
│   └── vite.svg
├── src/
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Technologies Used

- **Vite** - Build tool and development server
- **Tailwind CSS v4.1** - CSS framework with new Vite plugin
- **TypeScript** - Type-safe JavaScript
- **ES Modules** - Modern JavaScript module system

## Tailwind CSS Setup

This project uses Tailwind CSS v4.1 with the new Vite plugin. The setup includes:

1. **Vite Plugin**: `@tailwindcss/vite` for seamless integration
2. **CSS Import**: `@import "tailwindcss"` in `src/style.css`
3. **No Configuration**: Tailwind CSS v4.1 works out of the box

## Development

The project is set up with hot module replacement (HMR) for fast development. Any changes to your TypeScript or CSS files will be automatically reflected in the browser.

## Building for Production

Run `npm run build` to create a production build. The built files will be in the `dist` directory.

## License

ISC
