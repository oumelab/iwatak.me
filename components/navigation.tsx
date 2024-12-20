"use client";

import { usePathname } from "next/navigation"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Button
              className={cn(
                pathname.includes(link.href) && "bg-accent text-accent-foreground"
              )}
              variant="ghost"
              asChild
            >
            <Link href={link.href}>{link.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}