// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Suspense, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { toast } from "react-toastify";
// import { usePlan } from "@/components/PlanProvider";

// function MyPlanContent() {
//   const {
//     plan,
//     saved,
//     removeFromPlan,
//     removeFromSaved,
//   } = usePlan();

//   const searchParams = useSearchParams();
//   const tab = searchParams.get("tab");

//   const [activeTab, setActiveTab] = useState(
//     tab === "saved" ? "saved" : "plan"
//   );

//   const [sortBy, setSortBy] = useState("duration");

//   const currentWorkouts = activeTab === "plan" ? plan : saved;

//   const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
//     if (sortBy === "duration") {
//       return a.duration - b.duration;
//     }

//     if (sortBy === "calories") {
//       return a.caloriesBurned - b.caloriesBurned;
//     }

//     if (sortBy === "rating") {
//       return b.rating - a.rating;
//     }

//     return 0;
//   });

//   const totalMinutes = plan.reduce(
//     (total, workout) => total + workout.duration,
//     0
//   );

//   const totalCalories = plan.reduce(
//     (total, workout) => total + workout.caloriesBurned,
//     0
//   );

//   const handleRemove = (id) => {
//     if (activeTab === "plan") {
//       removeFromPlan(id);
//       toast.success("Workout removed from today's plan.");
//     } else {
//       removeFromSaved(id);
//       toast.success("Workout removed from saved.");
//     }
//   };

//   const handleMarkAsDone = (id) => {
//     removeFromPlan(id);
//     toast.success("Workout marked as done.");
//   };

//   return (
//     <main className="min-h-screen bg-black px-6 py-16 text-white">
//       <div className="mx-auto max-w-7xl">

//         {/* Header */}
//         <div>
//           <h1 className="mt-3 font-['Oswald'] text-5xl font-bold">
//             MY PLAN 
//           </h1>

//           <p className="mt-4 max-w-2xl text-gray-400">
//             Cap of five lifts for today. Finish them, then load more.
//           </p>
//         </div>

//         {/* Metrics */}
//         <div className="mt-10 grid gap-4 sm:grid-cols-3">

//           <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
//             <p className="text-sm tracking-wider text-gray-500">
//               Exercises
//             </p>

//             <p className="mt-2 text-3xl font-bold">
//               {plan.length}
//             </p>
//           </div>

//           <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
//             <p className="text-sm tracking-wider text-gray-500">
//               Minutes
//             </p>

//             <p className="mt-2 text-3xl font-bold">
//               {totalMinutes}
//             </p>
//           </div>

//           <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
//             <p className="text-sm tracking-wider text-gray-500">
//               Calories
//             </p>

//             <p className="mt-2 text-3xl font-bold">
//               {totalCalories}
//             </p>
//           </div>

//         </div>

//         {/* Tabs */}
//         <div className="mt-12 flex gap-3 border-b border-gray-800 pb-4">

//           <button
//             onClick={() => setActiveTab("plan")}
//             className={`rounded-full px-5 py-2 text-sm font-bold ${
//               activeTab === "plan"
//                 ? "bg-[#c2f800] text-black"
//                 : "border border-gray-700 text-gray-400"
//             }`}
//           >
//             Today&apos;s Plan
//           </button>

//           <button
//             onClick={() => setActiveTab("saved")}
//             className={`rounded-full px-5 py-2 text-sm font-bold ${
//               activeTab === "saved"
//                 ? "bg-[#c2f800] text-black"
//                 : "border border-gray-700 text-gray-400"
//             }`}
//           >
//             Saved
//           </button>

//         </div>

//         {/* Sort Dropdown */}
//         <div className="mt-8 flex justify-end">
//           <div className="relative">
//             <select
//               value={sortBy}
//               onChange={(event) => setSortBy(event.target.value)}
//               className="appearance-none rounded-full border border-gray-700 bg-[#1a1a1a] px-5 py-3 pr-10 text-sm font-bold text-white outline-none transition focus:border-[#c2f800]"
//             >
//               <option value="duration">Duration</option>
//               <option value="calories">Calories</option>
//               <option value="rating">Rating</option>
//             </select>

//             <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
//               ▼
//             </span>
//           </div>
//         </div>

//         {/* Workout Cards */}
//         <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

//           {sortedWorkouts.map((workout) => (
//             <div
//               key={workout.id}
//               className="overflow-hidden rounded-xl border border-gray-800 bg-[#1a1a1a]"
//             >
//               <Image
//                 src={workout.image}
//                 alt={workout.name}
//                 width={740}
//                 height={416}
//                 className="h-52 w-full object-cover"
//               />

//               <div className="p-5">

//                 <h2 className="font-['Oswald'] text-2xl font-bold">
//                   {workout.name}
//                 </h2>

//                 <p className="mt-2 text-sm text-gray-400">
//                   {workout.equipment}
//                 </p>

//                 <div className="mt-4 flex justify-between text-sm text-gray-400">
//                   <span>{workout.duration} min</span>
//                   <span>{workout.caloriesBurned} kcal</span>
//                 </div>

//                 <div className="mt-5 flex gap-2">

//                   <Link
//                     href={`/workouts/${workout.id}`}
//                     className="flex-1 rounded-full border border-gray-600 px-4 py-3 text-center text-sm font-bold"
//                   >
//                     View Details
//                   </Link>

//                   {activeTab === "plan" && (
//                     <button
//                       onClick={() => handleMarkAsDone(workout.id)}
//                       className="rounded-full bg-[#c2f800] px-4 py-3 text-sm font-bold text-black"
//                     >
//                       ✓ Mark as Done
//                     </button>
//                   )}

//                   <button
//                     onClick={() => handleRemove(workout.id)}
//                     className="rounded-full border border-gray-600 px-4 py-3 text-sm font-bold text-white"
//                   >
//                     × Remove
//                   </button>

//                 </div>

//               </div>
//             </div>
//           ))}

//         </div>

//         {/* Empty State */}
//         {currentWorkouts.length === 0 && (
//           <div className="mt-12 rounded-xl border border-gray-800 bg-[#1a1a1a] px-6 py-16 text-center">

//             <p className="text-sm font-bold tracking-[0.2em] text-gray-500">
//               NOTHING HERE YET
//             </p>

//             <p className="mt-4 text-gray-400">
//               {activeTab === "plan"
//                 ? "Browse the library and add a lift to get today moving."
//                 : "Save workouts from the library to find them here later."}
//             </p>

//             <Link
//               href="/"
//               className="mt-6 inline-block rounded-full bg-[#c2f800] px-6 py-3 text-sm font-bold text-black"
//             >
//               Go to workouts
//             </Link>

//           </div>
//         )}

//       </div>
//     </main>
//   );
// }

// export default function MyPlan() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-black" />}>
//       <MyPlanContent />
//     </Suspense>
//   );
// }




"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { usePlan } from "@/components/PlanProvider";

function MyPlanContent() {
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

  const [sortBy, setSortBy] = useState("duration");

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
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

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = currentWorkouts.reduce(
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
          <h1 className="mt-3 font-['Oswald'] text-5xl font-bold uppercase tracking-tight sm:text-6xl">
            My Plan
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Exercises
            </p>

            <p className="mt-2 font-['Oswald'] text-4xl font-bold">
              {currentWorkouts.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Minutes
            </p>

            <p className="mt-2 font-['Oswald'] text-4xl font-bold">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Calories
            </p>

            <p className="mt-2 font-['Oswald'] text-4xl font-bold">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex gap-8 border-b border-gray-800">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`pb-4 text-sm font-bold uppercase tracking-wide transition ${
              activeTab === "plan"
                ? "border-b-2 border-[#c2f800] text-[#c2f800]"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`pb-4 text-sm font-bold uppercase tracking-wide transition ${
              activeTab === "saved"
                ? "border-b-2 border-[#c2f800] text-[#c2f800]"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort */}
        <div className="mt-8 flex justify-end">
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
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
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

                <h2 className="mt-4 font-['Oswald'] text-2xl font-bold">
                  {workout.name}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {workout.equipment}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4 text-sm text-gray-400">
                  <span>⏱ {workout.duration} min</span>
                  <span>🔥 {workout.caloriesBurned} kcal</span>
                  <span>★ {workout.rating}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex-1 rounded-full border border-gray-600 px-4 py-2 text-center text-xs font-bold uppercase tracking-wide transition hover:border-white"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => handleMarkAsDone(workout.id)}
                      className="flex-1 rounded-full bg-[#c2f800] px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#b5ed00]"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemove(workout.id)}
                    className="rounded-full border border-gray-600 px-4 py-2 text-sm transition hover:border-red-500 hover:text-red-500"
                    aria-label={`Remove ${workout.name}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentWorkouts.length === 0 && (
          <div className="mt-8 rounded-xl border border-gray-800 bg-[#1a1a1a] px-6 py-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c2f800]">
              Nothing Here Yet
            </p>

            <p className="mt-4 text-gray-400">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save workouts from the library to find them here later."}
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-full bg-[#c2f800] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#b5ed00]"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function MyPlan() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <MyPlanContent />
    </Suspense>
  );
}