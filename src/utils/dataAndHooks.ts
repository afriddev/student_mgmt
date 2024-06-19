import { useMutation } from "react-query";
import { useAppContext } from "./AppContext";
import { createStudentType, studentType } from "./homeDataTypes";
import { createStudentAPI, deleteStudentAPI, editStudentDetailsAPI, getStudentsAPI } from "./api";


export function getStudentsData() {
  return getStudentsAPI("api/allStudents")
}

export function useAddStudent() {
  const { mutate: addStudent, data, isLoading, isSuccess } = useMutation({
    mutationFn: (data: createStudentType) => createStudentAPI("api/createStudent", data)
  })
  return { addStudent, isLoading, isSuccess, data }
}



export function useEditStudentDetails() {
  const { mutate: editStudentDetails, data, isLoading, isSuccess } = useMutation({
    mutationFn: (data: studentType) => editStudentDetailsAPI("api/editStudent", data)
  })
  return { editStudentDetails, data, isLoading, isSuccess };
}


export function useDeleteStudent() {
  const { mutate: deleteStudent, data, isLoading, isSuccess } = useMutation({
    mutationFn: ({ emailId }: { emailId: string }) => deleteStudentAPI("api/deleteStudent", emailId)
  })
  return { deleteStudent, isLoading, data, isSuccess };
}



export function useSearchStudent() {
  const { studentsMainData: data, dispatch } = useAppContext();
  function searchStudent(value: string) {
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
      dispatch({
        type: "setSearchedData",
        payload: temp
      })


    }
  }

  return { searchStudent };
}
