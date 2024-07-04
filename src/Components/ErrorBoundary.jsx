import { Link } from "react-router-dom";

export default function ErrorBoundary() {
  return (
    <div>
      <div className="flex fixed top-0 w-screen h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-teal-300">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, something went wrong!</h1>
          <p className="mt-4 text-muted-foreground">
            We're sorry, but an unexpected error has occurred. Please try again later or conta
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-teal-600 text-white hover:bg-teal-700"
            >Go to Homepage</a>
          </div>
        </div>
      </div>
    </div>
  )
}