// API Types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Extended Types for UI
export interface ExtendedPost extends Post {
  author?: User;
  image?: string;
  likes: number;
  isLiked: boolean;
  commentsCount: number;
  createdAt: string;
}

export interface LocalComment {
  id: string;
  postId: number;
  body: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

// UI State Types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface SearchFilters {
  query: string;
  type: "posts" | "users" | "all";
}
