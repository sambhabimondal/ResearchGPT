type Props = {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  onUpload: () => void;
  uploading: boolean;
  uploaded: boolean;
};

function UploadBox({
  selectedFile,
  setSelectedFile,
  onUpload,
  uploading,
  uploaded,
}: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setSelectedFile(e.target.files[0]);
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6">
      <div
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          uploaded
            ? "border-emerald-500/30 bg-emerald-500/[0.03]"
            : "border-white/10 bg-white/[0.03] hover:border-violet-500/30 hover:bg-white/[0.045]"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-blue-500/[0.04]" />

        <div className="relative p-8 sm:p-10">
          {!selectedFile ? (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-2xl shadow-xl">
                ↑
              </div>

              <h2 className="mt-5 text-lg font-medium text-white">
                Upload your research paper
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                PDF files only · Your document stays private
              </p>

              <label className="mt-6 inline-flex cursor-pointer items-center rounded-xl border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10">
                Choose PDF
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  PDF
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {selectedFile.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {!uploaded && (
                <button
                  onClick={onUpload}
                  disabled={uploading}
                  className="mt-5 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0"
                >
                  {uploading ? "Processing..." : "Analyze paper"}
                </button>
              )}

              {uploaded && (
                <div className="mt-5 flex items-center gap-2 text-sm text-emerald-400 sm:mt-0">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
                    ✓
                  </span>
                  Ready to research
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UploadBox;