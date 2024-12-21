import Link from "next/link";
import Navigation from "./navigation";
import { ModeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b">
      <h1 className="font-bold text-xl"><Link href="/">Oumelab.com</Link></h1>
      <div className="flex items-center gap-6">
      <Navigation />
      <ModeToggle />
      </div>
    </header>
  )
}