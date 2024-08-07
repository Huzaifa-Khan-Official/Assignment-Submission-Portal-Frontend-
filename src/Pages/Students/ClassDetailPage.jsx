// import React from 'react';

// const ClassDetailPage = () => {
//     const announcements = [
//         // {
//         //     name: 'Shahmeer Hanif',
//         //     date: 'Mar 4',
//         //     content: 'https://drive.google.com/drive/folders/1zTv6xmBOCbkx2JRm8BV-hFXBzdkfPfMU',
//         //     files: []
//         // },
//         // {
//         //     name: 'Shahmeer Hanif',
//         //     date: 'Mar 3',
//         //     content: 'ShahmeerHanif/55/CPP',
//         //     files: [
//         //         { name: 'Binary File', type: 'binary' },
//         //         { name: 'Unknown File', type: 'unknown' },
//         //         // More files...
//         //     ]
//         // }
//         // Add more announcements here...
//     ];

//     const assignments = [
//         { name: 'Assignment 3', date: 'Feb 27' },
//         { name: 'Course Books/Materials', date: 'Feb 27' },
//         { name: 'Assignment 2', date: 'Feb 12' },
//         { name: 'Course Outline', date: 'Feb 6' },
//         { name: 'Assignment 01', date: 'Feb 5' }
//         // Add more assignments here...
//     ];

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <header className="bg-teal-600 text-white p-4 rounded-lg mb-4">
//                 <h1 className="text-2xl">BSCS-351 Programming Fundamentals</h1>
//                 <p className="text-lg">B</p>
//             </header>

//             <section className="mb-8">
//                 <div className="bg-gray-100 p-4 rounded-lg">
//                     <h2 className="text-xl mb-2">Upcoming</h2>
//                     <p>Woohoo, no work due soon!</p>
//                 </div>
//             </section>

//             <section className="mb-8 ms-1">
//                 <h2 className="text-xl mb-4">Stream</h2>
//                 {announcements == 0 ? <div className='bg-white p-4 rounded-lg shadow mb-4'>
//                     <h1>No Announcement Yet!</h1>
//                 </div> : announcements.map((announcement, index) => (
//                     <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
//                         <div className="flex items-center mb-2">
//                             <div className="bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center mr-2">
//                                 <span className="text-lg font-bold">{announcement.name[0]}</span>
//                             </div>
//                             <div>
//                                 <h3 className="text-lg font-bold">{announcement.name}</h3>
//                                 <p className="text-gray-600">{announcement.date}</p>
//                             </div>
//                         </div>
//                         <p className="text-blue-500 mb-2">{announcement.content}</p>
//                         <div className="flex flex-wrap">
//                             {announcement.files.map((file, idx) => (
//                                 <div key={idx} className="bg-gray-200 p-2 rounded-lg m-1">
//                                     {file.name}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </section>

//             <section>
//                 <h2 className="text-xl mb-4 ms-1">Assignments</h2>
//                 {assignments.map((assignment, index) => (
//                     <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
//                         <h3 className="text-lg font-bold">{assignment.name}</h3>
//                         <p className="text-gray-600">{assignment.date}</p>
//                     </div>
//                 ))}
//             </section>
//         </div>
//     );
// };

// export default ClassDetailPage;
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams } from 'react-router';

const ClassDetailPage = () => {
    const [classDetails, setClassDetails] = useState(null);
    const [error, setError] = useState('');
    // const classId = window.location.pathname.split('/').pop(); // Extract classId from URL
    const { classId } = useParams(); // Extract classId from URL

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
            <main className="flex-1 p-6">
                <div className="grid gap-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <header className="flex items-center justify-between h-16 px-6 py-10 border-b bg-background">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="text-xl font-bold">{classDetails?.name || 'Class Details'}</h1>
                                <p className="text-sm text-muted-foreground">{classDetails?.description || 'Class description'}</p>
                            </div>
                        </header>
                        <div className="p-6">
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            <div className="mb-6">
                                {classDetails?.classImage && (
                                    <img src={classDetails.classImage} alt={classDetails.name} className="mb-4" />
                                )}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
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
