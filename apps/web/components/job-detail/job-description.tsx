export type JobDescriptionProps = {
  descriptionBody: string;
  responsibilities: string[];
};

export function JobDescription({ descriptionBody, responsibilities }: JobDescriptionProps) {
  const paragraphs = descriptionBody.split("\n").filter(Boolean);

  return (
    <div>
      <section className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-text">Job Description</h3>
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-pale-blue">
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h4 className="mb-4 text-base font-semibold text-gray-text">Responsibilities</h4>
        <ul className="space-y-2">
          {responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-pale-blue">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center gap-4">
        <span className="text-sm text-pale-blue">Share this:</span>
        <span
          aria-hidden="true"
          className="cursor-default text-sm font-medium text-[#1877F2]"
        >
          Facebook
        </span>
        <span
          aria-hidden="true"
          className="cursor-default text-sm font-medium text-[#1DA1F2]"
        >
          Twitter
        </span>
        <span
          aria-hidden="true"
          className="cursor-default text-sm font-medium text-[#E60023]"
        >
          Pinterest
        </span>
      </div>
    </div>
  );
}
