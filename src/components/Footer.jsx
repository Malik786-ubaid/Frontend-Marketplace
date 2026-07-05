import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Create Gig", to: "/create-gig" },
  { label: "My Orders", to: "/my-orders" },
];

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l9 5-9 5-9-5 9-5z" />
                </svg>
              </span>
              <span>Freelancers</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              Connect top clients with trusted talent, manage projects smoothly, and grow your freelance business with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-emerald-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">Stay Connected</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: "Email", icon: "✉️", href: "mailto:malikubaidawan14@gmail.com", external: true },
                { label: "Support", icon: "💬", href: "/support", external: false },
                { label: "GitHub", icon: "🐱", href: "https://github.com/Malik786-ubaid", external: true },
              ].map((item) => {
                if (item.external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Freelancers. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="transition-colors hover:text-emerald-400">
              Home
            </Link>
            <Link to="/register" className="transition-colors hover:text-emerald-400">
              Register
            </Link>
            <Link to="/login" className="transition-colors hover:text-emerald-400">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
