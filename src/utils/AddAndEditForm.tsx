/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "@tanstack/react-form";
import { X } from "lucide-react";
import { useQueryClient } from "react-query";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { useAppContext } from "./AppContext";
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
import { useAddStudent, useEditStudentDetails } from "./dataAndHooks";
import { studentType } from "./homeDataTypes";

interface AddAndEditFormIntreface {
  title: string;
  edit: boolean;
  studentData?: studentType;
}

function AddAndEditForm({ edit, title, studentData }: AddAndEditFormIntreface) {
  const queryClient = useQueryClient();
  const { addStudent } = useAddStudent();
  const { editStudentDetails } = useEditStudentDetails();
  const form = useForm({
    defaultValues: {
      FN: studentData?.firstName,
      LN: studentData?.lastName,
      mobileNumber: studentData?.mobileNumber,
      emailId: studentData?.emailId,
    },
    onSubmit: handleSubmit,
  });
  const { dispatch } = useAppContext();

  function handleSubmit(vals: any) {
    if (edit) {
      if (confirm("Do you want save below details ?")) {
        editStudentDetails({
          emailId: vals?.value?.emailId,
          mobileNumber: vals?.value?.mobileNumber,
          firstName: vals?.value?.FN,
          lastName: vals?.value?.LN,
        });
        dispatch({
          type: "clearSelectedData",
          payload: "",
        });
      }
    } else {
      if (confirm("Do you want add Student ?")) {
        addStudent({
          emailId: vals?.value?.emailId,
          mobileNumber: vals?.value?.mobileNumber,
          firstName: vals?.value?.FN,
          lastName: vals?.value?.LN,
        });
        dispatch({
          type: "clearSelectedData",
          payload: "",
        });
      }
    }

    queryClient?.invalidateQueries({
      queryKey: ["getStudents"],
    });
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
  function closeDialog() {
    dispatch({
      type: "clearSelectedData",
      payload: "",
    });
  }
  function runOnMount({ value }: any) {
    if (!edit) {
      form.validateAllFields("change");
      return value;
    }
  }
  return (
    <div className="w-[25vw] flex flex-col gap-2 border rounded-lg ">
      <div className="w-full flex  items-center justify-between  bg-border/40 py-2 px-4 rounded-t-lg font-semibold text-xl">
        <label>{title}</label>
        <div onClick={closeDialog} title="close">
          <X className="w-10 h-10 p-2 hover:bg-border/50 rounded-full cursor-pointer" />
        </div>
      </div>
      <form
        className="w-[25vw] p-3 flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-y-2">
          <div>
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
                      name={field?.name}
                      id={field?.id}
                      placeholder={FIRST_NAME}
                      value={field?.state?.value}
                      onChange={(e) => {
                        field.handleChange(e?.target?.value);
                      }}
                    />
                    {field?.state?.meta?.touchedErrors?.length>0 && (
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
                      value={field?.state?.value}
                      onChange={(e) => {
                        field.handleChange(e?.target?.value);
                      }}
                    />
                    {field?.state?.meta?.touchedErrors?.length>0 && (
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
                      value={field?.state?.value}
                      onChange={(e) => {
                        field.handleChange(e?.target?.value);
                      }}
                    />
                    {field?.state?.meta?.touchedErrors?.length>0 && (
                      <ErrorLabel label={field?.state?.meta?.touchedErrors} />
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => {
            return (
              <Button disabled={!canSubmit} type="submit">
                {!isSubmitting ? (!edit ? SUBMIT : MODIFY) : SUBMITING}
              </Button>
            );
          }}
        </form.Subscribe>
      </form>
    </div>
  );
}
export default AddAndEditForm;
