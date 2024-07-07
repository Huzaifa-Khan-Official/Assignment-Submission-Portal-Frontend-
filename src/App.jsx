import { useState } from "react";
import AllAssignmentsListing from "./Components/AllAssignmentsListing"
import CreateAssignment from "./Components/CreateAssignment"
import Coursescreatemodel from "./Components/Coursescreatemodel/Coursescreatemodel";
import CoursesModal from "./Components/CoursesModal/CoursesModal";
import StudentInformationModal from "./Components/StudentInformationModal/StudentInformationModal";

function App() {
  return (
    <>
     
      <Coursescreatemodel />
      <CoursesModal />
      <StudentInformationModal />
      {/* <AllAssignmentsListing data={assignments} openModal={openModal} />
      <CreateAssignment isModalOpen={isModalOpen} closeModal={closeModal} />
      */}
    </>
  )
}

export default App
