"use client";

import { usePlan } from "@/components/PlanProvider";
import { toast } from "react-toastify";

export default function WorkoutActions({ workout }) {
  const { addToPlan, saveWorkout } = usePlan();

  const handleAddToPlan = () => {
    const result = addToPlan(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.warning(result.message);
    }
  };

  const handleSaveWorkout = () => {
    const result = saveWorkout(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.warning(result.message);
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAddToPlan}
        className="flex-1 rounded-full bg-[#c2f800] px-6 py-3 text-sm font-bold tracking-wide text-black"
      >
        Add to today&apos;s plan
      </button>

      <button
        onClick={handleSaveWorkout}
        className="flex-1 rounded-full border border-gray-600 px-6 py-3 text-sm font-bold tracking-wide text-white"
      >
        Save for later
      </button>
    </div>
  );
}