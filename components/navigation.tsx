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
  icon?: React.ReactNode;
}

const links = [
  {href: "/about", label: "About"},
  {href: "/blog", label: "Blog"},
  {href: GITHUB_URL, label: "Github", icon: <GitHubIcon />},
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
              <Link href={link.href} className="fill-current">
                {link.icon ? link.icon : link.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
