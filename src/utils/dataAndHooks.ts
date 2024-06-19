import { useAppContext } from "./AppContext";
import { studentType } from "./homeDataTypes";

export let studentsData: studentType[] = [
  {
    "firstName": "Shaik",
    "lastName": "Afrid",
    "emailId": "369afrid@gmail.com",
    "mobileNumber": 9390558027
  },
  {
    "firstName": "John",
    "lastName": "Doe",
    "emailId": "johndoe@example.com",
    "mobileNumber": 9876543210
  },
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "emailId": "janesmith@example.com",
    "mobileNumber": 8765432109
  },
  {
    "firstName": "Michael",
    "lastName": "Johnson",
    "emailId": "michaeljohnson@example.com",
    "mobileNumber": 7654321098
  },
  {
    "firstName": "Emily",
    "lastName": "Davis",
    "emailId": "emilydavis@example.com",
    "mobileNumber": 6543210987
  },
  {
    "firstName": "Robert",
    "lastName": "Miller",
    "emailId": "robertmiller@example.com",
    "mobileNumber": 5432109876
  },
  {
    "firstName": "Jessica",
    "lastName": "Wilson",
    "emailId": "jessicawilson@example.com",
    "mobileNumber": 4321098765
  },
  {
    "firstName": "David",
    "lastName": "Moore",
    "emailId": "davidmoore@example.com",
    "mobileNumber": 3210987654
  },
  {
    "firstName": "Sarah",
    "lastName": "Taylor",
    "emailId": "sarahtaylor@example.com",
    "mobileNumber": 2109876543
  },
  {
    "firstName": "James",
    "lastName": "Anderson",
    "emailId": "jamesanderson@example.com",
    "mobileNumber": 1098765432
  }
]


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
          student?.firstName.toLowerCase().includes(value.toLowerCase()) ||
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
