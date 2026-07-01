// Instant skeleton shown while the menu data loads on navigation — keeps the
// page feeling fast even on a cold DB read. Mirrors the real menu layout.
export default function MenuLoading() {
  return (
    <div className="container-bb py-10">
      {/* Header block */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-10 w-64 max-w-full" />
        <div className="skeleton h-4 w-80 max-w-full" />
      </div>

      {/* Search + filters row */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="skeleton h-12 w-full rounded-2xl" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-masala-100 bg-cream-50"
          >
            <div className="skeleton aspect-[5/4] w-full rounded-none" />
            <div className="flex flex-col gap-3 p-5">
              <div className="skeleton h-5 w-3/4" />
              <div className="flex gap-2">
                <div className="skeleton h-4 w-14" />
                <div className="skeleton h-4 w-12" />
                <div className="skeleton h-4 w-16" />
              </div>
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="mt-1 flex items-center justify-between">
                <div className="skeleton h-6 w-16" />
                <div className="skeleton h-10 w-24 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
