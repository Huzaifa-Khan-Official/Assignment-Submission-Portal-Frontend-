import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams } from 'react-router';

const ClassDetailPage = () => {
    const [classDetails, setClassDetails] = useState(null);
    const [error, setError] = useState('');
    const { classId } = useParams();

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await api.get(`/api/classes/student/class/${classId}`);
                setClassDetails(response.data);
                setError('');
            } catch (error) {
                console.error('Error fetching class details:', error);
                setError('Failed to fetch class details. Please try again later.');
            }
        };

        fetchClassDetails();
    }, [classId]);

    return (
        <div className="flex flex-col w-full min-h-screen bg-muted/40">
            <main className="flex-1 p-1">
                <div className="grid gap-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <header className="flex items-center justify-between px-2 border-b bg-background">
                            <div className="flex flex-col space-y-1.5 p-3">
                                <h1 className="text-xl font-bold">{classDetails?.name || 'Class Details'}</h1>
                                <p className="text-sm text-muted-foreground">{classDetails?.description || 'Class description'}</p>
                            </div>
                        </header>
                        <div className="p-2">
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            <div className="mb-6">
                                {classDetails?.classImage && (
                                    <img src={classDetails.classImage} alt={classDetails.name} className="mb-4 max-w-xl w-full" />
                                )}
                                <div className="grid grid-cols-1 gap-4 border-t-2 pt-2 ps-2">
                                    <div className='break-words'>
                                        <h2 className="text-lg font-semibold">Teacher</h2>
                                        <p>{classDetails?.teacher?.username}</p>
                                        <p>{classDetails?.teacher?.email}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Join Code</h2>
                                        <p>{classDetails?.join_code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClassDetailPage;
