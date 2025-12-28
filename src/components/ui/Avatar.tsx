"use client";

import { getAvatarUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showOnlineIndicator?: boolean;
  isOnline?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const sizePixels = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

export function Avatar({
  name,
  src,
  size = "md",
  className,
  showOnlineIndicator = false,
  isOnline = false,
}: AvatarProps) {
  const avatarSrc = src || getAvatarUrl(name, sizePixels[size] * 2);

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-white/20",
          sizeClasses[size]
        )}
      >
        <img
          src={avatarSrc}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {showOnlineIndicator && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-gray-900",
            size === "sm" ? "w-2 h-2" : "w-3 h-3",
            isOnline ? "bg-green-500" : "bg-gray-500"
          )}
        />
      )}
    </div>
  );
}
