export default function ErrorBoundary() {
  return (
    <div>
      <div class="flex fixed top-0 w-screen h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-teal-300">
        <div class="mx-auto max-w-md text-center">
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, something went wrong!</h1>
          <p class="mt-4 text-muted-foreground">
            We're sorry, but an unexpected error has occurred. Please try again later or conta
          </p>
          <div class="mt-6">
            <a
              href="#"
              class="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            ></a>
          </div>
        </div>
      </div>
    </div>
  )
}