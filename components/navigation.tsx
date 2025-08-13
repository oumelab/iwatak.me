"use client";

import { GITHUB_URL } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "./icons";
import { Button } from "./ui/button";

interface Link {
  href: string;
  label: string;
}

const links = [
  {href: "/about", label: "About"},
  {href: "/blog", label: "Blog"},
  {href: GITHUB_URL, label: "Github"},
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Button
              className={cn(
                pathname.includes(link.href) &&
                  "bg-accent text-accent-foreground"
              )}
              variant="ghost"
              asChild
            >
              {link.href.includes("github") ? (
                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="size-4 fill-current" />
                </Link>
              ) : (
                <Link href={link.href}>
                  {link.label}
                </Link>
              )}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
