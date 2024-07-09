import { Link } from "react-router-dom";

export default function ErrorBoundary() {
  return (
    <div>
      <div className="flex fixed top-0 w-screen h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-md text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, something went wrong!</h1>
          <p className="mt-4 text-muted-foreground">
            We're sorry, but an unexpected error has occurred. Please try again later or conta
          </p>
          <div className="mt-7">

            <Link to="/" className="group relative  overflow-hidden rounded-lg bg-white text-lg shadow py-3 px-9 border-2">
              <div className="absolute inset-0 w-0 bg-[#b3caff] transition-all duration-[250ms] ease-out group-hover:w-full rounded-lg"></div>
              <span className="relative text-primary-blue group-hover:text-blue-800 font-bold">Go to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}