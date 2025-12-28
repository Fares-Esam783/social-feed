"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  User,
  Bookmark,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Profile", href: "/profile/1", icon: User },
  { label: "Bookmarks", href: "#", icon: Bookmark },
  { label: "Settings", href: "#", icon: Settings },
];

const trendingTopics = [
  { tag: "Technology", posts: "12.5K" },
  { tag: "Design", posts: "8.2K" },
  { tag: "Development", posts: "6.8K" },
  { tag: "AI", posts: "15.1K" },
];

const suggestedUsers = [
  { name: "John Doe", username: "johndoe", id: 1 },
  { name: "Jane Smith", username: "janesmith", id: 2 },
  { name: "Bob Johnson", username: "bobjohnson", id: 3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 sticky top-20 h-[calc(100vh-5rem)] py-6 pr-6 overflow-y-auto scrollbar-hide">
      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Trending */}
      <div className="mt-8">
        <div className="flex items-center gap-2 px-4 mb-3">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-gray-300">Trending</h3>
        </div>
        <div className="space-y-2">
          {trendingTopics.map((topic) => (
            <button
              key={topic.tag}
              className="w-full text-left px-4 py-2 rounded-xl hover:bg-gray-800/50 transition-colors group"
            >
              <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
                #{topic.tag}
              </p>
              <p className="text-xs text-gray-500">{topic.posts} posts</p>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="mt-8">
        <div className="flex items-center gap-2 px-4 mb-3">
          <Users className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-semibold text-gray-300">Who to Follow</h3>
        </div>
        <div className="space-y-2">
          {suggestedUsers.map((user) => (
            <Link
              key={user.id}
              href={`/profile/${user.id}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
