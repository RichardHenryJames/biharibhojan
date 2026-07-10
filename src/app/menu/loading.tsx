// Instant skeleton shown while the menu data loads on navigation — keeps the
// page feeling fast even on a cold DB read. Mirrors the real menu layout.
export default function MenuLoading() {
  return (
    <div className="menu-loading">
      <div className="menu-loading__hero">
        <div>
          <div className="skeleton h-3 w-24" />
          <div className="skeleton mt-5 h-20 w-72 max-w-full" />
          <div className="skeleton mt-6 h-3 w-80 max-w-full" />
        </div>
        <div className="skeleton h-full min-h-72 w-full" />
      </div>

      <div className="menu-loading__tools container-bb">
        <div className="skeleton h-10 flex-1" />
        <div className="flex gap-5 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-7 w-20 shrink-0" />
          ))}
        </div>
      </div>

      <div className="menu-loading__body container-bb">
        <div>
          <div className="skeleton h-1 w-full" />
          <div className="skeleton mt-8 h-16 w-48 max-w-full" />
          <div className="skeleton mt-5 h-3 w-56 max-w-full" />
        </div>
        <div className="menu-loading__entries">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="menu-loading__entry">
              <div className="skeleton aspect-square w-28" />
              <div className="flex-1">
                <div className="skeleton h-5 w-2/3" />
                <div className="skeleton mt-4 h-3 w-full" />
                <div className="skeleton mt-2 h-3 w-4/5" />
                <div className="skeleton mt-5 h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
