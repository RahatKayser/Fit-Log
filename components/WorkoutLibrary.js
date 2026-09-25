"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch workouts:", error);
        setError("Failed to load workouts. Please try again.");
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  if (loading) {
    return (
      <section id="library" className="bg-black px-6 py-20">
        <div className="mx-auto flex min-h-100 max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#c2f800]"></div>

            <p className="mt-5 text-sm text-gray-400">
              Loading workouts...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="library" className="bg-black px-6 py-20">
        <div className="mx-auto flex min-h-100 max-w-7xl items-center justify-center">
          <p className="text-center text-gray-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="library" className="bg-black px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
              Workout Library
            </p>

            <h2 className="font-['Oswald'] text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              The Library
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none rounded-full border border-gray-700 bg-[#1a1a1a] px-5 py-3 pr-10 text-sm font-bold text-white outline-none transition focus:border-[#c2f800]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>
        </div>

        {/* Workout Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <Link
              href={`/workouts/${workout.id}`}
              key={workout.id}
              className="block overflow-hidden rounded-xl border border-gray-800 bg-[#1a1a1a] text-white transition hover:-translate-y-1 hover:border-gray-700"
            >
              <Image
                src={workout.image}
                alt={workout.name}
                width={740}
                height={416}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                {/* Muscle Tags */}
                <div className="flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-[#c2f800] px-3 py-1 text-xs font-bold text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 font-['Oswald'] text-2xl font-bold">
                  {workout.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {workout.equipment}
                </p>

                {/* Stats */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4 text-sm text-gray-400">
                  <span>⏱ {workout.duration} min</span>

                  <span>🔥 {workout.caloriesBurned} kcal</span>

                  <span>★ {workout.rating}</span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}