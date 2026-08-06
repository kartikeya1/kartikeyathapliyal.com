import Link from "next/link";
import { cn } from "@/lib/cn";

export function SecondaryLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn("text-sm underline text-muted hover:text-text", className)}>
      {children}
    </Link>
  );
}
