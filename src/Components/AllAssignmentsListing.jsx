import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import api from '../api/api';
import useFetchProfile from '../utils/useFetchProfile';
import CreateAssignment from './CreateAssignment';
import { NavLink } from "react-router-dom";
import LoaderContext from '../Context/LoaderContext';

export default function AllAssignmentsListing() {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState('');
    const { user } = useFetchProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignmentToEdit, setAssignmentToEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const { setLoader } = useContext(LoaderContext);
    const { classId } = useParams();

    const fetchAssignments = async () => {
        try {
            const response = await api.get(`/api/assignments/class/${classId}`);
            setAssignments(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to fetch assignments. Please try again later.');
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, [classId, user]);

    const handleCreateAssignment = async (formData, id = null) => {
        setLoading(true);
        try {
            let response;
            if (id) {
                response = await api.put(`/api/assignments/${id}`, formData);
                if (assignments.length > 0) {
                    setAssignments(assignments.map(assignment => assignment._id === id ? response.data : assignment));
                }
            } else {
                response = await api.post('/api/assignments/create', { ...formData, classId });
                setAssignments([...assignments, response.data]);
            }
            setError('');
            setIsModalOpen(false);
            setAssignmentToEdit(null);
        } catch (error) {
            console.error('Error creating/updating assignment:', error);
            setError(error.response?.data?.error || 'An error occurred while creating/updating the assignment');
        } finally {
            setLoading(false);
        }
    };


    const handleEditAssignment = (assignment) => {
        setAssignmentToEdit(assignment);
        setIsModalOpen(true);
    };

    const handleDeleteAssignment = async (assignmentId) => {
        setLoader(true);
        setDeletingId(assignmentId);
        try {
            await api.delete(`/api/assignments/${assignmentId}`);
            setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
            setError('');
            setLoader(false);
        } catch (error) {
            console.error('Error deleting assignment:', error);
            setLoader(false);
            setError('Failed to delete assignment. Please try again later.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-muted/40">
            <main className="flex-1">
                <div className="">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <header className="flex items-center justify-between flex-wrap gap-3 px-3 py-3 border-b bg-background">
                            <div className="flex flex-col space-y-1.5">
                                <h1 className="text-xl font-bold">All Assignments</h1>
                                <p className="text-sm text-muted-foreground">View and manage all assignments.</p>
                            </div>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-3 bg-teal-500 hover:bg-teal-600 text-white"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Create Assignment
                            </button>
                        </header>
                        <div className="">
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&amp;_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="py-2 border-r-2 px-4 text-left align-middle font-medium">Name</th>
                                            <th className="py-2 border-r-2 px-4 text-left align-middle font-medium">Due Date</th>
                                            <th className="py-2 border-r-2 px-4 text-left align-middle font-medium">Total Marks</th>
                                            <th className="py-2 border-r-2 px-4 align-middle font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&amp;_tr:last-child]:border-0">
                                        {assignments.length > 0 ? (
                                            assignments.map((assignment) => (
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" key={assignment._id}>
                                                    <td className="p-4 align-middle border-r-2">
                                                        <p className="font-medium w-32">{assignment.title}</p>
                                                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                                                    </td>
                                                    <td className="p-4 align-middle border-r-2">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                                                    <td className="p-4 align-middle border-r-2">{assignment.total_marks}</td>
                                                    <td className="p-4 align-middle border-r-2 text-right flex items-center">
                                                        <Link
                                                            to={`/trainer/class/${classId}/${assignment._id}`}
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 bg-blue-500 hover:bg-blue-600 text-white mr-2"
                                                        >
                                                            View Submissions
                                                        </Link>
                                                        <button
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                                            onClick={() => handleEditAssignment(assignment)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 ml-2 bg-red-600 text-white"
                                                            onClick={() => handleDeleteAssignment(assignment._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="p-4 text-center">No assignments yet</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <CreateAssignment isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} onSubmit={handleCreateAssignment} assignmentToEdit={assignmentToEdit} />
        </div>
    );
}
