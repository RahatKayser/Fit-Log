import Image from "next/image";
import WorkoutActions from "@/components/WorkoutActions";


export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  // const response = await fetch(
  //   "https://api.abcz.workers.dev/api/fitlog"
  // );

  // const workouts = await response.json();

  // const workout = workouts.find((item) => item.id === Number(id));


  let workout;

  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    const workouts = await response.json();

    workout = workouts.find((item) => item.id === Number(id));
  } catch (error) {
    console.error("Failed to fetch workout:", error);
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-4xl font-bold">Workout Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">

        {/* Left - Image */}
        <div className="overflow-hidden rounded-xl">
          <Image
            src={workout.image}
            alt={workout.name}
            width={740}
            height={740}
            className="h-full min-h-100 w-full object-cover"
          />
        </div>

        {/* Right - Details */}
        <div>
          <h1 className="font-['Oswald'] text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#c2f800] px-3 py-1 text-xs font-bold uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Key Specs */}
          <div className="mt-8 border-y border-gray-800 py-6">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
              Key Specs
            </h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase text-gray-500">Equipment</p>
                <p className="mt-1 text-sm">{workout.equipment}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">Difficulty</p>
                <p className="mt-1 text-sm">{workout.difficulty}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">Sets</p>
                <p className="mt-1 text-sm">{workout.sets}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">Reps</p>
                <p className="mt-1 text-sm">{workout.reps}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">Duration</p>
                <p className="mt-1 text-sm">{workout.duration} min</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">Calories</p>
                <p className="mt-1 text-sm">{workout.caloriesBurned} kcal</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500">Rating</p>
                <p className="mt-1 text-sm">⭐ {workout.rating}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
              Instructions
            </h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c2f800] text-xs font-bold text-black">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-gray-400">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </main>
  );
}