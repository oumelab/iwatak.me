"use client";

import {MoonIcon, SunIcon, LaptopIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";

import {cn} from "@/lib/utils";

export function ModeToggle() {
  const {theme, setTheme} = useTheme();

  return (
    <fieldset className="flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 p-[2px]">
      <legend className="sr-only">Theme</legend>
      <span
        className={cn(
          "size-8 grid place-items-center rounded-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50",
          theme === "light"
            ? "bg-zinc-200 dark:bg-zinc-800"
            : "text-muted-foreground"
        )}
      >
        <input
          aria-label="light"
          type="radio"
          name="theme"
          id="light"
          value="light"
          onChange={(e) => setTheme(e.target.value)}
          checked={theme === "light"}
          className="hidden"
        />
        <label htmlFor="light">
          <SunIcon className="size-4 rotate-0 scale-100 transition-all cursor-pointer" />
          <span className="sr-only">Light</span>
        </label>
      </span>
      <span
        className={cn(
          "size-8 grid place-items-center rounded-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50",
          theme === "dark"
            ? "bg-zinc-200 dark:bg-zinc-800"
            : "text-muted-foreground"
        )}
      >
        <input
          aria-label="dark"
          type="radio"
          name="theme"
          id="dark"
          value="dark"
          onChange={(e) => setTheme(e.target.value)}
          checked={theme === "dark"}
          className="hidden"
        />
        <label htmlFor="dark">
          <MoonIcon className="size-4 transition-all dark:rotate-0 cursor-pointer" />
          <span className="sr-only">Dark</span>
        </label>
      </span>
      <span
        className={cn(
          "size-8 grid place-items-center rounded-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50",
          theme === "system"
            ? "bg-zinc-200 dark:bg-zinc-800"
            : "text-muted-foreground"
        )}
      >
        <input
          aria-label="system"
          type="radio"
          name="theme"
          id="system"
          value="system"
          onChange={(e) => setTheme(e.target.value)}
          checked={theme === "system"}
          className="hidden"
        />
        <label htmlFor="system">
          <LaptopIcon className="size-4 rotate-0 scale-100 transition-all cursor-pointer" />
          <span className="sr-only">System</span>
        </label>
      </span>
    </fieldset>
  );
}
