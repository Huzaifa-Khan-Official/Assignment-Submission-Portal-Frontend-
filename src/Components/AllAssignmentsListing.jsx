import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../api/api';
import useFetchProfile from '../utils/useFetchProfile';
import CreateAssignment from './CreateAssignment';
import { NavLink } from "react-router-dom";

export default function AllAssignmentsListing() {
    const location = useLocation();
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState('');
    const { user } = useFetchProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignmentToEdit, setAssignmentToEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const classId = location.pathname.slice(9);

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
        if (id) {
            try {
                const response = await api.put(`/api/assignments/${id}`, formData);
                setAssignments(assignments.map(assignment => assignment._id === id ? response.data : assignment));
                setError('');
            } catch (error) {
                console.error('Error updating assignment:', error);
                setError('Failed to update assignment. Please try again later.');
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const response = await api.post('/api/assignments/create', { ...formData, classId });
                setAssignments([...assignments, response.data]);
                setError('');
            } catch (error) {
                console.error('Error creating assignment:', error);
                if (error.response && error.response.data && error.response.data.error) {
                    throw new Error(error.response.data.error);
                } else {
                    throw new Error('An error occurred while creating the assignment');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditAssignment = async (assignment) => {
        setAssignmentToEdit(assignment);
        setIsModalOpen(true);
    };

    const handleDeleteAssignment = async (assignmentId) => {
        setDeletingId(assignmentId);
        try {
            await api.delete(`/api/assignments/${assignmentId}`);
            setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
            setError('');
        } catch (error) {
            console.error('Error deleting assignment:', error);
            setError('Failed to delete assignment. Please try again later.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-muted/40">
            <main className="flex-1 p-6">
                <div className="grid gap-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <header className="flex items-center justify-between h-16 px-6 py-10 border-b bg-background">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="text-xl font-bold">All Assignments</h1>
                                <p className="text-sm text-muted-foreground">View and manage all assignments.</p>
                            </div>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-3 bg-teal-500 hover:bg-teal-600 text-white"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setAssignmentToEdit(null);
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Create Assignment'}
                            </button>
                        </header>
                        <div className="p-6">
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&amp;_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Name</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Due Date</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Total Marks</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">File Link</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&amp;_tr:last-child]:border-0">
                                        {assignments.length > 0 ? (
                                            assignments.map((assignment) => (
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" key={assignment._id}>
                                                    <NavLink to={`/trainer/${classId}/${assignment._id}`}>
                                                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                            <div className="font-medium">{assignment.title}</div>
                                                            <div className="text-sm text-muted-foreground">{assignment.description}</div>
                                                        </td>
                                                    </NavLink>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{assignment.total_marks}</td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        {assignment.fileLink ? (
                                                            <a href={assignment.fileLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                View File
                                                            </a>
                                                        ) : (
                                                            <span>No File</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
                                                        <Link
                                                            to={`/trainer/${classId}/${assignment._id}`}
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 bg-blue-500 hover:bg-blue-600 text-white mr-2"
                                                        >
                                                            View Submissions
                                                        </Link>
                                                        <button
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                                            onClick={() => handleEditAssignment(assignment)}
                                                            disabled={loading}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 ml-2 bg-red-600 text-white"
                                                            onClick={() => handleDeleteAssignment(assignment._id)}
                                                            disabled={deletingId === assignment._id}
                                                        >
                                                            {deletingId === assignment._id ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="p-4 text-center">No assignments yet</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <CreateAssignment
                isModalOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                onSubmit={handleCreateAssignment}
                assignmentToEdit={assignmentToEdit}
                loading={loading}
            />
        </div>
    );
}
