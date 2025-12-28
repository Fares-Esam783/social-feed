import { API_BASE_URL, POSTS_PER_PAGE } from "./constants";
import { User, Post, Comment, Photo } from "@/types";

// Generic fetch helper
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Posts API
export const postsApi = {
  getAll: () => fetchApi<Post[]>("/posts"),

  getPaginated: async (page: number, limit: number = POSTS_PER_PAGE) => {
    const posts = await fetchApi<Post[]>(
      `/posts?_page=${page}&_limit=${limit}`
    );
    return {
      posts,
      hasMore: posts.length === limit,
      nextPage: page + 1,
    };
  },

  getById: (id: number) => fetchApi<Post>(`/posts/${id}`),

  getByUserId: (userId: number) => fetchApi<Post[]>(`/posts?userId=${userId}`),

  search: async (query: string) => {
    const allPosts = await fetchApi<Post[]>("/posts");
    const lowercaseQuery = query.toLowerCase();
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.body.toLowerCase().includes(lowercaseQuery)
    );
  },
};

// Users API
export const usersApi = {
  getAll: () => fetchApi<User[]>("/users"),

  getById: (id: number) => fetchApi<User>(`/users/${id}`),

  search: async (query: string) => {
    const allUsers = await fetchApi<User[]>("/users");
    const lowercaseQuery = query.toLowerCase();
    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.username.toLowerCase().includes(lowercaseQuery)
    );
  },
};

// Comments API
export const commentsApi = {
  getByPostId: (postId: number) =>
    fetchApi<Comment[]>(`/posts/${postId}/comments`),

  getAll: () => fetchApi<Comment[]>("/comments"),
};

// Photos API (for post images)
export const photosApi = {
  getByAlbumId: (albumId: number) =>
    fetchApi<Photo[]>(`/albums/${albumId}/photos`),

  getById: (id: number) => fetchApi<Photo>(`/photos/${id}`),
};

// Combined APIs for enhanced data
export const enhancedApi = {
  getPostsWithAuthors: async (page: number, limit: number = POSTS_PER_PAGE) => {
    const [postsData, users] = await Promise.all([
      postsApi.getPaginated(page, limit),
      usersApi.getAll(),
    ]);

    const usersMap = new Map(users.map((user) => [user.id, user]));

    const postsWithAuthors = postsData.posts.map((post) => ({
      ...post,
      author: usersMap.get(post.userId),
    }));

    return {
      posts: postsWithAuthors,
      hasMore: postsData.hasMore,
      nextPage: postsData.nextPage,
    };
  },
};
