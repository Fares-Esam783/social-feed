"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PostList } from "@/components/feed/PostList";

export default function HomePage() {
  return (
    <div className="py-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Your Feed</h1>
        </div>
        <p className="text-gray-400">
          Discover what's happening in your network
        </p>
      </motion.div>

      {/* Posts Feed */}
      <PostList />
    </div>
  );
}
