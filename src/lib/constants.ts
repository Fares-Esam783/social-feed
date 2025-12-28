// API Configuration
export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Pagination
export const POSTS_PER_PAGE = 10;
export const COMMENTS_PER_POST = 5;

// Avatar placeholders (using UI Avatars API)
export const getAvatarUrl = (name: string, size: number = 100): string => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=random&bold=true`;
};

// Random image for posts (using Picsum)
export const getPostImageUrl = (
  postId: number,
  width: number = 800,
  height: number = 400
): string => {
  return `https://picsum.photos/seed/${postId}/${width}/${height}`;
};

// App Constants
export const APP_NAME = "SocialFeed";

// Navigation Items
export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Search", href: "/search", icon: "Search" },
  { label: "Profile", href: "/profile/1", icon: "User" },
] as const;

// Animation Durations
export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;
