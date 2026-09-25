import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="font-['Oswald'] text-xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}