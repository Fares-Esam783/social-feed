"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, X, Smile, MapPin } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Textarea } from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeCreatePostModal } from "@/store/slices/uiSlice";

const MAX_POST_LENGTH = 500;

export function CreatePostModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCreatePostModalOpen);

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleClose = () => {
    dispatch(closeCreatePostModal());
    // Reset form after animation
    setTimeout(() => {
      setContent("");
      setSelectedImage(null);
    }, 200);
  };

  const handleImageSelect = () => {
    // Mock image selection - in real app, would use file input
    const mockImages = [
      "https://picsum.photos/seed/new1/800/400",
      "https://picsum.photos/seed/new2/800/400",
      "https://picsum.photos/seed/new3/800/400",
    ];
    setSelectedImage(mockImages[Math.floor(Math.random() * mockImages.length)]);
  };

  const handlePost = async () => {
    if (!content.trim()) return;

    setIsPosting(true);

    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, we would:
    // 1. Call an API to create the post
    // 2. Invalidate the posts query to refetch
    // 3. Show a success toast

    setIsPosting(false);
    handleClose();
  };

  const isValid =
    content.trim().length > 0 && content.length <= MAX_POST_LENGTH;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Post" size="lg">
      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar name="Current User" size="md" />
          <div>
            <p className="font-medium text-white">Current User</p>
            <p className="text-sm text-gray-500">Posting publicly</p>
          </div>
        </div>

        {/* Content Input */}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          maxLength={MAX_POST_LENGTH}
          showCount
          className="text-lg"
        />

        {/* Selected Image Preview */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-xl overflow-hidden"
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex items-center gap-1">
            <button
              onClick={handleImageSelect}
              className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
              title="Add image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
              title="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              title="Add location"
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>

          <Button
            onClick={handlePost}
            disabled={!isValid}
            isLoading={isPosting}
          >
            Post
          </Button>
        </div>
      </div>
    </Modal>
  );
}
