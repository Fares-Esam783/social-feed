"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
}

export function Skeleton({ className, variant = "rounded" }: SkeletonProps) {
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-xl",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-gray-800",
        variantClasses[variant],
        className
      )}
    />
  );
}

// Pre-built skeleton components for common use cases
export function PostCardSkeleton() {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Image placeholder */}
      <Skeleton className="w-full h-64 rounded-none" />

      {/* Actions */}
      <div className="p-4 flex items-center gap-6">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 flex items-center gap-4">
      <Skeleton variant="circular" className="w-12 h-12" />
      <div className="flex-1">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-9 w-20" />
    </div>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden">
      {/* Cover */}
      <Skeleton className="w-full h-32 rounded-none" />

      {/* Profile */}
      <div className="px-6 pb-6">
        <div className="flex items-end gap-4 -mt-10">
          <Skeleton
            variant="circular"
            className="w-20 h-20 ring-4 ring-gray-900"
          />
          <div className="flex-1 pt-12">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-6">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>

        {/* Bio */}
        <div className="mt-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="flex gap-3 p-3">
      <Skeleton variant="circular" className="w-8 h-8 flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
