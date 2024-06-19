import { ReactNode, createContext, useContext, useReducer } from "react";
import { contextType, dispatchDataType } from "./homeDataTypes";

const initState: contextType = {
  dispatch: () => {},
  selectedMethod: "",
  selectedStudent: undefined,
  studentsMainData: undefined,
  searchedData: undefined,
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
      };
    case "setStudentsData":
      return {
        ...state,
        studentsMainData: action.payload,
      };
      
    case "setSearchedData":
      return {
        ...state,
        searchedData: action.payload,
      };
      
    case "clearSearchedData":
      return {
        ...state,
        searchedData:undefined,
      };


    default:
      throw new Error("Action unkonwn");
  }
}

export default function AppContext({ children }: { children: ReactNode }) {
  const [{ selectedMethod, selectedStudent, searchedData,studentsMainData }, dispatch] =
    useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        selectedMethod,
        selectedStudent,
        studentsMainData,
        searchedData
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
