/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { useAppContext } from "./AppContext";

import { studentType } from "./homeDataTypes";
import AddFormTabs from "./AddFormTabs";
import BasicForm from "./BasicForm";
import AdvanceForm from "./AdvancedForm";

interface DialogIntreface {
  title: string;
  edit: boolean;
  studentData?: studentType;
}

function Dialog({ edit, title, studentData }: DialogIntreface) {
  const { dispatch, selectedMethod } = useAppContext();
  function closeDialog() {
    dispatch({
      type: "clearSelectedData",
      payload: "",
    });
  }

  return (
    <>
      <div className="w-[25vw] flex flex-col gap-2 border rounded-lg mt-4 ">
        <div className="w-full flex  items-center justify-between  bg-border/40 py-2 px-4 rounded-t-lg font-semibold text-xl">
          <label>{title}</label>
          <div onClick={closeDialog} title="close">
            <X className="w-10 h-10 p-2 hover:bg-border/50 rounded-full cursor-pointer" />
          </div>
        </div>
        <div className="px-2 pb-3">
          {selectedMethod === "ADD" ? (
            <AddFormTabs>
              <BasicForm edit={edit} />
              <AdvanceForm edit={edit} studentData={studentData} />
            </AddFormTabs>
          ) : (
            <div className="gap-2 flex flex-col ">
              <BasicForm edit={true} />
              <AdvanceForm edit={true} studentData={studentData} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Dialog;
