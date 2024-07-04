import { FaRegUserCircle } from "react-icons/fa";

export default function UserProfile() {
  return (
    <div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 bg-muted/20 p-6">
          <div className="flex items-center gap-4">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
              <FaRegUserCircle className="aspect-square h-full w-full"/>
            </span>
            <div className="grid gap-1">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </div>
        <div className="p-6 grid gap-6">
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="name"
            >
              Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="name"
              value="John Doe"
            />
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              type="email"
              value="john@example.com"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10">
                <FaRegUserCircle className="aspect-square h-full w-full"/>
              </span>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Change
              </button>
            </div>
          </div>
        </div>
        <div className="items-center flex justify-end gap-2 p-6">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
            Cancel
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-teal-600 text-white hover:bg-teal-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}