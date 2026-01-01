import Link from 'next/link';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-neutral-500 pb-3 mb-2 border-b border-neutral-800">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-amber-400 transition"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-400">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-2">›</span>
          )}
        </span>
      ))}
    </nav>
  );
}