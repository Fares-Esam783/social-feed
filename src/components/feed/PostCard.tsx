"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { Post, User } from "@/types";
import { getPostImageUrl, getAvatarUrl } from "@/lib/constants";
import {
  capitalizeFirst,
  formatRelativeTime,
  generateRandomRecentDate,
  randomBetween,
} from "@/lib/utils";
import { useMemo, useState } from "react";

interface PostCardProps {
  post: Post;
  author?: User;
  showImage?: boolean;
  index?: number;
}

export function PostCard({
  post,
  author,
  showImage = true,
  index = 0,
}: PostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Memoize random values so they don't change on re-render
  const postData = useMemo(
    () => ({
      createdAt: generateRandomRecentDate(),
      commentsCount: randomBetween(0, 50),
      hasImage: showImage && post.id % 3 !== 0, // 2/3 of posts have images
    }),
    [post.id, showImage]
  );

  const authorName = author?.name || "Unknown User";
  const authorUsername = author?.username || "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden">
        {/* Post Header */}
        <div className="p-4 flex items-start gap-3">
          <Link href={`/profile/${post.userId}`}>
            <Avatar
              name={authorName}
              src={getAvatarUrl(authorName)}
              size="md"
              className="hover:ring-2 hover:ring-purple-500 transition-all"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${post.userId}`}
                className="font-semibold text-white hover:text-purple-400 transition-colors truncate"
              >
                {authorName}
              </Link>
              <span className="text-gray-500 text-sm">@{authorUsername}</span>
            </div>
            <p className="text-xs text-gray-500">
              {formatRelativeTime(postData.createdAt)}
            </p>
          </div>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <h3 className="text-lg font-semibold text-white mb-2">
            {capitalizeFirst(post.title)}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {capitalizeFirst(post.body)}
          </p>
        </div>

        {/* Post Image */}
        {postData.hasImage && (
          <div className="relative overflow-hidden">
            <img
              src={getPostImageUrl(post.id)}
              alt="Post image"
              className="w-full h-64 sm:h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
          </div>
        )}

        {/* Post Actions */}
        <div className="px-4 py-2 flex items-center gap-1">
          <LikeButton postId={post.id} />

          <button className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              {postData.commentsCount}
            </span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-colors">
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`ml-auto p-2 rounded-xl transition-colors ${
              isBookmarked
                ? "text-yellow-500"
                : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/10"
            }`}
          >
            <Bookmark
              className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Comments Section */}
        <CommentSection
          postId={post.id}
          commentsCount={postData.commentsCount}
        />
      </Card>
    </motion.div>
  );
}
