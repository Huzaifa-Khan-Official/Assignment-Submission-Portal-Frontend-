import AllAssignmentsListing from "./Components/AllAssignmentsListing"
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"

function App() {
  return (
    <>
      <Sidebar>
        <StudentHomePage />
      </Sidebar>
    </>
  )
}

export default App
