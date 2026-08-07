"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6"
      >
        <Link
          href="/"
          aria-label="Kartikeya Thapliyal - home"
          className="whitespace-nowrap text-sm font-medium tracking-tight text-foreground transition-colors hover:text-muted"
        >
          <span aria-hidden="true" className="sm:hidden">
            KT
          </span>
          <span className="hidden sm:inline">Kartikeya Thapliyal</span>
        </Link>

        <ul className="flex items-center gap-1">
          {navigation
            .filter((item) => item.href !== "/")
            .map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-2.5 py-1.5 text-sm transition-colors duration-200 sm:px-3",
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </header>
  );
}
