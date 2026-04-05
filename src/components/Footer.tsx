import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const STUDIO_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/#team" },
  { label: "Start a Project", href: "/start-project" },
];

const CONNECT_LINKS = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link
              to="/"
              className="font-display text-lg text-white/80 hover:text-white inline-block"
              style={{ transition: "color 200ms ease-out" }}
            >
              Octopus<span className="text-white/25">°</span>
            </Link>
            <p className="text-xs text-white/25 font-light leading-relaxed max-w-[180px]">
              Design + development studio. Building things people love.
            </p>
            <div className="font-mono text-[10px] text-white/15 uppercase tracking-widest">
              Est. 2019
            </div>
          </div>

          {/* Studio links */}
          <div className="space-y-5">
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">Studio</div>
            <ul className="space-y-3">
              {STUDIO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/35 hover:text-white/70"
                    style={{ transition: "color 200ms ease-out" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect links */}
          <div className="space-y-5">
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">Connect</div>
            <ul className="space-y-3">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/35 hover:text-white/70"
                    style={{ transition: "color 200ms ease-out" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0"
                      style={{ transition: "all 200ms ease-out" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">Contact</div>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-white/15 uppercase tracking-widest mb-1 font-mono">Email</div>
                <a
                  href="mailto:hello@octopus.studio"
                  className="text-sm text-white/35 hover:text-white/70"
                  style={{ transition: "color 200ms ease-out" }}
                >
                  hello@octopus.studio
                </a>
              </div>
              <div>
                <div className="text-[10px] text-white/15 uppercase tracking-widest mb-1 font-mono">New business</div>
                <a
                  href="mailto:work@octopus.studio"
                  className="text-sm text-white/35 hover:text-white/70"
                  style={{ transition: "color 200ms ease-out" }}
                >
                  work@octopus.studio
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-white/15 uppercase tracking-widest">
            © {year} Octopus Studio
          </span>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[10px] text-white/15 hover:text-white/35 uppercase tracking-widest"
                style={{ transition: "color 200ms ease-out" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
