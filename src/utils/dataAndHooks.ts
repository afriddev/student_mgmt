import { useAppContext } from "./AppContext";
import { studentType } from "./homeDataTypes";

export let studentsData: studentType[] = [
  {
    fisrtName: "Shaik",
    lastName: "Afrid",
    emailId: "369afrid@gmail.com",
    mobileNumber: 9390558027,
  },
  {
    fisrtName: "Arun",
    lastName: "Medi",
    emailId: "123arun@gmail.com",
    mobileNumber: 9390558027,
  },
  {
    fisrtName: "Praveen",
    lastName: "Tholem",
    emailId: "praveentholem123@gmail.com",
    mobileNumber: 9390558027,
  },
];

function useUpdateStudentsData() {
  const { dispatch } = useAppContext();
  function updateStudentsData(array: studentType[]) {
    dispatch({
      type: "setStudentsData",
      payload: array,
    });
  }
  return { updateStudentsData };
}

export function getStudentsData(): studentType[] {
  return studentsData;
}
export function setStudentsData(data:studentType[]){
    console.log(data)
    studentsData = data
}

export function useAddStudent() {
  const { updateStudentsData } = useUpdateStudentsData();
  function addStudent(student: studentType) {
    studentsData.push(student);
    updateStudentsData(studentsData);
  }
  return {
    addStudent,
  };
}

export function useEditStudentDetails() {
  const { updateStudentsData } = useUpdateStudentsData();
  function editStudentDetails(student: studentType) {
    const temp = studentsData;
    for (let index = 0; index < studentsData?.length; index++) {
      if (student?.emailId === studentsData[index].emailId) {
        temp[index] = student;
      }
    }
    studentsData = temp;
    updateStudentsData(studentsData);
  }
  return { editStudentDetails };
}
export function useDeleteStudent() {
  const { updateStudentsData } = useUpdateStudentsData();
  function deleteStudent(emailId: string) {
    const temp = studentsData.filter((student) => student?.emailId !== emailId);
    studentsData = temp;
    updateStudentsData(studentsData);
  }
  return { deleteStudent };
}
export function useSearchStudent() {
//   const { studentsMainData: data } = useAppContext();
  function searchStudent(value: string,data:studentType[]) {
    if (value && value.toString()?.length > 0) {
      const temp = data?.filter((student) => {
        if (
          student?.emailId.toLowerCase().includes(value.toLowerCase()) ||
          student?.fisrtName.toLowerCase().includes(value.toLowerCase()) ||
          student?.lastName.toLowerCase().includes(value.toLowerCase()) ||
          student?.mobileNumber
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        )
          return student;
      });
      studentsData = temp;
    } else studentsData = data;
  }

  return { searchStudent };
}
