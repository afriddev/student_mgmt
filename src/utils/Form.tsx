import { studentType } from "./homeDataTypes";

import { useForm } from "@tanstack/react-form";
import ErrorLabel from "./ErrorLabel";
import {
  EMAIL_ID,
  FIRST_NAME,
  LAST_NAME,
  MOBILE_NUMBER,
  MODIFY,
  SUBMIT,
  SUBMITING,
} from "./constants";

import { MoveRight } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { useAppContext } from "./AppContext";
import { useAddStudent, useEditStudentDetails, useRefresh } from "./hooks";
interface formIntreface {
  studentData?: studentType;
  edit: boolean;
}

function Form({ studentData, edit }: formIntreface) {
  const { addStudent } = useAddStudent();
  const { editStudentDetails } = useEditStudentDetails();
  const { dispatch, step, selectedStudent } = useAppContext();
  const { refreshData } = useRefresh();

  const form = useForm({
    defaultValues: {
      FN: edit ? studentData?.firstName : selectedStudent?.firstName,
      LN: edit ? studentData?.lastName : selectedStudent?.lastName,
      mobileNumber: edit
        ? studentData?.mobileNumber
        : selectedStudent?.mobileNumber,
      emailId: edit ? studentData?.emailId : selectedStudent?.emailId,
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(vals: any) {
    if (edit) {
      if (confirm("Do you want save below details ?")) {
        editStudentDetails(
          {
            emailId: vals?.value?.emailId,
            mobileNumber: vals?.value?.mobileNumber,
            firstName: vals?.value?.FN,
            lastName: vals?.value?.LN,
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
              }
            },
          }
        );
      }
    } else {
      if (confirm("Do you want add Student ?")) {
        addStudent(
          {
            emailId: vals?.value?.emailId,
            mobileNumber: vals?.value?.mobileNumber,
            firstName: vals?.value?.FN,
            lastName: vals?.value?.LN,
            id: vals?.value?.FN + "123",
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
    } else return undefined;
  }
  function handleMobileNumberChange(value: any) {
    const match = /^\d{10}$/.test(value);
    if (!value) return "Please enter Mobile number";
    else if (value.toString().length !== 10 || !match)
      return "Invalid Mobile number";
    else return undefined;
  }

  function runOnMount() {
    if (!edit) {
      form?.validateField("FN","submit")
      form?.validateField("emailId","submit")
      form?.validateField("mobileNumber","submit")
    }
    return "";
  }
  function moveNext() {
    dispatch({
      type: "setStep",
      payload: 2,
    });

    dispatch({
      type: "setSelectedStudentData",
      payload: {
        firstName: form?.state?.values?.FN,
        lastName: form?.state?.values?.LN,
        emailId: "",
        mobileNumber: "",
      },
    });
  }

  function goBack() {
    dispatch({
      type: "setStep",
      payload: 1,
    });
  }

  return (
    <form
      className="w-fit p-3 flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {(step === 1 || edit) && (
        <div
          className={`flex w-[22vw] flex-col gap-2 ${
            step === 1 || edit ? "block" : "hidden"
          }`}
        >
          <div className="w-full">
            <form.Field
              name={"FN"}
              validators={{
                onChange: ({ value }: { value: any }) => {
                  if (!value) return "Please enter First name";
                  else if (value?.length < 3)
                    return "First name must be at least 3 characters";
                  else return undefined;
                },
                onChangeAsync: async ({ value }) => {
                  return value.includes("error") && "Wrong Name";
                },
                onMount: runOnMount,
              }}
              children={(field: any) => {
                return (
                  <>
                    <Input
                      className="w-full"
                      name={field?.name}
                      id={field?.id}
                      placeholder={FIRST_NAME}
                      value={field?.state?.value}
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
              name={"LN"}
              children={(field: any) => {
                return (
                  <>
                    <Input
                      name={field?.name}
                      id={field?.id}
                      placeholder={LAST_NAME}
                      value={field?.state?.value}
                      onChange={(e) => {
                        field.handleChange(e?.target?.value);
                      }}
                    />
                  </>
                );
              }}
            />
          </div>
          {!edit && (
            <form.Subscribe
              selector={(state) => [state?.canSubmit, state?.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => {
                return (
                  <Button
                    disabled={!canSubmit}
                    onClick={moveNext}
                    type="button"
                  >
                    {!isSubmitting ? (
                      <div className="flex items-center gap-2">
                        {"Next"} <MoveRight className="w-5 h-4" />
                      </div>
                    ) : (
                      SUBMITING
                    )}
                  </Button>
                );
              }}
            </form.Subscribe>
          )}
        </div>
      )}

      {(step === 2 || edit) && (
        <div className={`flex flex-col gap-y-2 w-[22vw]`}>
          <div>
            <form.Field
              name={"mobileNumber"}
              validators={{
                onChange: (value) => {
                  return handleMobileNumberChange(value?.value);
                },
                onMount:runOnMount
              }}
              children={(field: any) => {
                return (
                  <>
                    <Input
                      name={field?.name}
                      id={field?.id}
                      placeholder={MOBILE_NUMBER}
                      value={field?.state?.value}
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
                onMount:runOnMount
              }}
              children={(field: any) => {
                return (
                  <>
                    <Input
                      disabled={edit}
                      name={field?.name}
                      id={field?.id}
                      placeholder={EMAIL_ID}
                      value={field?.state?.value}
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
      )}
    </form>
  );
}
export default Form;
