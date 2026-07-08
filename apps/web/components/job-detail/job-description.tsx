import { FacebookIcon, PinterestIcon, TwitterIcon } from "@/components/ui/icons";

export type JobDescriptionProps = {
  descriptionBody: string;
  responsibilities: string[];
};

export function JobDescription({ descriptionBody, responsibilities }: JobDescriptionProps) {
  const paragraphs = descriptionBody.split("\n").filter(Boolean);

  return (
    <div>
      <section className="mb-8">
        <h3 className="mb-4 text-h5 font-semibold text-teal">Job Description</h3>
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-charcoal">
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h4 className="mb-4 text-h6 font-semibold text-teal">Responsibilities</h4>
        <ul className="space-y-2">
          {responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center gap-4">
        <span className="text-sm text-pale-blue">Share this job:</span>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-pale-blue/40 px-4 py-2 text-sm font-medium text-[#1877F2] transition-colors hover:bg-pale-blue/10"
        >
          <FacebookIcon size={16} />
          Facebook
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-pale-blue/40 px-4 py-2 text-sm font-medium text-[#1DA1F2] transition-colors hover:bg-pale-blue/10"
        >
          <TwitterIcon size={16} />
          Twitter
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-pale-blue/40 px-4 py-2 text-sm font-medium text-[#E60023] transition-colors hover:bg-pale-blue/10"
        >
          <PinterestIcon size={16} />
          Pinterest
        </button>
      </div>
    </div>
  );
}
