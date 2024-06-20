import { ReactNode, createContext, useContext, useReducer } from "react";
import { contextType, dispatchDataType } from "./homeDataTypes";

const initState: contextType = {
  dispatch: () => {},
  selectedMethod: "",
  selectedStudent: undefined,
  studentsMainData: undefined,
  searchedData: undefined,
  step: 1,
  refresh: false,
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setSelectedMethod":
      return {
        ...state,
        selectedMethod: action?.payload?.method,
        selectedStudent: action?.payload?.data,
      };
    case "clearSelectedData":
      return {
        ...state,
        selectedMethod: "",
        studentsMainData: undefined,
        selectedStudent: undefined,
      };
    case "setStudentsData":
      return {
        ...state,
        studentsMainData: action.payload ?? state?.selectedStudent,
      };

    case "setSearchedData":
      return {
        ...state,
        searchedData: action.payload,
      };

    case "clearSearchedData":
      return {
        ...state,
        searchedData: undefined,
      };

    case "setStep":
      return {
        ...state,
        step: action?.payload,
      };

    case "setRefresh":
      return {
        ...state,
        refresh: action?.payload,
      };

    case "setSelectedStudentData":
      return {
        ...state,
        selectedStudent: {
          firstName:
            action?.payload?.firstName ?? state?.selectedStudent?.firstName,
          lastName:
            action?.payload?.lastName ?? state?.selectedStudent?.lastName,
          emailId: action?.payload?.emailId ?? state?.selectedStudent?.emailId,
          mobileNumber:
            action?.payload?.mobileNumber ??
            state?.selectedStudent?.mobileNumber,
        },
      };

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [
    {
      selectedMethod,
      selectedStudent,
      step,
      refresh,
      searchedData,
      studentsMainData,
    },
    dispatch,
  ] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        refresh,
        dispatch,
        selectedMethod,
        selectedStudent,
        studentsMainData,
        searchedData,
        step,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error("Unable to use!");
  return context;
}
