function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-8 pt-20 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-400 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          Retrieval-augmented research
        </div>

        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Your research,
          <br />
          <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
            understood.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
          Upload a research paper and ask questions in plain English.
          ResearchGPT finds the relevant passages and builds answers from
          your document.
        </p>
      </div>
    </section>
  );
}

export default Hero;