import AddAndEdit from "./Dialog";
import { useAppContext } from "./AppContext";
import StudentsTable from "./StudentsTable";
import { ADD_STUDENT, EDIT_DATA } from "./constants";

function HomeMain() {
  const { selectedMethod, selectedStudent } = useAppContext();
  return (
    <div className=" flex gap-x-6">
      <div>
        <StudentsTable />
      </div>
      <div >
        {selectedMethod === "ADD" && (
          <div>
            <AddAndEdit edit={false} title={ADD_STUDENT} />
          </div>
        )}

        {selectedMethod === "EDIT" && (
          <div>
            <AddAndEdit
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
