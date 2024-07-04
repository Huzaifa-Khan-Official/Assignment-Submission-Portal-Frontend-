export default function Footer() {
  return (
    <div>

      <footer className="bg-muted p-6 md:py-12 w-full bg-neutral-900 text-white">
        <div className="container max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <a href="#">
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
            <nav className="hidden md:flex gap-4">
              <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Home
              </a>
              <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                About
              </a>
              <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Products
              </a>
              <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Contact
              </a>
            </nav>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Acme Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}