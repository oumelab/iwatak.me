import Link from "next/link";
import Navigation from "./navigation";
import {ModeToggle} from "./theme-toggle";

export default function Header() {
  return (
    <header className="h-16 border-b grid place-items-center">
      <div className="max-w-[800px] w-full flex items-center justify-between px-5">
        <h1 className="font-bold text-xl">
          <Link href="/">oumelab.com</Link>
        </h1>
        <div className="flex items-center gap-6">
          <Navigation />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
