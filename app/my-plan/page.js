"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { usePlan } from "@/components/PlanProvider";

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tab === "saved" ? "saved" : "plan"
  );

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const handleRemove = (id) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      toast.success("Workout removed from today's plan.");
    } else {
      removeFromSaved(id);
      toast.success("Workout removed from saved.");
    }
  };

  const handleMarkAsDone = (id) => {
    removeFromPlan(id);
    toast.success("Workout marked as done.");
  };

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c2f800]">
            Your Workouts
          </p>

          <h1 className="mt-3 font-['Oswald'] text-5xl font-bold">
            My Plan
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
            <p className="text-sm tracking-wider text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-bold">
              {plan.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
            <p className="text-sm tracking-wider text-gray-500">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
            <p className="text-sm tracking-wider text-gray-500">
              Calories
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="mt-12 flex gap-3 border-b border-gray-800 pb-4">

          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              activeTab === "plan"
                ? "bg-[#c2f800] text-black"
                : "border border-gray-700 text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              activeTab === "saved"
                ? "bg-[#c2f800] text-black"
                : "border border-gray-700 text-gray-400"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Workout Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {currentWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="overflow-hidden rounded-xl border border-gray-800 bg-[#1a1a1a]"
            >
              <Image
                src={workout.image}
                alt={workout.name}
                width={740}
                height={416}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="font-['Oswald'] text-2xl font-bold">
                  {workout.name}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {workout.equipment}
                </p>

                <div className="mt-4 flex justify-between text-sm text-gray-400">
                  <span>{workout.duration} min</span>
                  <span>{workout.caloriesBurned} kcal</span>
                </div>

                <div className="mt-5 flex gap-2">

                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex-1 rounded-full border border-gray-600 px-4 py-3 text-center text-sm font-bold"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => handleMarkAsDone(workout.id)}
                      className="rounded-full bg-[#c2f800] px-4 py-3 text-sm font-bold text-black"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(workout.id)}
                    className="rounded-full border border-gray-600 px-4 py-3 text-sm font-bold text-white"
                  >
                    × Remove
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {currentWorkouts.length === 0 && (
          <div className="mt-12 rounded-xl border border-gray-800 bg-[#1a1a1a] px-6 py-16 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Nothing Here Yet
            </p>

            <p className="mt-4 text-gray-400">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#c2f800] px-6 py-3 text-sm font-bold text-black"
            >
              Go to workouts
            </Link>

          </div>
        )}

      </div>
    </main>
  );
}