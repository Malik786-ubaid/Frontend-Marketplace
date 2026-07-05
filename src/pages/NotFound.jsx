import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          404
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          The page you are looking for might have been moved, deleted, or never existed. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
