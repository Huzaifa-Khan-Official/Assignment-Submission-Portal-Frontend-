export default function SubmitAssignment() {
    return (
        <div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl mx-auto" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Submit Assignment</h3>
                    <p className="text-sm text-muted-foreground">Fill out the form below to submit your assignment.</p>
                </div>
                <div className="p-6 grid gap-4">
                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="file"
                        >
                            Assignment File
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50"
                            type="file"
                            id="file"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="comments"
                        >
                            Additional Comments
                        </label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="comments"
                            rows="4"
                            placeholder="Add any additional comments here"
                        ></textarea>
                    </div>
                </div>
                <div className="items-center p-6 flex justify-start">
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-teal-600 text-white hover:bg-teal-700"
                        type="submit"
                    >
                        Submit Assignment
                    </button>
                </div>
            </div>
        </div>
    )
}