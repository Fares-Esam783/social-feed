"use client";

import { useUserPosts } from "@/hooks/usePosts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { PostCard } from "@/components/feed/PostCard";
import { PostCardSkeleton } from "@/components/ui/Skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { User } from "@/types";

interface UserPostsProps {
  userId: number;
  user?: User;
}

export function UserPosts({ userId, user }: UserPostsProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useUserPosts(userId);

  const { loadMoreRef } = useInfiniteScroll({
    hasMore: hasNextPage ?? false,
    isLoading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 mt-6">
        <h2 className="text-xl font-bold text-white">Posts</h2>
        {[...Array(2)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="mt-6 bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">
          Failed to load posts
        </h3>
        <Button
          onClick={() => refetch()}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      </div>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="mt-6 bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No posts yet</h3>
        <p className="text-gray-400">This user hasn't created any posts yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-white mb-4">Posts</h2>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} author={user} index={index} />
        ))}

        {/* Load More Trigger */}
        <div ref={loadMoreRef} className="py-4">
          {isFetchingNextPage && (
            <div className="space-y-6">
              <PostCardSkeleton />
            </div>
          )}

          {!hasNextPage && posts.length > 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500">No more posts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
