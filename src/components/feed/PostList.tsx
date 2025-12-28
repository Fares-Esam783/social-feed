"use client";

import { usePosts } from "@/hooks/usePosts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "@/components/ui/Skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = usePosts();

  const { loadMoreRef } = useInfiniteScroll({
    hasMore: hasNextPage ?? false,
    isLoading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">
          Failed to load posts
        </h3>
        <p className="text-gray-400 mb-4">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
        <Button
          onClick={() => refetch()}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Empty state
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (posts.length === 0) {
    return (
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📭</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No posts yet</h3>
        <p className="text-gray-400">
          Be the first to create a post and share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          author={post.author}
          index={index}
        />
      ))}

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="py-4">
        {isFetchingNextPage && (
          <div className="space-y-6">
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        )}

        {!hasNextPage && posts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">You've reached the end! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
