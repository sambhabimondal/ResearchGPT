type Props = {
  response: string;
};

function ResponseCard({ response }: Props) {
  const hasResponse = Boolean(response);

  return (
    <section className="mx-auto mt-10 w-full max-w-3xl px-6 pb-20">
      <div
        className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
          hasResponse
            ? "border-white/10 bg-white/[0.035]"
            : "border-dashed border-white/[0.08] bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-sm text-violet-300">
              R
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                ResearchGPT
              </p>

              {hasResponse && (
                <p className="text-[11px] text-slate-600">
                  Based on your uploaded document
                </p>
              )}
            </div>
          </div>

          {hasResponse && (
            <span className="text-xs text-slate-600">
              AI generated
            </span>
          )}
        </div>

        <div className="px-6 py-7">
          {hasResponse ? (
            <p className="whitespace-pre-wrap text-[15px] leading-7 text-slate-300">
              {response}
            </p>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-600">
                Your answer will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ResponseCard;