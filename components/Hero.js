"use client";

import Image from "next/image";
// import Link from "next/link";

export default function Hero() {
  const scrollToLibrary = () => {
    const librarySection = document.getElementById("library");

    if (librarySection) {
      librarySection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="rounded-xl bg-[#1a1a1a] text-white">
      <div className="mx-auto grid min-h-155 max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

        {/* Hero Content */}
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#c2f800]">
            Workout Library
          </p>

          <h1 className="max-w-3xl font-['Oswald'] text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            type="button"
            onClick={scrollToLibrary}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c2f800] px-7 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[#b5ed00]"
          >
            <span>Browse Workouts</span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/assets/banner.png"
            alt="Workout"
            width={700}
            height={700}
            className="w-full max-w-lg object-contain"
          />
        </div>

      </div>
    </section>
  );
}