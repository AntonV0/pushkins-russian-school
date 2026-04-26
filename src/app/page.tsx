export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-background px-6 py-16 text-foreground">
      <section className="w-full max-w-3xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          Project setup ready
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Pushkins Russian School website rebuild
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          This app is prepared for the rebrand phase. Add source screenshots,
          page copy, brand notes, and migration decisions in the docs folder
          before building the final site experience.
        </p>
      </section>
    </main>
  );
}
