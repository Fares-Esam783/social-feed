import { useInfiniteQuery } from "@tanstack/react-query";
import { enhancedApi, postsApi } from "@/lib/api";
import { POSTS_PER_PAGE } from "@/lib/constants";

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      enhancedApi.getPostsWithAuthors(pageParam, POSTS_PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
  });
}

export function useUserPosts(userId: number) {
  return useInfiniteQuery({
    queryKey: ["userPosts", userId],
    queryFn: async ({ pageParam }) => {
      const allPosts = await postsApi.getByUserId(userId);
      const start = (pageParam - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      const posts = allPosts.slice(start, end);

      return {
        posts,
        hasMore: end < allPosts.length,
        nextPage: pageParam + 1,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
  });
}

export function useSearchPosts(query: string) {
  return useInfiniteQuery({
    queryKey: ["searchPosts", query],
    queryFn: async ({ pageParam }) => {
      if (!query.trim()) {
        return { posts: [], hasMore: false, nextPage: 1 };
      }

      const allPosts = await postsApi.search(query);
      const start = (pageParam - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      const posts = allPosts.slice(start, end);

      return {
        posts,
        hasMore: end < allPosts.length,
        nextPage: pageParam + 1,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    enabled: query.length > 0,
  });
}
