import StudentsTable from "./StudentsTable";
import AddAndEditForm from "./AddAndEditForm";
import { ADD_STUDENT, EDIT_DATA } from "./constants";
import { useAppContext } from "./AppContext";

function HomeMain() {
  const { selectedMethod, selectedStudent } = useAppContext();
  return (
    <div className=" flex gap-x-6">
      <div>
        <StudentsTable />
      </div>
      <div>
        {selectedMethod === "ADD" && (
          <div>
            <AddAndEditForm edit={false} title={ADD_STUDENT} />
          </div>
        )}

        {selectedMethod === "EDIT" && (
          <div>
            <AddAndEditForm
              edit={true}
              title={EDIT_DATA}
              studentData={selectedStudent}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default HomeMain;
