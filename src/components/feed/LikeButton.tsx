"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleLike, initializeLikeCount } from "@/store/slices/postsSlice";
import { useEffect } from "react";
import { randomBetween } from "@/lib/utils";

interface LikeButtonProps {
  postId: number;
  className?: string;
}

export function LikeButton({ postId, className }: LikeButtonProps) {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) =>
    state.posts.likedPosts.includes(postId)
  );
  const likeCount = useAppSelector(
    (state) => state.posts.likeCounts[postId] ?? 0
  );

  // Initialize like count on mount
  useEffect(() => {
    dispatch(initializeLikeCount({ postId, count: randomBetween(10, 500) }));
  }, [dispatch, postId]);

  const handleClick = () => {
    dispatch(toggleLike(postId));
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl transition-colors group",
        isLiked
          ? "text-red-500"
          : "text-gray-400 hover:text-red-500 hover:bg-red-500/10",
        className
      )}
      aria-label={isLiked ? "Unlike post" : "Like post"}
    >
      <motion.div
        animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn("w-5 h-5 transition-all", isLiked && "fill-current")}
        />
      </motion.div>
      <span className="text-sm font-medium">{likeCount}</span>
    </motion.button>
  );
}
