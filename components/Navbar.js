"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlan } from "@/components/PlanProvider";

export default function Navbar() {
  const { plan, saved } = usePlan();

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const planCount = plan.length;
  const savedCount = saved.length;

  // const isWorkoutActive = pathname === "/";
  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workouts/");
  const isPlanActive = pathname === "/my-plan";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="relative border-b border-gray-800 bg-black text-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
        </button>

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center"
        >
          <span className="font-['Oswald'] text-2xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="/"
            className={`text-sm font-bold tracking-wide transition ${isWorkoutActive
                ? "text-[#c2f800]"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-bold tracking-wide transition ${isPlanActive
                ? "text-[#c2f800]"
                : "text-gray-400 hover:text-white"
              }`}
          >
            My Plan
          </Link>
        </div>

        {/* Desktop Status */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#c2f800] px-4 py-2 text-xs font-bold tracking-wide text-black transition hover:bg-[#b5ed00]"
          >
            <span>Plan</span>
            <span>{planCount}</span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 rounded-full border border-gray-500 px-4 py-2 text-xs font-bold tracking-wide text-white transition hover:border-white"
          >
            <span>Saved</span>
            <span>{savedCount}</span>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="px-2 py-2 text-xs font-bold text-white"
          >
            Sign In
          </button>

          <button
            type="button"
            className="rounded-full bg-[#c2f800] px-3 py-2 text-xs font-bold text-black"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-800 bg-[#1a1a1a] px-4 py-5 md:hidden">
          <div className="flex flex-col gap-3">

            <Link
              href="/"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-bold transition ${isWorkoutActive
                  ? "bg-[#c2f800] text-black"
                  : "text-white hover:bg-gray-800"
                }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-bold transition ${isPlanActive
                  ? "bg-[#c2f800] text-black"
                  : "text-white hover:bg-gray-800"
                }`}
            >
              My Plan
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              <span>Plan</span>

              <span className="rounded-full bg-[#c2f800] px-3 py-1 text-xs text-black">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              <span>Saved</span>

              <span className="rounded-full border border-gray-500 px-3 py-1 text-xs text-white">
                {savedCount}
              </span>
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}