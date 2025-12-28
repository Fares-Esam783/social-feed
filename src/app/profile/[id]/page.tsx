"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/useUsers";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { UserPosts } from "@/components/profile/UserPosts";
import { ProfileHeaderSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = use(params);
  const userId = parseInt(id, 10);
  const { data: user, isLoading, isError, refetch } = useUser(userId);

  return (
    <div className="py-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-4"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </Link>
      </motion.div>

      {/* Loading State */}
      {isLoading && <ProfileHeaderSkeleton />}

      {/* Error State */}
      {isError && (
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Failed to load profile
          </h3>
          <p className="text-gray-400 mb-4">
            User not found or an error occurred
          </p>
          <Button
            onClick={() => refetch()}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Profile Content */}
      {user && (
        <>
          <ProfileHeader user={user} />
          <UserPosts userId={userId} user={user} />
        </>
      )}
    </div>
  );
}
