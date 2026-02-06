import Link from "next/link";

interface IntegrationCardProps {
  name: string;
  label: string;
  description: string;
  icon?: string;
  svgIcon?: string | null;
  iconColor: string;
  iconBg: string;
}

export function IntegrationCard({
  name,
  label,
  description,
  icon,
  svgIcon,
  iconColor,
  iconBg,
}: IntegrationCardProps) {
  return (
    <div className="group relative flex flex-col p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors`}
        >
          {svgIcon ? (
            <div className="w-6 h-6 text-foreground" dangerouslySetInnerHTML={{ __html: svgIcon }} />
          ) : (
            <span className={`material-symbols-outlined ${iconColor} text-xl`}>
              {icon}
            </span>
          )}
        </div>
        <Link
          className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground border border-border px-2 py-1 rounded hover:bg-secondary hover:text-foreground transition-colors flex items-center gap-1"
          href="#"
        >
          View Git{" "}
          <span className="material-symbols-outlined text-[10px]">
            arrow_outward
          </span>
        </Link>
      </div>
      <div>
        <h3 className="text-foreground font-bold text-base group-hover:text-primary transition-colors">
          {label}
        </h3>
        <p className="text-muted-foreground text-xs mt-1 truncate">{description}</p>
      </div>
    </div>
  );
}
