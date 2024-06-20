import { ReactNode } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../@/components/ui/tabs";
import { useAppContext } from "./AppContext";

interface AddFormTabsInterface {
  children: ReactNode;
}

function AddFormTabs({ children }: AddFormTabsInterface) {
  const { step, dispatch, selectedStudent } = useAppContext();

  function incStep() {
    dispatch({
      type: "setStep",
      payload: 2,
    });
  }

  function decStep() {
    dispatch({
      type: "setStep",
      payload: 1,
    });
  }

  function checkStep1Data(): boolean {
    if (step === 1 && selectedStudent?.firstName && selectedStudent?.lastName)
      return false;
    if (step === 2) return false;
    else return true;
  }


  return (
    <div className="px-2">
      <Tabs className="w-full" value={step === 1 ? "step1" : "step2"}>
        <TabsList className="w-full flex ">
          <TabsTrigger value="step1" className="w-full" onClick={decStep}>
            {"Step1"}
          </TabsTrigger>
          <TabsTrigger
            value="step2"
            className={`w-full`}
            disabled={checkStep1Data()}
            onClick={incStep}
          >
            {"Step2"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="step1" className="w-full">
          {(children as never)[0]}
        </TabsContent>
        <TabsContent value="step2" className="w-full">
          {(children as never)[1]}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AddFormTabs;
