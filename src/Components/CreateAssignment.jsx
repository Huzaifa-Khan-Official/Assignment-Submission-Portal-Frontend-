import React, { useState, useEffect, useContext } from 'react';
import LoaderContext from '../Context/LoaderContext';
import { Modal } from 'antd';

export default function CreateAssignment({ isModalOpen, closeModal, onSubmit, assignmentToEdit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        totalMarks: '',
        dueDate: '',
        fileLink: '',
    });
    const [error, setError] = useState('');
    const { setLoader } = useContext(LoaderContext);

    useEffect(() => {
        if (assignmentToEdit) {
            setFormData({
                title: assignmentToEdit.title,
                description: assignmentToEdit.description,
                totalMarks: assignmentToEdit.total_marks,
                dueDate: assignmentToEdit.dueDate?.split('T')[0],
                fileLink: assignmentToEdit.fileLink || '',
            });
        } else {
            setFormData({
                title: '',
                description: '',
                totalMarks: '',
                dueDate: '',
                fileLink: '',
            });
        }
    }, [assignmentToEdit]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: id === 'totalMarks' ? Number(value) : value
        }));
    };

    const validateForm = () => {
        if (!formData.title || !formData.description || !formData.dueDate || !formData.totalMarks) {
            setError('Please enter all required fields');
            return false;
        }
        if (typeof formData.totalMarks !== 'number' || formData.totalMarks <= 0) {
            setError('Total marks must be a positive number');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoader(true);
            try {
                await onSubmit(formData, assignmentToEdit?._id);
                closeModal();
                setFormData({
                    title: '',
                    description: '',
                    totalMarks: '',
                    dueDate: '',
                    fileLink: '',
                });
                setLoader(false);

            } catch (error) {
                setLoader(false);
                setError(error.message || 'An error occurred while creating/updating the assignment');
            }
        }
    };

    return (
        <Modal
            title={<h3 className="text-2xl font-semibold">
                {assignmentToEdit ? 'Edit Assignment' : 'Create New Assignment'}
            </h3>}
            open={isModalOpen}
            onCancel={closeModal}
            onOk={handleSubmit}
            footer={[
                <div className='flex flex-col gap-3' key={0}>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-3 bg-teal-500 hover:bg-teal-600 text-white"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {assignmentToEdit ? 'Update' : 'Submit'}
                    </button>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 rounded-md px-3 bg-red-500 text-white"
                        type="button"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            ]}
        >
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white my-3">
                <div className="flex flex-col space-y-1.5 p-2">
                    <p className="text-sm text-muted-foreground">
                        {assignmentToEdit ? 'Update the form to edit the assignment.' : 'Fill out the form to create a new assignment.'}
                    </p>
                </div>
                <div className="p-3 pt-0">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form className="" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 mt-3">
                            <label className="text-sm font-medium leading-none" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label className="text-sm font-medium leading-none" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label className="text-sm font-medium leading-none" htmlFor="totalMarks">
                                Total Marks
                            </label>
                            <input
                                type="number"
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                id="totalMarks"
                                value={formData.totalMarks}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label className="text-sm font-medium leading-none" htmlFor="dueDate">
                                Due Date
                            </label>
                            <input
                                type="date"
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                id="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label className="text-sm font-medium leading-none" htmlFor="fileLink">
                                File Link (Optional)
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                id="fileLink"
                                value={formData.fileLink}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}