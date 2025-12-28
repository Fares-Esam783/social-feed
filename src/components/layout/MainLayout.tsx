"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { CreatePostModal } from "@/components/feed/CreatePostModal";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-20 sm:pb-6">
        <div className="flex gap-6">
          <Sidebar />

          <main className="flex-1 min-w-0 max-w-2xl mx-auto lg:mx-0">
            {children}
          </main>

          {/* Right Sidebar - Hidden on smaller screens */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            {/* This could contain ads, suggestions, or other content */}
          </div>
        </div>
      </div>

      <MobileNav />
      <CreatePostModal />
    </div>
  );
}
