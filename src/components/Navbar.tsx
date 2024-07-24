"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import AIChatButton from "./AIChatButton";

export default function Navbar() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href} 
        className={`p-2 rounded-full nav-link relative inline-block transition-all duration-300 
          ${isActive 
            ? '-translate-y-0.5 shadow-md bg-background dark:bg-gray-800' 
            : 'hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800'
          } 
          active:scale-95 active:shadow-inner`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 bg-transparent backdrop-blur-sm z-[1000]">
      <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-3 px-3 py-4">
        <nav className="space-x-4 font-medium">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About Me</NavLink>
          <NavLink href="/experience">My Work</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <AIChatButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
