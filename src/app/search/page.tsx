"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchPosts } from "@/hooks/usePosts";
import { useSearchUsers } from "@/hooks/useUsers";
import { cn } from "@/lib/utils";

type FilterType = "all" | "posts" | "users";

const filterOptions: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Posts", value: "posts" },
  { label: "People", value: "users" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: postsData, isLoading: isLoadingPosts } =
    useSearchPosts(debouncedQuery);

  const { data: users, isLoading: isLoadingUsers } =
    useSearchUsers(debouncedQuery);

  const posts = postsData?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="py-6">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Search</h1>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search posts and people..."
          autoFocus
        />

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                filter === option.value
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search Results */}
      <SearchResults
        posts={posts}
        users={users ?? []}
        isLoadingPosts={isLoadingPosts}
        isLoadingUsers={isLoadingUsers}
        searchQuery={debouncedQuery}
        filter={filter}
      />
    </div>
  );
}
