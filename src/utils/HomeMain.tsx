import StudentsTable from "./StudentsTable";
import AddAndEditForm from "./AddAndEditForm";
import { ADD_STUDENT, EDIT_DATA } from "./constants";
import { useAppContext } from "./AppContext";

function HomeMain() {
  const { selectedMethod, selectedStudent } =
    useAppContext();
  return (
    <div className="p-4 flex gap-x-6">
      <div>
        <StudentsTable />
      </div>
      {selectedMethod !== "" && (
        <div>
          <AddAndEditForm
            edit={selectedMethod === "EDIT"}
            title={selectedMethod === "EDIT" ? EDIT_DATA : ADD_STUDENT}
            studentData={selectedStudent}
          />
        </div>
      )}
    </div>
  );
}
export default HomeMain;
