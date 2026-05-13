import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        <li>
          <Link
            href="/"
            className="font-semibold text-brand-blue-strong hover:text-brand-red"
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li
            key={`${item.label}-${item.href ?? "current"}`}
            className="flex items-center gap-2"
          >
            <ChevronRight aria-hidden="true" className="size-3.5 text-slate-300" />
            {item.href ? (
              <Link
                href={item.href}
                className="font-semibold text-brand-blue-strong hover:text-brand-red"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-slate-600">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
