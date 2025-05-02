import Link from "next/link";
import {GitHubIcon, XIcon} from "./icons";
import {Button} from "./ui/button";
import { GITHUB_URL, X_URL } from "@/constants";

export default function Footer() {
  return (
    <footer className="sticky top-full py-4 border border-t">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <small className="text-muted-foreground">&copy; oumelab</small>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="group size-9 rounded-full" asChild>
            <Link href={X_URL} target="_blank">
              <XIcon className="size-4 fill-muted-foreground group-hover:fill-foreground" />
              <span className="sr-only">X</span>
            </Link>
          </Button>
          <Button variant="ghost" className="group size-9 rounded-full" asChild>
            <Link href={GITHUB_URL} target="_blank">
              <GitHubIcon className="size-4 fill-muted-foreground group-hover:fill-foreground" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
