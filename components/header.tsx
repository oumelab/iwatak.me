import Link from "next/link";
import Navigation from "./navigation";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b">
      <div className="flex items-center gap-6">
      <h1 className="font-bold text-xl"><Link href="/">Oumelab.com</Link></h1>
      <Navigation />
      </div>
    </header>
  )
}