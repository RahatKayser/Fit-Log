import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="bg-black">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <Hero />
      </div>

      <WorkoutLibrary />
    </main>
  );
}