import { useMutation } from "react-query";
import { useAppContext } from "./AppContext";
import { createStudentAPI, deleteStudentAPI, editStudentDetailsAPI, getStudentsAPI } from "./api";
import { createStudentType, studentType } from "./homeDataTypes";




export function useRefresh() {

  const { dispatch, refresh } = useAppContext()
  function refreshData() {
    dispatch({
      type: "setRefresh",
      payload: !refresh
    })

  }
  return { refreshData }
}


export function useGetStudentsData() {
  const { dispatch } = useAppContext();

  const { data, mutate: getStudentsData, isLoading, isSuccess } = useMutation({
    mutationFn: () => getStudentsAPI("api/allStudents"),
    onSuccess(data) {
      dispatch({
        type: "setStudentsData",
        payload: data,
      });

    },
  })
  return { isLoading, data, getStudentsData, isSuccess }
}


export function useAddStudent() {

  const { mutate: addStudent, data, isLoading, isSuccess } = useMutation({
    mutationFn: (data: createStudentType) => createStudentAPI("api/createStudent", data),

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


export function useHandleChange() {
  const { dispatch } = useAppContext()

  function handleOnChange(filed: "FN" | "LN" | "emailId" | "MB", value: any) {
    dispatch({
      type: "setSelectedStudentData",
      payload: {
        firstName: filed === "FN" ? value : undefined,
        lastName: filed === "LN" ? value : undefined,
        emailId: filed === "emailId" ? value : undefined,
        mobileNumber: filed === "MB" ? parseInt(value) : undefined,
      },
    });
  }


  return { handleOnChange }
}