import { Button } from "antd";
import CreateAssignment from "./CreateAssignment";
import { useState } from "react";

export default function AllAssignmentsListing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };
    // const data = "in progress";
    const data = [
        {
            key: '1',
            number: 'Assignment 1',
            date: '10-05-24',
            topic: 'Html , Css',
            tags: ['submitted'],
        },
        {
            key: '2',
            number: 'Assignment 2',
            date: '12-05-24',
            topic: 'JavaScript , React JS',
            tags: ['expired'],
        },
        {
            key: '3',
            number: 'Assignment 3',
            date: '14-05-24',
            topic: 'Express JS , MongoDB',
            tags: ['pending'],
        },
        {
            key: '4',
            number: 'Assignment 4',
            date: '16-05-24',
            topic: 'Node JS',
            tags: ['submitted'],
        },
    ];
    return (
        <div>
            <div className="flex flex-col w-full min-h-screen">
                <div className="">
                    <div className="rounded-lg border bg-card shadow-sm" data-v0-t="card">
                        <header className="flex items-center justify-between px-6 py-3 border-b gap-2 flex-wrap">
                            <div className="flex flex-col space-y-1.5">
                                <h1 className="text-xl font-bold">All Assignments</h1>
                                <p className="text-sm">View and manage all assignments.</p>
                            </div>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white"
                                onClick={showModal}
                            >
                                Create Assignment
                            </button>
                        </header>
                        <div className="p-2 overflow-x-auto">
                            <table className="w-full w-max-[200px] caption-bottom text-sm ">
                                <thead>
                                    <tr className="border-b transition-colors">
                                        <th className="h-12 px-4 text-left align-middle font-medium">
                                            Name
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">
                                            Due Date
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium">
                                            Status
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium ">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((assignment) => (
                                        <tr className="border-b transition-colors  " key={assignment.key}>
                                            <td className="p-4 align-middle ">
                                                <div className="font-medium w-max">{assignment.number}</div>
                                                <div className="text-sm  w-max">{assignment.description}</div>
                                            </td>
                                            <td className="p-4 align-middle w-max text-nowrap">{assignment.date}</td>
                                            <td className="p-4 align-middle">
                                                <div
                                                    className={`inline-flex w-max items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-white ${assignment.tags[0] === 'submitted'
                                                        ? 'bg-green-500'
                                                        : assignment.tags[0] === 'expired'
                                                            ? 'bg-red-500'
                                                            : 'bg-yellow-500 text-black'
                                                        } capitalize`}
                                                    data-v0-t="badge"
                                                >
                                                    {assignment.tags[0]}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle  text-right flex">
                                                <Button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                                    Edit
                                                </Button>
                                                <Button type="primary" danger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 ml-2 bg-red-600 text-white">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <CreateAssignment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
}
