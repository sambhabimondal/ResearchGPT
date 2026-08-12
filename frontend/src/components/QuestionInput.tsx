type Props = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  askAI: () => void;
  disabled: boolean;
};

function QuestionInput({
  question,
  setQuestion,
  askAI,
  disabled,
}: Props) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !disabled && question.trim()) {
      askAI();
    }
  }

  return (
    <section className="mx-auto mt-8 w-full max-w-3xl px-6">
      <div
        className={`group flex items-center rounded-2xl border bg-white/[0.03] p-2 transition-all duration-300 ${
          disabled
            ? "border-white/10 opacity-60"
            : "border-white/10 focus-within:border-violet-500/40 focus-within:bg-white/[0.045] focus-within:shadow-2xl focus-within:shadow-violet-950/20"
        }`}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-slate-500">
          ?
        </div>

        <input
          type="text"
          value={question}
          placeholder={
            disabled
              ? "Upload a paper to start asking questions"
              : "Ask anything about your research..."
          }
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed"
        />

        <button
          onClick={askAI}
          disabled={disabled || !question.trim()}
          className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:from-violet-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Ask
          <span>↗</span>
        </button>
      </div>

      {!disabled && (
        <p className="mt-3 text-center text-xs text-slate-600">
          Press Enter to ask
        </p>
      )}
    </section>
  );
}

export default QuestionInput;