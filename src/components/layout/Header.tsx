"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Plus, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/constants";
import { useAppDispatch } from "@/store/hooks";
import { openCreatePostModal, toggleMobileMenu } from "@/store/slices/uiSlice";

export function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const isSearchPage = pathname === "/search";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25"
          >
            <span className="text-white font-bold text-lg">S</span>
          </motion.div>
          <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </Link>

        {/* Search Bar (Desktop) */}
        {!isSearchPage && (
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <Link href="/search" className="w-full">
              <div className="flex items-center gap-3 w-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-gray-400 transition-all cursor-pointer">
                <Search className="w-5 h-5" />
                <span className="text-sm">Search posts and people...</span>
              </div>
            </Link>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Create Post Button */}
          <Button
            onClick={() => dispatch(openCreatePostModal())}
            size="sm"
            className="hidden sm:flex"
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create
          </Button>

          {/* Mobile Create Button */}
          <Button
            onClick={() => dispatch(openCreatePostModal())}
            size="sm"
            variant="ghost"
            className="sm:hidden"
          >
            <Plus className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar */}
          <Link href="/profile/1" className="hidden sm:block">
            <Avatar name="Current User" size="sm" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="sm:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
