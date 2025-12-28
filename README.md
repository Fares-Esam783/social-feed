# SocialFeed 🚀

A modern, production-ready Social Media Mini Application built with Next.js 14, TypeScript, Redux Toolkit, TanStack Query, and Tailwind CSS. This project simulates the core features of a real social platform with a strong focus on performance, scalability, and user experience.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=for-the-badge&logo=redux)

## ✨ Features

### Core Features

- 📰 **Dynamic Feed** - Display posts fetched from JSONPlaceholder API with infinite scrolling
- ❤️ **Like/Unlike** - Interactive like functionality with smooth heart animations
- 💬 **Comments** - View API comments and add your own (locally stored)
- 👤 **User Profiles** - Complete profile pages with user details, stats, and posts
- 🔍 **Search** - Real-time search for posts and users with text highlighting
- ✍️ **Create Post** - Rich post creation modal with image upload (mocked)

### UX & UI

- 📱 **Fully Responsive** - Optimized layouts for mobile, tablet, and desktop
- 🎨 **Modern Design** - Dark theme with gradient accents and glassmorphism effects
- ✨ **Smooth Animations** - Framer Motion powered interactions and transitions
- 💀 **Skeleton Loaders** - Beautiful loading placeholders for all content
- ⚠️ **Error States** - Graceful error handling with retry options
- 📭 **Empty States** - Friendly empty state messages

### Technical

- ⚡ **Performance Optimized** - React Query caching, lazy loading, optimistic updates
- ♿ **Accessible** - Keyboard navigation, ARIA labels, focus management
- 🔧 **Scalable Architecture** - Component-based structure with separation of concerns
- 📝 **TypeScript** - Full type safety throughout the application

## 🛠️ Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Framework        | Next.js 14 (App Router) |
| Language         | TypeScript              |
| State Management | Redux Toolkit           |
| Data Fetching    | TanStack Query v5       |
| Styling          | Tailwind CSS            |
| Animations       | Framer Motion           |
| Icons            | Lucide React            |
| API              | JSONPlaceholder         |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home/Feed page
│   ├── profile/[id]/       # Dynamic profile pages
│   └── search/             # Search page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components
│   ├── feed/               # Feed-related components
│   ├── profile/            # Profile components
│   └── search/             # Search components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configs
├── store/                  # Redux store and slices
├── providers/              # React context providers
└── types/                  # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/social-feed.git
cd social-feed
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📸 Screenshots

### Home Feed

The main feed displays posts with infinite scrolling, like/unlike functionality, and expandable comments.

### User Profile

Profile pages show user information, follower/following counts, and the user's posts.

### Search

Real-time search with filters for posts and users, featuring text highlighting.

### Create Post

Rich post creation modal with text input, character count, and image upload.

## 🏗️ Architecture

### State Management

- **Redux Toolkit** for local state (likes, comments, UI modals)
- **TanStack Query** for server state (API data fetching and caching)

### Component Design

- **Atomic Design** principles with reusable UI components
- **Separation of Concerns** between UI, logic, and data layers
- **Custom Hooks** for business logic encapsulation

### Data Flow

1. API data fetched via React Query hooks
2. Local interactions managed through Redux slices
3. Components receive data through custom hooks
4. Optimistic updates for immediate feedback

## 📋 API Reference

This app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock REST API:

| Endpoint              | Description                   |
| --------------------- | ----------------------------- |
| `/posts`              | Get all posts (100 available) |
| `/users`              | Get all users (10 available)  |
| `/posts/:id/comments` | Get comments for a post       |
| `/posts?userId=:id`   | Get posts by user             |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free fake API
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

Made with ❤️ using Next.js and TypeScript
