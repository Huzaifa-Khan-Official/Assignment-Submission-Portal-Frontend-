export default function Header() {
  return (
    <div>

      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-emerald-500 text-white">
        <a className="mr-6 flex items-center" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
          </svg>
          <span className="sr-only">Acme Inc</span>
        </a>
        <nav className="ml-auto hidden items-center gap-4 lg:flex">
          <a className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
            Home
          </a>
          <a className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
            Features
          </a>
          <a className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
            Pricing
          </a>
          <a className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
            About
          </a>
          <a className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
            Contact
          </a>
        </nav>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto lg:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r10:"
          data-state="closed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </header>

    </div>
  )
}