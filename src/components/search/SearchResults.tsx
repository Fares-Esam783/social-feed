"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { PostCardSkeleton, UserCardSkeleton } from "@/components/ui/Skeleton";
import { Post, User } from "@/types";
import { capitalizeFirst, truncateText } from "@/lib/utils";
import { getAvatarUrl } from "@/lib/constants";

interface SearchResultsProps {
  posts: Post[];
  users: User[];
  isLoadingPosts: boolean;
  isLoadingUsers: boolean;
  searchQuery: string;
  filter: "all" | "posts" | "users";
}

export function SearchResults({
  posts,
  users,
  isLoadingPosts,
  isLoadingUsers,
  searchQuery,
  filter,
}: SearchResultsProps) {
  const showPosts = filter === "all" || filter === "posts";
  const showUsers = filter === "all" || filter === "users";

  const hasResults = posts.length > 0 || users.length > 0;
  const isLoading = isLoadingPosts || isLoadingUsers;

  // No search query
  if (!searchQuery) {
    return (
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Start searching
        </h3>
        <p className="text-gray-400">
          Find posts and people by typing in the search bar above
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {showUsers && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">People</h3>
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <UserCardSkeleton key={i} />
              ))}
            </div>
          </div>
        )}
        {showPosts && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Posts</h3>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // No results
  if (!hasResults) {
    return (
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">😕</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No results found
        </h3>
        <p className="text-gray-400">
          No matches for &quot;{searchQuery}&quot;. Try a different search term.
        </p>
      </div>
    );
  }

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          className="bg-purple-500/30 text-purple-300 rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Users */}
      {showUsers && users.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">People</h3>
          <div className="space-y-3">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
                className="block"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 flex items-center gap-4 hover:border-gray-700 transition-colors"
                >
                  <Avatar
                    name={user.name}
                    src={getAvatarUrl(user.name)}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {highlightMatch(user.name, searchQuery)}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      @{highlightMatch(user.username, searchQuery)}
                    </p>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {user.company.catchPhrase}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Posts */}
      {showPosts && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Posts</h3>
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ x: 4 }}
                className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <h4 className="font-semibold text-white mb-2">
                  {highlightMatch(capitalizeFirst(post.title), searchQuery)}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {highlightMatch(
                    truncateText(capitalizeFirst(post.body), 150),
                    searchQuery
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
