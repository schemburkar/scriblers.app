# Scriblers

Scriblers is a blazing-fast, lightweight tabbed notepad application built with **Tauri**, **React**, and **TypeScript**. Designed for distraction-free writing, it combines the performance of Rust with a modern, responsive UI.

<!--![Version](https://img.shields.io/github/package-json/v/schemburkar/scriblers.app)
![License](https://img.shields.io/github/license/schemburkar/scriblers.app)
[![Builds](https://github.com/schemburkar/scriblers.app/actions/workflows/publish.yml/badge.svg)](https://github.com/schemburkar/scriblers.app/actions/workflows/publish.yml)
![GitHub tag status](https://img.shields.io/github/checks-status/schemburkar/scriblers.app/v0.1.0)
[All releases & changelog](https://github.com/schemburkar/scriblers.app/releases)
![GitHub Downloads (specific asset, all releases)](https://img.shields.io/github/downloads/schemburkar/scriblers.app/Scriblers_0.1.0_x64_en-US)-->

## Features
- **Tabbed Interface**: Seamlessly manage multiple documents with open, close, and duplicate tabs.
- **Smart Switcher**: High-performance `Ctrl + Tab` dialog with visual previews and smooth scrolling.
- **Auto-Save**: Background persistence to never lose your work.
- **Native Performance**: Tiny binary and low RAM usage via Tauri 2.0 (Rust core).
- **Theming**: System-aware light/dark mode toggle.
- **Privacy-Focused**: Fully offline, no tracking or data collection.


##  Tech Stack



- **Frontend**: [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org)
- **Core**: [Tauri 2.0](https://.tauri.app) (Rust)
- **Components**: [Shadcn UI](https://ui.shadcn.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)


##  Getting Started

### Prerequisites

Ensure you have the following installed for 2025 development standards:
- **Node.js**: `v20.x` or later
- **Rust**: `v1.75.x` or later (via rustup)
- **System Build Tools**: Follow the [Tauri Setup Guide](https://v2.tauri.app/start/prerequisites/) for your specific OS.

### Installation

1. **Clone the repository**:

```bash
   git clone github.com
   cd scriblers
```
1. **Install dependencies:**:

```bash
npm install
```
### Development



Run the app in development mode with hot-reloading:

```bash
npm run tauri dev
```

### Build


Create a production-ready, minified bundle:

```bash
 npm run tauri build
```

The installers will be located in `src-tauri/target/release/bundle/`.



## Keyboard Shortcuts

| Shortcut          | Action              |
|-------------------|---------------------|
| Ctrl + N          | New Tab             |
| Ctrl + Tab        | Switch Tabs (hold Ctrl to cycle) |
| Ctrl + S          | Save File           |
| Ctrl + W          | Close Current Tab   |
| Ctrl + T          | Toggle Dark Mode    |


## Contributing

We welcome contributions! Please follow these steps:
1. Fork the project.
1. Create your Feature Branch (git checkout -b feature/AmazingFeature).
1. Commit your changes (git commit -m 'Add some AmazingFeature').
1. Push to the Branch (git push origin feature/AmazingFeature).
1. Open a Pull Request

## Development Guidelines
Follow the Conventional Commits specification.

1. Ensure TypeScript types are strictly defined (no any).
1. Run npm run lint before submitting a PR.


## License
Distributed under the GNU AGPLv3 License. See LICENSE for more information.

## Privacy
Works offline, no content analysis or any tracking. 

  
  


*Built with ❤️ for writers and developers.*
