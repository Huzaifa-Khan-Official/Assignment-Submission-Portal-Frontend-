
export default function AllAssignmentsListing({type}) {
    return (
        <div>
            <div className="flex flex-col w-full min-h-screen bg-muted/40">
                <header className="flex items-center justify-between h-16 px-6 border-b bg-background">
                    <h1 className="text-xl font-bold">Assignment Management</h1>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-3 bg-teal-500 text-white">
                        Create Assignment
                    </button>
                </header>
                <main className="flex-1 p-6">
                    <div className="grid gap-6">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">All Assignments</h3>
                                <p className="text-sm text-muted-foreground">View and manage all assignments.</p>
                            </div>
                            <div className="p-6">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="[&amp;_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                    Name
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                    Due Date
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                    Status
                                                </th>
                                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&amp;_tr:last-child]:border-0">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div className="font-medium">Design Website</div>
                                                    <div className="text-sm text-muted-foreground">Create a new website design</div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2023-06-30</td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div
                                                        className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-white ${type == "submitted" ? "bg-green-500 " : type == "missing" ? "bg-red-500" : type == 'pending' ? "bg-teal-500" : "bg-transparent text-black"} capitalize`}
                                                        data-v0-t="badge"
                                                    >
                                                        {type}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                                        Edit
                                                    </button>
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 ml-2 bg-red-600 text-white">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div className="font-medium">Design Website</div>
                                                    <div className="text-sm text-muted-foreground">Create a new website design</div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2023-06-30</td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div
                                                        className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-white ${type == "submitted" ? "bg-green-500 " : type == "missing" ? "bg-red-500" : type == 'pending' ? "bg-teal-500" : "bg-transparent text-black"} capitalize`}
                                                        data-v0-t="badge"
                                                    >
                                                        {type}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                                        Edit
                                                    </button>
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 ml-2 bg-red-600 text-white">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div className="font-medium">Design Website</div>
                                                    <div className="text-sm text-muted-foreground">Create a new website design</div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2023-06-30</td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div
                                                        className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-white ${type == "submitted" ? "bg-green-500 " : type == "missing" ? "bg-red-500" : type == 'pending' ? "bg-teal-500" : "bg-transparent text-black"} capitalize`}
                                                        data-v0-t="badge"
                                                    >
                                                        {type}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                                        Edit
                                                    </button>
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 ml-2 bg-red-600 text-white">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div className="font-medium">Design Website</div>
                                                    <div className="text-sm text-muted-foreground">Create a new website design</div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2023-06-30</td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <div
                                                        className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-white ${type == "submitted" ? "bg-green-500 " : type == "missing" ? "bg-red-500" : type == 'pending' ? "bg-teal-500" : "bg-transparent text-black"} capitalize`}
                                                        data-v0-t="badge"
                                                    >
                                                        {type}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                                        Edit
                                                    </button>
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 ml-2 bg-red-600 text-white">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}