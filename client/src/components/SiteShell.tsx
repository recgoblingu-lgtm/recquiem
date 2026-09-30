import { useId, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { hasCommunityApi } from "@/data/api";
import { siteAssets } from "@/lib/assets";

const navigation = [
  { label: "Home", path: "/", icon: siteAssets.navigation.home, apiOnly: false },
  { label: "Rooms", path: "/rooms", icon: siteAssets.navigation.rooms, apiOnly: false },
  { label: "People", path: "/people", icon: siteAssets.navigation.people, apiOnly: false },
  { label: "Leaderboard", path: "/leaderboard", icon: siteAssets.navigation.people, apiOnly: true },
  { label: "Events", path: "/events", icon: siteAssets.navigation.events, apiOnly: true },
];

function SearchForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const inputId = useId();
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
    onSubmitted?.();
  };
  return (
    <form className="global-search" onSubmit={submit} role="search">
      <Search size={16} aria-hidden="true" />
      <label className="sr-only" htmlFor={inputId}>Search rooms and people</label>
      <input id={inputId} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rooms and people" />
      <button aria-label="Submit search" type="submit"><ArrowRight size={15} /></button>
    </form>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const isActive = (path: string) => path === "/" ? location === "/" : location.startsWith(path);

  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-link" aria-label="RecQuiem home" onClick={closeMenu}>
            <img className="brand-logo" src={siteAssets.logo} alt="RecQuiem" />
          </Link>
          <SearchForm />
          <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            {navigation.filter((item) => !item.apiOnly || hasCommunityApi).map((item) => (
              <Link key={item.path} href={item.path} className={`nav-link${isActive(item.path) ? " is-active" : ""}`} onClick={closeMenu}>
                <img src={item.icon} alt="" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            ))}
            <Link href="/login" className="nav-login" onClick={closeMenu}>Log in</Link>
          </nav>
          <button className="mobile-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="mobile-search"><SearchForm onSubmitted={closeMenu} /></div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-links" aria-label="More community links">
            <Link href="/download">Platforms</Link>
            <Link href="/privacy"><img className="footer-icon" src={siteAssets.navigation.settings} alt="" />Privacy</Link>
            <Link href="/credits"><img className="footer-icon" src={siteAssets.navigation.credits} alt="" />Credits</Link>
            <a href="https://recquiem.net/Home" target="_blank" rel="noreferrer">Original site <ArrowRight size={13} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
