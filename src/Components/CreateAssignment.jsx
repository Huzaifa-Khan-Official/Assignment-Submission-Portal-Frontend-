import React, { useState } from 'react';

export default function CreateAssignment({ isModalOpen, closeModal }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic
    };

    return (
        <div>
            {isModalOpen && (
                <div
                    id="modal-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <div
                        className="rounded-lg border bg-card text-card-foreground shadow-sm md:w-2/4 md:mx-auto bg-white"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                                Create New Assignment
                            </h3>
                            <p className="text-sm text-muted-foreground">Fill out the form to create a new assignment.</p>
                        </div>
                        <div className="p-6">
                            <form className="grid gap-4" onSubmit={handleSubmit}>
                                <div className="grid gap-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="name"
                                        placeholder="Enter assignment name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="description"
                                        placeholder="Enter assignment description"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="grid gap-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="dueDate"
                                    >
                                        Due Date
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="date"
                                        id="dueDate"
                                        placeholder="Select due date"
                                    />
                                </div>
                                <div className="gap-2 hidden">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="status"
                                    >
                                        Status
                                    </label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="status"
                                        defaultValue="pending"
                                    >
                                        <option value="submitted">Submitted</option>
                                        <option value="missing">Missing</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-3 bg-teal-500 hover:bg-teal-600 text-white"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 rounded-md px-3 bg-red-500 text-white"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
