"use client";

import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Calendar, Mail } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { User } from "@/types";
import { getAvatarUrl } from "@/lib/constants";
import { randomBetween } from "@/lib/utils";
import { useMemo } from "react";

interface ProfileHeaderProps {
  user: User;
  isLoading?: boolean;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  // Memoize random stats so they don't change on re-render
  const stats = useMemo(
    () => ({
      followers: randomBetween(100, 10000),
      following: randomBetween(50, 500),
      posts: randomBetween(10, 200),
    }),
    []
  );

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden"
    >
      {/* Cover Image */}
      <div className="h-32 sm:h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 pb-6">
        {/* Avatar & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Avatar
              name={user.name}
              src={getAvatarUrl(user.name, 200)}
              size="xl"
              className="ring-4 ring-gray-900 w-24 h-24 sm:w-32 sm:h-32"
            />
          </motion.div>

          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 sm:pt-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400">@{user.username}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="primary">Follow</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 sm:gap-8 mt-6">
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold text-white">
              {formatNumber(stats.posts)}
            </p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold text-white">
              {formatNumber(stats.followers)}
            </p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold text-white">
              {formatNumber(stats.following)}
            </p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>

        {/* Bio - using company catchphrase as placeholder bio */}
        <p className="mt-4 text-gray-300 leading-relaxed">
          {user.company.catchPhrase}. {user.company.bs}.
        </p>

        {/* Details */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{user.address.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4" />
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              {user.website}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            <span>{user.email.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Joined January 2023</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
