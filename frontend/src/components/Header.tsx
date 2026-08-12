function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
            <span className="text-lg">R</span>
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              ResearchGPT
            </h1>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              AI Research Assistant
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
          <span className="text-sm text-slate-400">AI ready</span>
        </div>
      </div>
    </header>
  );
}

export default Header;