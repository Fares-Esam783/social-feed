"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { CommentSkeleton } from "@/components/ui/Skeleton";
import { useComments } from "@/hooks/useComments";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addComment } from "@/store/slices/commentsSlice";
import { formatRelativeTime } from "@/lib/utils";
import { Comment } from "@/types";

interface CommentSectionProps {
  postId: number;
  commentsCount: number;
}

export function CommentSection({ postId, commentsCount }: CommentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useAppDispatch();

  const { data: apiComments, isLoading, error } = useComments(postId);
  const localComments = useAppSelector(
    (state) => state.comments.localComments[postId] || []
  );

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    dispatch(
      addComment({
        id: `local-${Date.now()}`,
        postId,
        body: newComment.trim(),
        author: {
          name: "Current User",
          avatar: "",
        },
        createdAt: new Date().toISOString(),
      })
    );
    setNewComment("");
  };

  const totalComments = commentsCount + localComments.length;

  return (
    <div className="border-t border-gray-800">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/30 transition-colors"
      >
        <span className="text-sm font-medium">
          {totalComments} {totalComments === 1 ? "Comment" : "Comments"}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Comments List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Add Comment Form */}
            <form
              onSubmit={handleSubmitComment}
              className="px-4 py-3 border-t border-gray-800/50"
            >
              <div className="flex items-center gap-3">
                <Avatar name="Current User" size="sm" />
                <div className="flex-1 relative">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="pr-10"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Local Comments (newest first) */}
            {localComments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 border-t border-gray-800/30"
              >
                <div className="flex gap-3">
                  <Avatar name={comment.author.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* API Comments */}
            {isLoading && (
              <div className="divide-y divide-gray-800/30">
                {[...Array(3)].map((_, i) => (
                  <CommentSkeleton key={i} />
                ))}
              </div>
            )}

            {error && (
              <div className="px-4 py-6 text-center text-gray-500">
                Failed to load comments
              </div>
            )}

            {apiComments && apiComments.length > 0 && (
              <div className="divide-y divide-gray-800/30">
                {apiComments.slice(0, 5).map((comment: Comment) => (
                  <div key={comment.id} className="px-4 py-3">
                    <div className="flex gap-3">
                      <Avatar name={comment.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white truncate">
                            {comment.name.split(" ").slice(0, 2).join(" ")}
                          </span>
                          <span className="text-xs text-gray-500">2d ago</span>
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-3">
                          {comment.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {apiComments &&
              apiComments.length === 0 &&
              localComments.length === 0 && (
                <div className="px-4 py-6 text-center text-gray-500">
                  No comments yet. Be the first to comment!
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
