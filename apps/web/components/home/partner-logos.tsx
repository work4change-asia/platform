// Placeholder — swap grey slots for real SVG logos once partner assets are committed.
// Logos are intentionally de-emphasised (low opacity on white) per Figma design.
const LOGO_COUNT = 8;

export function PartnerLogos() {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 overflow-x-auto">
          {Array.from({ length: LOGO_COUNT }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-24 shrink-0 rounded bg-gray-200/70"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
