"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { openCreatePostModal } from "@/store/slices/uiSlice";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Create", href: "#", icon: PlusSquare, isAction: true },
  { label: "Profile", href: "/profile/1", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-gray-950/95 backdrop-blur-xl border-t border-gray-800/50">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(openCreatePostModal())}
                className="flex flex-col items-center gap-1"
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </motion.button>
            );
          }

          return (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                  isActive ? "text-white" : "text-gray-500"
                )}
              >
                <Icon className="w-6 h-6" />
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="w-1 h-1 rounded-full bg-purple-500"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
