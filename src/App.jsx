import { useState } from "react";
import AllAssignmentsListing from "./Components/AllAssignmentsListing"
import CreateAssignment from "./Components/CreateAssignment"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Sample data
  const assignments = [
    { id: 1, title: 'Assignment 1', description: 'Description 1', due_date: '2024-07-10', status: 'in progress' },
    { id: 2, title: 'Assignment 2', description: 'Description 2', due_date: '2024-07-15', status: 'expired' },
    // Add more assignments as needed
  ];
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello World!
      </h1>
      <AllAssignmentsListing data={assignments} openModal={openModal} />
      <CreateAssignment isModalOpen={isModalOpen} closeModal={closeModal} />

    </>
  )
}

export default App
