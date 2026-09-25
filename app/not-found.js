import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c2f800]">
          404
        </p>

        <h1 className="mt-4 font-['Oswald'] text-5xl font-bold sm:text-6xl">
          Workout Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#c2f800] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#b5ed00]"
        >
          Go to workouts
        </Link>
      </div>
    </main>
  );
}