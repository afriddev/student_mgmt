import { studentType } from "./homeDataTypes";
import { useForm } from "@tanstack/react-form";
import ErrorLabel from "./ErrorLabel";
import {
  EMAIL_ID,
  MOBILE_NUMBER,
  MODIFY,
  SUBMIT,
  SUBMITING,
} from "./constants";

import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { useAppContext } from "./AppContext";
import {
  useAddStudent,
  useEditStudentDetails,
  useHandleChange,
  useRefresh,
} from "./hooks";
interface AdvanceFormIntreface {
  studentData?: studentType;
  edit: boolean;
}

function AdvanceForm({ studentData, edit }: AdvanceFormIntreface) {
  const { addStudent } = useAddStudent();
  const { editStudentDetails } = useEditStudentDetails();
  const { dispatch, selectedStudent } = useAppContext();
  const { refreshData } = useRefresh();
  const { handleOnChange } = useHandleChange();

  const form = useForm({
    defaultValues: {
      mobileNumber: edit
        ? studentData?.mobileNumber
        : selectedStudent?.mobileNumber,
      emailId: edit ? studentData?.emailId : selectedStudent?.emailId,
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(vals: any) {
    if (edit) {
      if ((selectedStudent?.firstName as any)?.length >= 3) {
        if (confirm("Do you want save below details ?")) {
          editStudentDetails(
            {
              emailId: vals?.value?.emailId,
              mobileNumber: vals?.value?.mobileNumber,
              firstName: selectedStudent?.firstName as never,
              lastName: selectedStudent?.lastName as never,
            },
            {
              onSuccess(data) {
                if (data === "success") {
                  dispatch({
                    type: "clearSelectedData",
                    payload: "",
                  });
                  refreshData();
                  goBack();
                } else {
                  alert(data);
                }
              },
            }
          );
        }
      } else {
        alert("First name must be at least 3 characters");
      }
    } else {
      if (confirm("Do you want add Student ?")) {
        addStudent(
          {
            emailId: vals?.value?.emailId,
            mobileNumber: vals?.value?.mobileNumber,
            firstName: selectedStudent?.firstName as never,
            lastName: selectedStudent?.lastName as never,
            id: selectedStudent?.firstName + "123",
          },
          {
            onSuccess(data) {
              if (data === "created") {
                dispatch({
                  type: "clearSelectedData",
                  payload: "",
                });
                refreshData();
                goBack();
              } else alert("Please try again");
            },
          }
        );
      }
    }
  }

  function handleEmailIdChange(value: any): any {
    const match = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value?.value);
    if (!match) {
      return "Invalid Email";
    } else {
      handleOnChange("emailId", value?.value);
      return undefined;
    }
  }
  function handleMobileNumberChange(value: any) {
    const match = /^\d{10}$/.test(value);
    if (!value) return "Please enter Mobile number";
    else if (value.toString().length !== 10 || !match)
      return "Invalid Mobile number";
    else {
      handleOnChange("MB", value);

      return undefined;
    }
  }

  function runOnMount() {
    if (!edit) {
      form?.validateField("emailId", "submit");
      form?.validateField("mobileNumber", "submit");
    }
    return "";
  }

  function goBack() {
    dispatch({
      type: "setStep",
      payload: 1,
    });
  }

  return (
    <form
      className="w-fit flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {
        <div className={`flex flex-col gap-y-2 w-[22vw]`}>
          <div>
            <form.Field
              name={"mobileNumber"}
              validators={{
                onChange: (value) => {
                  return handleMobileNumberChange(value?.value);
                },
                onMount: runOnMount,
              }}
              children={(field: any) => {
                return (
                  <>
                    <Input
                      name={field?.name}
                      id={field?.id}
                      placeholder={MOBILE_NUMBER}
                      defaultValue={field?.state?.value}
                      onChange={(e) => {
                        field.handleChange(e?.target?.value);
                      }}
                    />
                    {field?.state?.meta?.touchedErrors?.length > 0 && (
                      <ErrorLabel label={field?.state?.meta?.touchedErrors} />
                    )}
                  </>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name={"emailId"}
              validators={{
                onChange: (value) => {
                  return handleEmailIdChange(value);
                },
                onMount: runOnMount,
              }}
              children={(field: any) => {
                return (
                  <>
                    <Input
                      disabled={edit}
                      name={field?.name}
                      id={field?.id}
                      placeholder={EMAIL_ID}
                      defaultValue={field?.state?.value}
                      onChange={(e) => {
                        field.handleChange(e?.target?.value);
                      }}
                    />
                    {field?.state?.meta?.touchedErrors?.length > 0 && (
                      <ErrorLabel label={field?.state?.meta?.touchedErrors} />
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className="flex gap-3 w-full">
            {!edit && (
              <Button className="w-full" type="button" onClick={goBack}>
                {"Back"}
              </Button>
            )}

            <form.Subscribe
              selector={(state) => [state?.canSubmit, state?.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => {
                return (
                  <Button
                    disabled={!canSubmit}
                    type="submit"
                    className="w-full"
                  >
                    {!isSubmitting ? (!edit ? SUBMIT : MODIFY) : SUBMITING}
                  </Button>
                );
              }}
            </form.Subscribe>
          </div>
        </div>
      }
    </form>
  );
}
export default AdvanceForm;
