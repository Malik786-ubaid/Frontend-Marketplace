import { Link } from "react-router-dom";

export default function Support() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">?</div>
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="mt-3 text-sm text-gray-300">Need help? We're here to assist. Choose an option below and we'll get back to you shortly.</p>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-3">
          <a
            href="mailto:malikubaidawan14@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Email Support
          </a>

          <a
            href="https://github.com/Malik786-ubaid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-800"
          >
            View GitHub
          </a>

          <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-800">
            Go Home
          </Link>
        </div>

        <div className="mt-6 text-left text-sm text-gray-400">
          <h3 className="font-semibold text-gray-200">FAQ</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>How do I report a bug?</strong> — Send an email with steps to reproduce and screenshots.
            </li>
            <li>
              <strong>How do I request a feature?</strong> — Open an issue on the GitHub repository linked above.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
